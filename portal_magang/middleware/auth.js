const Users = require("../models").User;

module.exports = {
  // ------------------ START FITUR VERIFY USER -------------------------- //

  verifyUser: async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Mohon untuk login terlebih dahulu!",
      });
    }

    const user = await Users.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    req.userId = user.id;
    req.role = user.role;
    next();
  },

  // ------------------ END FITUR VERIFY USER -------------------------- //

  // ------------------ START FITUR ADMIN ROLE -------------------------- //

  adminOnly: async (req, res, next) => {
    const user = await Users.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access Forbiden!",
      });
    }

    next();
  },

  // ------------------ END FITUR ADMIN ROLE -------------------------- //

  // ------------------ START FITUR MITRA ROLE -------------------------- //

  mitraOnly: async (req, res, next) => {
    const user = await Users.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    if (user.role !== "mitra") {
      return res.status(403).json({
        message: "Access forbiden!",
      });
    }

    next();
  },

  // ------------------ END FITUR MITRA ROLE -------------------------- //
};
