const express = require("express");
const router = express.Router();
const {
  updateProfileMhs,
  ubahPassMhs,
  // uploadImage,
  uploadCV,
  uploadImageMhs,
} = require("../../controllers/mahasiswaControllers/editProfileMhs");

const fileUpload = require("../../utils/fileUpload");
const cvUpload = require("../../utils/cvUpload");

const { VerifyToken } = require("../../middleware/verifyToken");
const { body } = require("express-validator");

router.put(
  "/edit/profile/:id",
  VerifyToken,
  fileUpload,
  [
    // ----- EMAIL VALIDATION ----- //

    body("email")
      .notEmpty()
      .withMessage("Kolom email tidak boleh kosong!")
      .isEmail()
      .withMessage("Mohon masukan email yang valid!"),

    //  ----- NO TELPON VALIDATION ------ //
    // body("no_telpon")
    // .isMobilePhone("id-ID").withMessage('No telpon tidak valid!')
  ],
  updateProfileMhs
);

router.put("/edit/cv/:id", cvUpload, uploadCV);
router.put(
  "/edit/change-pass/:id",
  VerifyToken,
  [
    // ----- PASSWORD VALIDATION ----- //
    // body("password")
    //   .notEmpty()
    //   .withMessage("Kolom password tidak boleh kosong!")
    //   .isLength({ min: 8 })
    //   .withMessage("Password harus terdiri minimal 8 karakter!")
    //   .matches(/[A-Z]/g)
    //   .withMessage("Password harus mengandung huruf besar")
    //   .matches(/[a-z]/g)
    //   .withMessage("Password harus mengandung huruf kecil")
    //   .matches(/[0-9]/g)
    //   .withMessage("Password harus mengandung angka")
    //   .not()
    //   .matches(/\s/g)
    //   .withMessage("Mohon tidak menggunakan karakter spasi!")
  ],
  ubahPassMhs
);
router.put("/upload/:id", VerifyToken, fileUpload, uploadImageMhs);

module.exports = router;
