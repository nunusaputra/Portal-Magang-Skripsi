const LaporanMagang = require("../../models").LaporanMagang;
const ApplyJob = require("../../models").applyJob;
const Mahasiswa = require("../../models").Mahasiswa;

module.exports = {
  // --------------- START FITUR GET LAPORAN MAGANG --------------------- //

  getLaporan: async (req, res) => {
    try {
      const laporan = await LaporanMagang.findAll({
        attributes: [
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "mhsId",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "cv",
              "desc",
            ],
          },
        ],
        where: {
          mhsId: req.mhsId,
        },
      });

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada laporan magang yang tersedia!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG ----------------------- //

  // --------------- START FITUR GET LAPORAN MAGANG BY ID ----------------------- //

  getLaporanByID: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
        where: {
          id,
        },
        attributes: [
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "mhsId",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "cv",
              "desc",
            ],
          },
        ],
      });

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada laporan magang ditemukan!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan magang",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG BY ID ------------------------- //

  // --------------- START FITUR UPLOAD LAPORAN ------------------------- //

  uploadLaporan: async (req, res) => {
    try {
      const applyJob = await ApplyJob.findOne({
        where: {
          mhsId: req.mhsId,
          status: "accepted",
        },
      });

      if (!applyJob) {
        return res.status(400).json({
          message:
            "Anda belum diterima pada mitra magang manapun!",
        });
      }

      const data = req.body;

      const upLaporan = await LaporanMagang.create({
        nama: data.nama,
        npm: data.npm,
        dosen_pembimbing: data.dosen_pembimbing,
        tempat_magang: data.tempat_magang,
        alamat_magang: data.alamat_magang,
        longitude_magang: data.longitude_magang,
        latitude_magang: data.latitude_magang,
        lembar_pengesahan: data.lembar_pengesahan,
        laporan_magang: data.laporan_magang,
        dokumentasi: data.dokumentasi,
        mhsId: req.mhsId,
      });

      res.status(201).json({
        message: "Success upload laporan magang",
        data: upLaporan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // --------------- END FITUR UPLOAD LAPORAN --------------------------- //

  // --------------- START FITUR UPDATE LAPORAN --------------------------- //

  updateLaporan: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
        where: {
          id,
        },
      });

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada laporan yang ditemukan!",
        });
      }

      const data = req.body;

      await LaporanMagang.update({
        nama: data.nama,
        npm: data.npm,
        dosen_pembimbing: data.dosen_pembimbing,
        tempat_magang: data.tempat_magang,
        alamat_magang: data.alamat_magang,
        longitude_magang: data.longitude_magang,
        latitude_magang: data.latitude_magang,
        lembar_pengesahan: data.lembar_pengesahan,
        laporan_magang: data.laporan_magang,
        dokumentasi: data.dokumentasi,
        mhsId: req.mhsId,
      });

      res.status(200).json({
        message: "Success update laporan magang",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // --------------- END FITUR UPDATE LAPORAN ----------------------------- //

  // --------------- START FITUR DELETE LAPORAN ----------------------------- //

  deleteLaporan: async (req, res) => {
    const { id } = req.params;

    try {
      await LaporanMagang.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Success delete laporan magang",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },



  // --------------- START FITUR GET LAPORAN MAGANG (ADMIN) --------------------- //

  getLaporanAdmin: async (req, res) => {
    try {
      const laporan = await LaporanMagang.findAll({
        attributes: [
          "id",
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "mhsId",
          "createdAt"
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "cv",
              "desc",
            ],
          },
        ],
      });

      if (laporan.length == 0) {
        return res.status(404).json({
          message: "Tidak ada laporan magang yang tersedia!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG (ADMIN) ----------------------- //

  // --------------- START FITUR GET LAPORAN MAGANG BY ID (ADMIN) ----------------------- //

  getLaporanByIDAdmin: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
        where: {
          id,
        },
        attributes: [
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "mhsId",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "cv",
              "desc",
            ],
          },
        ],
      });

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada laporan magang ditemukan!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan magang",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG BY ID (ADMIN) ------------------------- //




  // --------------- END FITUR DELETE LAPORAN ------------------------------- //

  // --------------- START FITUR UPLOAD IMAGE LAPORAN ------------------------------- //

  // uploadImage: async (req, res) => {
  //     try {
  //         const image = req.file

  //         const laporan = await LaporanMagang.findOne({
  //             where: {
  //                 mhsId: req.mhsId
  //             }
  //         })

  //         if (req.mhsId == laporan.mhsId) {
  //             let images = ""

  //             if (image) {
  //                 const fileBase64 = image.buffer.toString("base64")
  //                 const file = `data:${image.mimetype};base64,${fileBase64}`
  //                 const cloudinaryImage = await cloudinary.uploader.upload(file)
  //                 images = cloudinaryImage.url
  //               } else {
  //                 images = laporan.dokumentasi
  //               }

  //               const upImage = await LaporanMagang.create({
  //                 dokumentasi: images
  //               }, {
  //                 where: {
  //                     id: laporan.id
  //                 }
  //               })

  //               res.status(201).json({
  //                 message: 'Success upload dokumentasi magang',
  //                 data: upImage
  //               })
  //         }
  //     } catch (error) {
  //         res.status(500).json({
  //             message: error.message
  //         })
  //     }
  // },
  // --------------- END FITUR UPLOAD IMAGE LAPORAN --------------------------------- //

  // --------------- START FITUR UPLOAD DOCUMENT LAPORAN --------------------------------- //

  // uplaodDocument: async (req, res) => {
  //     try {
  //         const document = req.file

  //         const laporan = await LaporanMagang.findOne({
  //             where: {
  //                 mhsId: req.mhsId
  //             }
  //         })

  //         if (req.mhsId == Mahasiswa.id) {
  //             let documents = ""

  //             if (document) {
  //                 const fileBase64 = document.buffer.toString("base64")
  //                 const file = `data:${document.mimetype};base64,${fileBase64}`
  //                 const cloudinaryImage = await cloudinary.uploader.upload(file)
  //                 documents = cloudinaryImage.url
  //               } else {
  //                 documents = user.profile
  //               }

  //               const upImage = await LaporanMagang.create({
  //                 dokumentasi: images
  //               }, {
  //                 where: {
  //                     id: req.mhsId
  //                 }
  //               })

  //               res.status(201).json({
  //                 message: 'Success upload dokumentasi magang',
  //                 data: upImage
  //               })
  //         }
  //     } catch (error) {

  //     }
  // }
  // --------------- END FITUR UPLOAD DOCUMENT LAPORAN ----------------------------------- //
};
