const express = require('express')
const router = express.Router()

const { VerifyToken } = require('../../middleware/verifyToken')
const { applyJob, cancelJob, getAllJob, getJobById } = require('../../controllers/mahasiswaControllers/applyJobController')
const { getApplicantsMhs } = require('../../controllers/mitraControllers/handleJobController')

router.get('/job', VerifyToken, getAllJob)
router.get('/job/applications', VerifyToken, getApplicantsMhs)
router.get('/job/:id', VerifyToken, getJobById)
router.post('/job/:id/apply', VerifyToken, applyJob)
router.put('/job/applications/:id/', VerifyToken, cancelJob)

module.exports = router