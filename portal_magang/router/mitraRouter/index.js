const express = require("express");
const router = express.Router();

const editRouter = require('./editProfileRouter')
const jobRouter = require('./uploadJobRouter');
const handleJobRouter = require("./handleJobRouter");
const logbook = require('./logbookRouter')

router.use('/mitra', editRouter);
router.use('/mitra', jobRouter)
router.use('/mitra', handleJobRouter)
router.use('/mitra', logbook)

module.exports = router;
