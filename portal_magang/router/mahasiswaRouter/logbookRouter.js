const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../../middleware/verifyToken");
const {
  getAllLogbook,
  getLogbookByID,
  createLogbook,
  updateLogbook,
  deleteLogbook,
} = require("../../controllers/mahasiswaControllers/logbookController");

router.get("/logbook", VerifyToken, getAllLogbook);
router.get("/logbook/:id", VerifyToken, getLogbookByID);
router.post("/logbook", VerifyToken, createLogbook);
router.put("/logbook/:id", VerifyToken, updateLogbook);
router.delete("/logbook/:id", VerifyToken, deleteLogbook);

module.exports = router;
