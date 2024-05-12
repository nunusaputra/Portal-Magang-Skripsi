const multer = require('multer')

const storage = multer.memoryStorage()
const multerUpload = multer({ storage }).single('document')

module.exports = multerUpload