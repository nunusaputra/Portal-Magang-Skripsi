const express = require('express')
const router = express.Router()
const {verifyUser, adminOnly} = require('../../middleware/auth')
const {getLaporanAdmin, getLaporanByIDAdmin, deleteLaporan} = require('../../controllers/mahasiswaControllers/laporanMagangControllers')

router.get("/laporan", verifyUser, adminOnly, getLaporanAdmin)
router.get("/laporan/:id", verifyUser, adminOnly, getLaporanByIDAdmin)
router.delete("/laporan/:id", verifyUser, adminOnly, deleteLaporan)

module.exports = router