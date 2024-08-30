const express = require("express");
const router = express.Router();
const {
  getJobById,
  addJobs,
  getAllJob,
  updateJob,
  deleteJob,
} = require("../../controllers/mitraControllers/uploadJob");
const { verifyUser, mitraOnly } = require("../../middleware/auth");

router.get("/job", verifyUser, mitraOnly, getAllJob);
router.get("/job/:id", verifyUser, mitraOnly, getJobById);
router.post("/job", verifyUser, mitraOnly, addJobs);
router.put("/job/:id", verifyUser, mitraOnly, updateJob);
router.delete("/job/:id", verifyUser, mitraOnly, deleteJob);

module.exports = router;
