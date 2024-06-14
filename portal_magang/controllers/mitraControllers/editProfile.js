const Users = require("../../models").User;
const argon = require("argon2");
const { where } = require("sequelize");
const { cloudinary } = require("../../cloudinary/cloudinary");
const { validationResult } = require("express-validator");

module.exports = {
  // ------------------ START FITUR EDIT PROFILE ------------------------------ //

  editProfile: async (req, res) => {
    try {
      const { id } = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const user = await Users.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      const { name, email, alamat, no_telpon, desc } = req.body;

      const image = req.file;

      if (user.id === id) {
        let images = "";

        if (image) {
          const fileBase64 = image.buffer.toString("base64");
          const file = `data:${image.mimetype};base64,${fileBase64}`;
          const cloudinaryImage = await cloudinary.uploader.upload(file);
          images = cloudinaryImage.url;
        } else {
          images = user.profile;
        }

        await Users.update(
          {
            name,
            email,
            profile: images,
            alamat,
            no_telpon,
            desc,
          },
          {
            where: {
              id: user.id,
            },
          }
        );

        return res.status(200).json({
          message: "Success update profile user",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR EDIT PROFILE ------------------------------ //

  // ------------------ START FITUR UPLOAD GAMBAR -------------------------- //

  // uploadImage: async (req, res) => {
  //   const {id} = req.params
  //   try {
  //     const user = await Users.findOne({
  //       where: {
  //         id
  //       }
  //     })

  //     if (!user) {
  //       return res.status(404).json({
  //         message: '404 user not found!'
  //       })
  //     }

  //     const image = req.file

  //     if (user.id == id) {
  //       let images = ""

  //       if (image) {
  //         const fileBase64 = image.buffer.toString("base64")
  //         const file = `data:${image.mimetype};base64,${fileBase64}`
  //         const cloudinaryImage = await cloudinary.uploader.upload(file)
  //         images = cloudinaryImage.url
  //       } else {
  //         images = user.profile
  //       }

  //       await Users.update({
  //         profile: images
  //       }, {
  //         where: {
  //           id: user.id
  //         }
  //       })

  //       return res.status(200).json({
  //         message: 'Success update profile user',
  //       })

  //     }
  //   } catch (error) {
  //     res.status(400).json({
  //       message: error.message
  //     })
  //   }
  // },
  // ------------------ END FITUR UPLOAD GAMBAR -------------------------- //

  // ------------------ START FITUR CHANGE PASSWORD -------------------------- //

  changePassword: async (req, res) => {
    const { id } = req.params;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const user = await Users.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "404 Not Found",
        });
      }

      const { currentPassword, newPassword, confPassword } = req.body;

      if (currentPassword === "" || newPassword === "" || confPassword === "") {
        return res.status(400).json({
          message: "Semua field wajib diisi!",
        });
      }

      if (newPassword !== confPassword) {
        return res.status(400).json({
          message: "Password dan Confirm Password Tidak Sesuai",
        });
      }

      const match = await argon.verify(user.password, currentPassword);

      if (!match) {
        return res.status(400).json({
          message: "Password lama tidak valid!",
        });
      }

      const hashPassword = await argon.hash(newPassword);

      await Users.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.status(200).json({
        message: "Berhasil merubah password",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------ END FITUR CHANGE PASSWORD -------------------------- //

  // ------------------ START FITUR GET PROFILE -------------------------- //

  getProfileById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Users.findOne({
        where: {
          id,
        },
        attributes: [
          "id",
          "name",
          "email",
          "profile",
          "alamat",
          "no_telpon",
          "role",
          "desc",
        ],
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      res.status(200).json({
        message: "Success get data user",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ------------------ END FITUR GET PROFILE ---------------------------- //
};
