const express = require("express");
const router = express.Router();
const {
  getParticularJob,
  updateStatus,
  getApplicants,
  getListFinal,
  getApplicantsByID,
} = require("../../controllers/mitraControllers/handleJobController");
const { verifyUser, mitraOnly } = require("../../middleware/auth");

router.get("/applicants/:id", verifyUser, mitraOnly, getParticularJob);
router.get("/applicants", verifyUser, mitraOnly, getListFinal);
router.get("/applications", verifyUser, mitraOnly, getApplicants);
router.get("/applications/:id", verifyUser, mitraOnly, getApplicantsByID);
router.put("/applications/status/:id", verifyUser, mitraOnly, updateStatus);

module.exports = router;
