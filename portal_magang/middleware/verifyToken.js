const Mahasiswa = require('../models').Mahasiswa
const jwt = require("jsonwebtoken");

module.exports = {
  // ------------------ START FITUR VERIFY TOKEN -------------------------- //

  VerifyToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.email = decoded.email;

      try {
        const mhs = await Mahasiswa.findOne({
          where: {
            email: req.email
          }
        })

        if (!mhs) {
          return res.status(404).json({
            message: '404 user not found!'
          })
        }

        req.mhsId = mhs.id
        next();
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    });
  },

  // ------------------ END FITUR VERIFY TOKEN -------------------------- //

  // VerifUser: async (req, res, next) => {
  //   const mhs = await Mahasiswa.findOne({
  //     where: {
  //       id: req.session.mhsId
  //     }
  //   })

  //   if (!mhs) {
  //     return res.status(404).json({
  //       message: '404 mahasiswa not found!'
  //     })
  //   }

  //   req.mhsId = mhs.id
  //   next()
  // }
};


