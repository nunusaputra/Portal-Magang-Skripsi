const express = require("express");
const router = express.Router();
const { verifyUser, mitraOnly } = require("../../middleware/auth");
const {
  getLogbookMitraAll,
  getLogbookMitraById,
} = require("../../controllers/mahasiswaControllers/logbookController");

router.get("/logbook", verifyUser, mitraOnly, getLogbookMitraAll);
router.get("/logbook/:id", verifyUser, mitraOnly, getLogbookMitraById);

module.exports = router;
