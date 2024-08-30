const Users = require("../../models").User;
const argon = require("argon2");
const { validationResult } = require("express-validator");

module.exports = {
  // ------------------ START FITUR LOGIN -------------------------- //
  Regis: async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const mhs = await Users.findOne({
      where: {
        email,
      },
    });

    if (mhs) {
      return res.status(400).json({
        message: "Email tersebut sudah digunakan!",
      });
    }

    if (password !== confPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match!",
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
        message: "Success create new akun for admin",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  Login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const match = await argon.verify(user.password, req.body.password);
    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    req.session.userId = user.id;
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    res.status(200).json({
      id,
      name,
      email,
      role,
    });
  },

  // ------------------ END FITUR LOGIN --------------------------- //

  // ------------------ START FITUR ME -------------------------- //
  Me: async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Mohon login terlebih dahulu!",
      });
    }

    const user = await Users.findOne({
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "profile",
        "no_telpon",
        "alamat",
        "createdAt",
      ],
      where: {
        id: req.session.userId,
      },
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
  },

  // ------------------ END FITUR ME --------------------------- //

  // ------------------ START FITUR LOGOUT -------------------------- //
  Logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({
          message: "Tidak dapat logout!",
        });
      }
      res.status(200).json({
        message: "Anda berhasil logout",
      });
    });
  },

  // ------------------ END FITUR LOGOUT --------------------------- //
};
