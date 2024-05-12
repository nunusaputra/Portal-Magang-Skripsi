const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRouter");
const authRouter = require("./authRouter");
const infoRouter = require("./infoRouter");
const laporanMagang = require("./laporanMagangAdmin")
const dosenPembimbing = require("./dosenPembimbingAdmin")

router.use("/admin", infoRouter);
router.use("/admin", usersRouter);
router.use("/auth", authRouter);
router.use("/admin", laporanMagang)
router.use("/admin", dosenPembimbing)

module.exports = router;
