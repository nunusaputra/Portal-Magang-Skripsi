const info = require("../../models").Information;

module.exports = {
  // ------------------ START FITUR GET ALL INFORMATION -------------------------- //

  getAllInfo: async (req, res) => {
    try {
      const getInfo = await info.findAll({
        attributes: ["id", "title", "author", "desc", "createdAt"],
      });

      if (getInfo.length == 0) {
        return res.status(404).json({
          message: 'Tidak ada informasi / articles yang tersedia'
        })
      }

      res.status(200).json({
        message: "Success get all information",
        data: getInfo,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR GET ALL INFORMATION --------------------------- //

  // ------------------ START FITUR GET ALL INFORMATION (Mahasiswa) -------------------------- //

  getAllInfoMhs: async (req, res) => {
    try {
      const getInfo = await info.findAll({
        attributes: ["id", "title", "author", "desc", "createdAt"],
      });

      if (getInfo.length == 0) {
        return res.status(404).json({
          message: 'Tidak ada informasi / articles yang tersedia'
        })
      }

      res.status(200).json({
        message: "Success get all information",
        data: getInfo,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR GET ALL INFORMATION (Mahasiswa) --------------------------- //

  // ------------------ START FITUR GET INFORMATION BY ID -------------------------- //

  getInfoById: async (req, res) => {
    try {
      const { id } = req.params;
      const infoById = await info.findOne({
        attributes: ["id", "title", "author", "desc"],
        where: {
          id,
        },
      });

      if (infoById == null) {
        return res.status(404).json({
          message: "Information not found!",
        });
      }

      res.status(200).json({
        message: "Success get information by id",
        data: infoById,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR GET INFORMATION BY ID -------------------------- //

  // ------------------ START FITUR CREATE INFORMATION -------------------------- //
  createInfo: async (req, res) => {
    const { title, author, desc } = req.body;
    try {
      const data = await info.create({
        title,
        author,
        desc,
      });
      res.status(201).json({
        message: "Information has successfully created",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR CREATE INFORMATION --------------------------- //

  // ------------------ START FITUR UPDATE INFORMATION -------------------------- //

  updateInfo: async (req, res) => {
    const { id } = req.params;
    const { title, author, desc } = req.body;
    const infoById = await info.findOne({
      where: {
        id,
      },
    });

    if (!infoById) {
      res.status(404).json({
        message: "Information not found!",
      });
    }

    try {
      await info.update(
        {
          title,
          author,
          desc,
        },
        {
          where: {
            id: infoById.id,
          },
        }
      );

      res.status(201).json({
        message: "Success update information",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR UPDATE INFORMATION -------------------------- //

  // ------------------ START FITUR DELETE INFORMATION -------------------------- //

  deleteInfo: async (req, res) => {
    const { id } = req.params;
    try {
      await info.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Information has been deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // ------------------ END FITUR DELETE INFORMATION -------------------------- //
};
