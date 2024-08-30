const Mahasiswa = require("../../models").Mahasiswa;
const jwt = require("jsonwebtoken");

module.exports = {
  // ------------------ START FITUR REFRESH TOKEN -------------------------- //

  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.sendStatus(401);
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.sendStatus(403);
          }

          try {
            const mhs = await Mahasiswa.findOne({
              where: {
                id: decoded.mhsId,
              },
            });

            if (!mhs) {
              return res.sendStatus(404);
            }

            const accessToken = jwt.sign(
              {
                mhsId: mhs.id,
                name: mhs.name,
                email: mhs.email,
                profile_pict: mhs.profile_pict,
                linkCV: mhs.linkCV,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1h" }
            );

            res.json({ accessToken });
          } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // VerifyToken: async (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  //   if (token == null) {
  //     return res.sendStatus(401);
  //   }

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
  //     if (err) {
  //       return res.sendStatus(403);
  //     }

  //     req.email = decoded.email;

  //     try {
  //       const mhs = await Mahasiswa.findOne({
  //         where: {
  //           email: req.email
  //         }
  //       });

  //       if (!mhs) {
  //         return res.status(404).json({
  //           message: '404 user not found!'
  //         });
  //       }

  //       req.mhsId = mhs.id;
  //       next();
  //     } catch (error) {
  //       res.status(500).json({
  //         message: error.message
  //       });
  //     }
  //   });
  // }
  // ------------------ END FITUR REFRESH TOKEN --------------------------- //
};
