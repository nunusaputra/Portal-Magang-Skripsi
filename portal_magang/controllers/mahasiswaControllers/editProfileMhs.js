const Mahasiswa = require("../../models").Mahasiswa;
const argon = require("argon2");
const { cloudinary } = require("../../cloudinary/cloudinary");
const { validationResult } = require("express-validator");

module.exports = {

  // ------------------ START FITUR UPDATE PROFILE -------------------------- //
  updateProfileMhs: async (req, res) => {
    const { id } = req.params;

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const mhs = await Mahasiswa.findOne({
        where: {
          id,
        },
      });

      if (!mhs) {
        return res.status(404).json({
          message: "404 user not found!",
        });
      }

      const {
        name,
        email,
        prodi,
        semester,
        tgl_lahir,
        alamat,
        no_hp,
        cv,
        desc,
        linkCV
      } = req.body;

      const image = req.file;

      if (mhs.id == id) {
        let images = "";

        if (image) {
          const fileBase64 = image.buffer.toString("base64");
          const file = `data:${image.mimetype};base64,${fileBase64}`;
          const cloudinaryImage = await cloudinary.uploader.upload(file);
          images = cloudinaryImage.url;
        } else {
          images = mhs.profile_pict;
        }

        await Mahasiswa.update(
          {
            name,
            email,
            profile_pict: images,
            prodi,
            semester,
            tgl_lahir,
            alamat,
            no_hp,
            cv,
            desc,
            linkCV
          },
          {
            where: {
              id: mhs.id,
            },
          }
        );

        return res.status(200).json({
          message: "Success update profile user",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  },

  // ------------------ END FITUR UPDATE PROFILE --------------------------- //

  // ------------------ START FITUR UBAH PASSWORD -------------------------- //
  ubahPassMhs: async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

    const mhs = await Mahasiswa.findOne({
      where: {
        id,
      },
    });

    if (!mhs) {
      return res.status(404).json({
        message: "404 mahasiswa not found!",
      });
    }

    const { currentPassword, newPassword, confPassword } = req.body;

    if (currentPassword === "" || newPassword === "" || confPassword === "") {
      return res.status(400).json({
        message: "Semua field wajib di isi!",
      });
    }

    if (newPassword !== confPassword) {
      return res.status(400).json({
        message: "Password dan confirm password tidak sesuai!",
      });
    }

    const match = await argon.verify(mhs.password, currentPassword);

    if (!match) {
      return res.status(400).json({
        message: "Password lama tidak valid!",
      });
    }

    const hashPassword = await argon.hash(newPassword);

    try {
      await Mahasiswa.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: mhs.id,
          },
        }
      );

      res.status(200).json({
        message: "Success change password mahasiswa",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------ START FITUR UBAH PASSWORD -------------------------- //

  // ------------------ START FITUR UPLOAD GAMBAR -------------------------- //

  //   uploadImage: async (req, res) => {
  //     const { id } = req.params;
  //     try {
  //       const mhs = await Mahasiswa.findOne({
  //         where: {
  //           id,
  //         },
  //       });

  //       if (!mhs) {
  //         return res.status(404).json({
  //           message: "404 user not found!",
  //         });
  //       }

  //       const image = req.file;

  //       if (mhs.id == id) {
  //         let images = "";

  //         if (image) {
  //           const fileBase64 = image.buffer.toString("base64");
  //           const file = `data:${image.mimetype};base64,${fileBase64}`;
  //           const cloudinaryImage = await cloudinary.uploader.upload(file);
  //           images = cloudinaryImage.url;
  //         } else {
  //           images = mhs.profile_pict;
  //         }

  //         await Users.update(
  //           {
  //             profile_pict: images,
  //           },
  //           {
  //             where: {
  //               id: mhs.id,
  //             },
  //           }
  //         );

  //         return res.status(200).json({
  //           message: "Success update profile user",
  //         });
  //       }
  //     } catch (error) {
  //       res.status(400).json({
  //         message: error.message,
  //       });
  //     }
  //   },
  // ------------------ END FITUR UPLOAD GAMBAR -------------------------- //
  
  
  // ------------------ START FITUR UPLOAD CV -------------------------- //

  uploadCV: async (req, res) => {
    const {id} = req.params
    try {
      const mhs = await Mahasiswa.findOne({
        where: {
          id
        }
      })

      if (!mhs) {
        return res.status(404).json({
          message: "404 user not found!"
        })
      }

      const document = req.file

      if (mhs.id == id) {
        let documents = ""

        if (document) {
          const fileBase64 = document.buffer.toString("base64")
          const file = `data:${document.mimetype};base64,${fileBase64}`
          const cloudinaryDocument = await cloudinary.uploader.upload(file)
          documents = cloudinaryDocument.url
        } else {
          documents = mhs.cv
        }

        await Mahasiswa.update({
          cv: documents
        },
        {
          where: {
            id:  mhs.id
          }
        })

        return res.status(200).json({
          message: "Success upload cv"
        })
      }
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
  // ------------------ END FITUR UPLOAD CV --------------------------- //
};
