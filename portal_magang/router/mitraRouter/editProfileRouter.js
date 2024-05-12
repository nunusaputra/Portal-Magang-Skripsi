const express = require("express");
const router = express.Router();
const fileUpload = require('../../utils/fileUpload')
const { verifyUser, mitraOnly} = require('../../middleware/auth')
const {
  editProfile, 
  changePassword,
  getProfileById
  // uploadImage
} = require("../../controllers/mitraControllers/editProfile");
const { body } = require("express-validator");

router.get("/profile/:id", verifyUser, mitraOnly, getProfileById)
router.put("/edit/:id", verifyUser, mitraOnly, fileUpload, [
      // ----- EMAIL VALIDATION ----- //

      body("email")
      .notEmpty()
      .withMessage("Kolom email tidka boleh kosong!")
      .isEmail()
      .withMessage("Mohon masukan email yang valid!"),

      //  ----- NO TELPON VALIDATION ------ //
      body("no_telpon")
      .isMobilePhone("id-ID").withMessage('No telpon tidak valid!')
], editProfile);
// router.put("/upload/:id", verifyUser, mitraOnly, fileUpload, uploadImage);

router.put("/change-pass/:id", verifyUser, mitraOnly, [

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
], changePassword)

module.exports = router;
