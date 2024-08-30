const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  editProfile,
  changePassword,
  getProfileById,
  // uploadImage
} = require("../../controllers/adminControllers/usersControllers");

const fileUpload = require("../../utils/fileUpload");

const { verifyUser, adminOnly } = require("../../middleware/auth");
const { body } = require("express-validator");
const {
  uploadImage,
} = require("../../controllers/mitraControllers/editProfile");

router.get("/account", verifyUser, adminOnly, getAllUser);
router.get("/account/:id", verifyUser, adminOnly, getUserById);
router.get("/account/profile/:id", verifyUser, adminOnly, getProfileById);
router.post(
  "/account",
  verifyUser,
  adminOnly,
  [
    // ----- EMAIL VALIDATION ----- //

    body("email")
      .notEmpty()
      .withMessage("Kolom email tidka boleh kosong!")
      .isEmail()
      .withMessage("Mohon masukan email yang valid!"),

    // ----- PASSWORD VALIDATION ----- //

    body("password")
      .notEmpty()
      .withMessage("Kolom password tidak boleh kosong!")
      .isLength({ min: 8 })
      .withMessage("Password harus terdiri minimal 8 karakter!")
      .matches(/[A-Z]/g)
      .withMessage("Password harus mengandung huruf besar")
      .matches(/[a-z]/g)
      .withMessage("Password harus mengandung huruf kecil")
      .matches(/[0-9]/g)
      .withMessage("Password harus mengandung angka")
      .not()
      .matches(/\s/g)
      .withMessage("Mohon tidak menggunakan karakter spasi!"),
  ],
  createUser
);

router.put(
  "/account/:id",
  verifyUser,
  adminOnly,
  [
    // ----- EMAIL VALIDATION ----- //

    body("email")
      .notEmpty()
      .withMessage("Kolom email tidka boleh kosong!")
      .isEmail()
      .withMessage("Mohon masukan email yang valid!"),

    // ----- PASSWORD VALIDATION ----- //
  ],
  updateUser
);

router.delete("/account/:id", verifyUser, adminOnly, deleteUser);
router.put(
  "/account/profile/:id",
  verifyUser,
  adminOnly,
  fileUpload,
  [
    // ----- EMAIL VALIDATION ----- //
    //  ----- NO TELPON VALIDATION ------ //
  ],
  editProfile
);
// router.put("/upload/:id", verifyUser, adminOnly, fileUpload, uploadImage);

router.put(
  "/change-pass/:id",
  verifyUser,
  adminOnly,
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
  changePassword
);
router.put("/upload/:id", verifyUser, adminOnly, fileUpload, uploadImage);

module.exports = router;
