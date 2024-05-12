const express = require('express')
const router = express.Router()
const {verifyUser, adminOnly} = require('../../middleware/auth')
const { getDataPlotingAdmin, getDataPlotingByIDAdmin, deleteDospem} = require('../../controllers/mahasiswaControllers/suratMenyuratController')

router.get("/dosen-pembimbing", verifyUser, adminOnly, getDataPlotingAdmin)
router.get("/dosen-pembimbing/:id", verifyUser, adminOnly, getDataPlotingByIDAdmin)
router.delete("/dosen-pembimbing/:id", verifyUser, adminOnly, deleteDospem)

module.exports = router