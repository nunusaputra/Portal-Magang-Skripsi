const express = require('express')
const router = express.Router()

const mhsRouter = require('./mahasiswaRouter')
const editRouter = require('./editProfileRouter')
const applyJob = require('./applyJobRouter')
const plotingDospem = require('./suratMenyuratRouter')
const laporanMagang = require('./laporanMagangRouter')
const logbook = require('./logbookRouter')

router.use('/mahasiswa', mhsRouter)
router.use('/mahasiswa', editRouter)
router.use('/mahasiswa', applyJob)
router.use('/mahasiswa', plotingDospem)
router.use('/mahasiswa', laporanMagang)
router.use('/mahasiswa', logbook)

module.exports = router