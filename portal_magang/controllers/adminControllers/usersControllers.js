const Users = require("../../models").User;
const argon = require("argon2");
const { cloudinary } = require("../../cloudinary/cloudinary");
const { where } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  // ------------------ START FITUR GET ALL USER -------------------------- //
  getAllUser: async (req, res) => {
    try {
      const users = await Users.findAll({
        order: ["createdAt", "DESC"],
      });

      if (users.length == 0) {
        return res.status(404).json({
          message: "Tidak ada account yang dibuat!",
        });
      }
      res.status(200).json({
        message: "Success get all data users",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR GET ALL USER -------------------------- //

  // ------------------ START FITUR GET USER BY ID -------------------------- //
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({
        attributes: ["id", "name", "email", "role"],
        where: {
          id,
        },
      });

      if (user == null) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      res.status(200).json({
        message: "Success get data user by id",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR GET USER BY ID -------------------------- //

  // ------------------ START FITUR CREATE USER -------------------------- //
  createUser: async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "Email tersebut sudah digunakan!",
      });
    }

    if (password !== confPassword) {
      return res.status(400).json({
        message: "Password dan confirm password harus sesuai!",
      });
    }
    const hashPassword = await argon.hash(password);
    try {
      await Users.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      res.status(201).json({
        message: "Success create new user",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR CREATE USER -------------------------- //

  // ------------------ START FITUR DELETE USER -------------------------- //

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await Users.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "Account has been deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR DELETE USER -------------------------- //

  // ------------------ START FITUR UPDATE USER -------------------------- //

  updateUser: async (req, res) => {
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
      res.status(404).json({
        message: "User not found!",
      });
    }
    const { name, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = user.password;
    } else {
      hashPassword = await argon.hash(password);
    }

    if (password !== confPassword) {
      res.status(400).json({
        message: "Password dan confirm password tidak sesuai!",
      });
    }

    try {
      await Users.update(
        {
          name,
          email,
          password: hashPassword,
          role,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.status(200).json({
        message: "Success update data user",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR UPDATE USER -------------------------- //

  // ------------------ START FITUR UPDATE PROFILE ADMIN -------------------------- //

  editProfile: async (req, res) => {
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
        res.status(404).json({
          message: "User not found!",
        });
      }
      const { name, email, alamat, no_telpon, desc } = req.body;

      const image = req.file;

      if (user.id == id) {
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

  // ------------------ END FITUR UPDATE PROFILE ADMIN --------------------------- //

  // ------------------ START FITUR CHANGE PASSWORD --------------------------- //

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

  // ------------------ END FITUR CHANGE PASSWORD ---------------------------- //

  // ------------------ START FITUR UPLOAD GAMBAR -------------------------- //

  //  uploadImage: async (req, res) => {
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
};
