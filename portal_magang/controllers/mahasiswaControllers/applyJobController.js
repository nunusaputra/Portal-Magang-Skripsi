const { Op } = require("sequelize");

const Jobs = require("../../models").job;
const Users = require("../../models").User;
const ApplyJob = require("../../models").applyJob;
const Mahasiswa = require("../../models").Mahasiswa;

module.exports = {
  // ------------------------- START FITUR GET ALL JOB ----------------------------- //

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
      });

      if (!job) {
        return res.status(404).json({
          message: "Belum ada pekerjaan yang tersedia!",
        });
      }

      res.status(200).json({
        message: "Success get all data job",
        data: job,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ------------------------- START FITUR GET ALL JOB ----------------------------- //

  // ------------------------- START FITUR GET ALL JOB BY ID ----------------------------- //

  getJobById: async (req, res) => {
    try {
      const { id } = req.params;

      const job = await Jobs.findOne({
        where: {
          id,
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

      if (!job) {
        return res.status(404).json({
          message: "Pekerjaan yang anda cari tidak ditemukan!",
        });
      }

      res.status(200).json({
        message: "Success get job by id",
        data: job,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ------------------------- START FITUR GET ALL JOB BY ID ----------------------------- //

  // ------------------------- START FITUR APPLY JOB ----------------------------- //

  applyJob: async (req, res) => {
    const data = req.body;
    const jobId = req.params.id;

    const job = await Jobs.findOne({
      where: {
        id: jobId,
      },
      attributes: ["userId"],
    });

    if (!job) {
      return res.status(404).json({
        message: "404 job not found!",
      });
    }

    const existingApplyJob = await ApplyJob.findOne({
      where: {
        mhsId: req.mhsId,
        jobId,
        status: { [Op.notIn]: ["deleted", "accepted", "canceled"] },
      },
    });

    if (existingApplyJob) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // const activeApplyJobCount = await ApplyJob.count({
    //     where: {
    //         jobId,
    //         status: { [Op.notIn]: ['deleted', 'accepted', 'canceled']}
    //     }
    // })

    // if (activeApplyJobCount >= Jobs.maxApplicants) {
    //     return res.status(400).json({
    //         message: 'Posisi yang anda lamar sudah penuh'
    //     })
    // }

    const activeApplyJob = await ApplyJob.count({
      where: {
        mhsId: req.mhsId,
        status: { [Op.notIn]: ["deleted", "accepted", "canceled"] },
      },
    });

    if (activeApplyJob >= 3) {
      return res.status(400).json({
        message:
          "Anda sudah mendaftar di 2 pekerejaan. Anda tidak bisa lagi mendaftar!",
      });
    }

    const acceptedJob = await ApplyJob.count({
      where: {
        mhsId: req.mhsId,
        status: "accepted",
      },
    });

    if (acceptedJob > 0) {
      return res.status(400).json({
        message:
          "Anda sudah diterima disalah satu pekerjaan. Anda tidak dapat lagi melamar di pekerjaan lain!",
      });
    }

    try {
      const applyJob = await ApplyJob.create({
        mhsId: req.mhsId,
        mitraId: job.userId,
        jobId,
        status: "applied",
        sop: data.sop,
      });

      res.status(200).json({
        message: "Success apply a job",
        data: applyJob,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ------------------------- END FITUR APPLY JOB ------------------------------ //

  // ------------------------- START FITUR CANCALLED JOB ------------------------------ //

  cancelJob: async (req, res) => {
    try {
      const status = req.body.status;
      const { id } = req.params;

      if (status === "canceled") {
        const applyJob = await ApplyJob.update(
          {
            status,
          },
          {
            where: {
              id: id,
              mhsId: req.mhsId,
            },
            returning: true,
          }
        );

        if (!applyJob) {
          return res.status(404).json({
            message: "Application not found!",
          });
        }

        return res.status(200).json({
          message: `Application ${status} successfully`,
        });
      } else {
        return res.status(401).json({
          message: "You don't have permissions to update job status",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ------------------------- END FITUR CANCALLED JOB ------------------------------ //

  // ------------------------- START FITUR GET ALL APPLIED JOB ------------------------------ //

  // getApplied: async (req, res) => {
  //   try {
  //     const applyJob = await ApplyJob.findAll({
  //       where: {
  //         mhsId: req.mhsId
  //       },
  //       attributes: ["id", "mhsId", "mitraId", "jobId", "status", "dateOfApply", "dateOfJoining" ],
  //       include: [
  //         {
  //           model: Mahasiswa,
  //           attributes: ["id", "name", "email", "profile_pict", "prodi", "semester", "tgl_lahir", "alamat", "no_hp", "cv", "desc"]
  //         },
  //         {
  //           model: Users,
  //           attributes: ["id", "name", "email", "profile", "alamat", "no_telpon", "desc"]
  //         },
  //         {
  //           model: Jobs,
  //           attributes: ["id", "jobTitle", "maxApplicant", "maxPositions", "acceptedCandidates", "jobType", "salary", "skillSet", "duration", "jobPost", "deadline", "desc"]
  //         }
  //       ],
  //       order: [["dateOfApply", "DESC"]]
  //     })

  //     if (!applyJob) {
  //       return res.status(404).json({
  //         message: 'Anda belum melamar di mitra manapun!'
  //       })
  //     }

  //     res.status(200).json({
  //       message: 'Success get data apply job',
  //       data: applyJob
  //     })
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message
  //     })
  //   }
  // }
  // ------------------------- END FITUR GET ALL APPLIED JOB -------------------------------- //
};
