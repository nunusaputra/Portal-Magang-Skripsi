const { where } = require("sequelize");

const Jobs = require("../../models").job;
const Users = require("../../models").User;

module.exports = {
  // ------------------- START FITUR GET ALL JOB SORTING BY MITRA ID --------------------------- //
  getAllJob: async (req, res) => {
    try {
      const job = await Jobs.findAll({
        attributes: [
          "id",
          "jobTitle",
          "maxApplicants",
          "maxPositions",
          "acceptedCandidates",
          "jobType",
          "salary",
          "skillSet",
          "duration",
          "jobPost",
          "deadline",
          "desc",
        ],
        include: [
          {
            model: Users,
            attributes: [
              "name",
              "email",
              "alamat",
              "no_telpon",
              "profile",
              "desc",
            ],
          },
        ],
        where: {
          userId: req.userId,
        },
        order: [["createdAt", "DESC"]],
      });

      if (job === null) {
        return res.status(404).json({
          message: "Tidak ada daftar pekerjaan ditemukan",
        });
      }

      res.status(200).json({
        message: "Success get all data jobs",
        data: job,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  },

  // ------------------- END FITUR GET ALL JOB SORTING BY MITRA ID ---------------------------- //

  // ------------------- START FITUR GET JOB BY ID SORTING BY MITRA ID --------------------------- //
  getJobById: async (req, res) => {
    const { id } = req.params;

    try {
      const job = await Jobs.findOne({
        where: {
          id,
          userId: req.userId,
        },
        attributes: [
          "id",
          "jobTitle",
          "maxApplicants",
          "maxPositions",
          "acceptedCandidates",
          "jobType",
          "salary",
          "skillSet",
          "duration",
          "jobPost",
          "deadline",
          "desc",
          "userId",
        ],
        include: [
          {
            model: Users,
            attributes: [
              "name",
              "email",
              "alamat",
              "no_telpon",
              "profile",
              "desc",
            ],
          },
        ],
      });

      //   if (job.userId !== req.userId) {
      //     return res.status(404).json({
      //       message: "404 job Not Found!",
      //     });
      //   }

      res.status(200).json({
        message: "Success get job by id",
        data: job,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  },

  // ------------------- END FITUR GET JOB BY ID SORTING BY MITRA ID ---------------------------- //

  // ------------------- START FITUR CREATE JOB --------------------------- //
  addJobs: async (req, res) => {
    try {
      const {
        jobTitle,
        maxApplicants,
        maxPositions,
        jobType,
        salary,
        skillSet,
        duration,
        jobPost,
        deadline,
        desc,
      } = req.body;

      const job = await Jobs.create({
        jobTitle,
        maxApplicants,
        maxPositions,
        jobType,
        salary,
        skillSet,
        duration,
        jobPost,
        deadline,
        desc,
        userId: req.userId,
      });

      res.status(201).json({
        message: "Success create a new job",
        data: job,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  // ------------------- END FITUR CREATE JOB ---------------------------- //

  // ------------------- START FITUR UPDATE JOB --------------------------- //
  updateJob: async (req, res) => {
    const { id } = req.params;
    const job = await Jobs.findOne({
      where: {
        id,
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "404 job not found!",
      });
    }

    const {
      jobTitle,
      maxApplicants,
      maxPositions,
      jobType,
      salary,
      skillSet,
      duration,
      jobPost,
      deadline,
      desc,
    } = req.body;

    try {
      await Jobs.update(
        {
          jobTitle,
          maxApplicants,
          maxPositions,
          jobType,
          salary,
          skillSet,
          duration,
          jobPost,
          deadline,
          desc,
          userId: req.userId,
        },
        {
          where: {
            id: job.id,
          },
        }
      );

      res.status(200).json({
        message: "Success update data job",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------- END FITUR UPDATE JOB ---------------------------- //

  // ------------------- START FITUR DELETE JOB --------------------------- //
  deleteJob: async (req, res) => {
    const { id } = req.params;

    try {
      await Jobs.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Jobs has been deleted!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------- END FITUR DELETE JOB ---------------------------- //
};
