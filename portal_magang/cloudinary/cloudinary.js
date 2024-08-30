const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const storage = multer.diskStorage({
//     destination: './upload',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now())
//     }
// })

// const upload = multer({ storage })

module.exports = { cloudinary };
