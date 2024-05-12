const express = require('express')
const router = express.Router()
const {getLaporan, getLaporanByID, uploadLaporan, updateLaporan, deleteLaporan} = require('../../controllers/mahasiswaControllers/laporanMagangControllers')
const {VerifyToken} = require('../../middleware/verifyToken')

router.get("/laporan", VerifyToken, getLaporan )
router.get("/laporan/:id", VerifyToken, getLaporanByID)
router.post("/laporan", VerifyToken, uploadLaporan)
router.put("/laporan/:id", VerifyToken, updateLaporan)
router.delete("/laporan/:id", VerifyToken, deleteLaporan)

module.exports = router