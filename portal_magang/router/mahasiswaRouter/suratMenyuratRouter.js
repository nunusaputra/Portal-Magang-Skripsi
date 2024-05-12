const express = require("express");
const router = express.Router();
const {
  getDataPloting,
  getDataPlotingByID,
  createDosenPembimbing,
  updateDosenPembimbing,
  deleteDospem,
} = require("../../controllers/mahasiswaControllers/suratMenyuratController");

const { getAllInfoMhs } = require("../../controllers/adminControllers/informationControllers");

const {VerifyToken} = require('../../middleware/verifyToken')

router.get("/dosen-pembimbing", VerifyToken, getDataPloting);
router.get("/dosen-pembimbing/:id", VerifyToken, getDataPlotingByID);
router.post("/dosen-pembimbing", VerifyToken, createDosenPembimbing);
router.put("/dosen-pembimbing/:id", VerifyToken, updateDosenPembimbing);
router.delete("/dosen-pembimbing/:id", VerifyToken, deleteDospem);

router.get("/information", VerifyToken, getAllInfoMhs);

module.exports = router;
