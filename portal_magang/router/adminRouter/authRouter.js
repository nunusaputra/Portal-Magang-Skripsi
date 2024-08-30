const express = require("express");
const router = express.Router();
const {
  Login,
  Me,
  Logout,
  Regis,
} = require("../../controllers/adminControllers/auth");
const { body } = require("express-validator");

router.get("/me", Me);
router.post("/regis", [
  body("email").isEmail().withMessage("Mohon masukan email yang valid!"),
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
], Regis);
router.post(
  "/login",
  [body("email").isEmail().withMessage("Mohon masukan email yang valid!")],
  Login
);
router.delete("/logout", Logout);

module.exports = router;
