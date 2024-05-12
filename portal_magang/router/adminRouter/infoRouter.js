const express = require("express");
const router = express.Router();

const {
  createInfo,
  getAllInfo,
  getInfoById,
  updateInfo,
  deleteInfo,
} = require("../../controllers/adminControllers/informationControllers");

const { verifyUser, adminOnly } = require("../../middleware/auth");

router.get("/articles", verifyUser, adminOnly, getAllInfo);
router.get("/articles/:id", verifyUser, adminOnly, getInfoById);
router.post("/articles", verifyUser, adminOnly, createInfo);
router.put("/articles/:id", verifyUser, adminOnly, updateInfo);
router.delete("/articles/:id", verifyUser, adminOnly, deleteInfo);

module.exports = router;
