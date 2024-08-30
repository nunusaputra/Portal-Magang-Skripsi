const { Op, where } = require("sequelize");
const { Sequelize } = require("../../models");

const Mahasiswa = require("../../models").Mahasiswa;
const Jobs = require("../../models").job;
const Users = require("../../models").User;
const ApplyJob = require("../../models").applyJob;

module.exports = {
  // -------------- START FITUR GET PELAMAR BERDASARKAN PEKERJAAN TERTENTU ------------- //

  getParticularJob: async (req, res) => {
    try {
      if (req.role !== "mitra") {
        return res.status(403).json({
          message: "You don't have permissions to view job applicants",
        });
      }

      const jobId = req.params.id;
      const status = req.query.status;

      const applyJobStatus = await ApplyJob.findAll({
        attributes: ["status"],
        raw: true,
      });

      const validStatusList = applyJobStatus.map(
        (statusObj) => statusObj.status
      );

      if (!validStatusList.includes(status)) {
        return res.status(404).json({
          message: `Tidak ada pekerjaan dengan keterangan status ${status} yang tersedia!`,
        });
      }

      let findParams = {
        jobId: jobId,
        mitraId: req.userId,
      };

      if (status) {
        findParams.status = status;
      }

      const applyJob = await ApplyJob.findAll({
        where: findParams, // Memasukkan findParams langsung ke dalam where
        include: [
          {
            model: Jobs,
          },
        ],
      });

      res.status(200).json({
        message: "Success get data applicants particular job",
        data: applyJob,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // -------------- END FITUR GET PELAMAR BERDASARKAN PEKERJAAN TERTENTU -------------- //

  // -------------- START FITUR UPDATE STATUS FOR APPLICANT -------------- //

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const status = req.body.status;
      const dateOfJoining = req.body.dateOfJoining;

      if (status === "accepted") {
        const applyJob = await ApplyJob.findOne({
          where: {
            id,
            mitraId: req.userId,
          },
        });

        if (!applyJob) {
          return res.status(404).json({
            message: "Tidak ada pelamar kerja yang ditemukan!",
          });
        }

        const job = await Jobs.findOne({
          where: {
            id: applyJob.jobId,
            userId: req.userId,
          },
        });

        if (!job) {
          return res.status(404).json({
            message: "Tidak ada pekerjaan yang ditemukan!",
          });
        }

        const activeApplyJob = await ApplyJob.count({
          where: {
            mitraId: req.userId,
            jobId: job.id,
            status: "accepted",
          },
        });

        if (activeApplyJob < job.maxPositions) {
          // accepted
          applyJob.status = status;
          applyJob.dateOfJoining = dateOfJoining;
          await applyJob.save();

          // Membatalkan semua lamaran dengan mhsId yang sama, kecuali yang sedang diproses
          await ApplyJob.update(
            {
              status: "canceled",
            },
            {
              where: {
                mhsId: applyJob.mhsId,
                id: {
                  [Op.ne]: id,
                },
                status: {
                  [Op.notIn]: ["rejected", "deleted", "canceled", "accepted"],
                },
              },
            }
          );

          if (status === "accepted") {
            await Jobs.update(
              {
                acceptedCandidates: activeApplyJob + 1,
              },
              {
                where: {
                  id: job.id,
                  userId: req.userId,
                },
              }
            );
          }

          return res.status(200).json({
            message: `Application ${status} successfully`,
          });
        } else {
          return res.status(400).json({
            message: "All positions for this job are already filled",
          });
        }
      } else {
        const { numaffected, rowaffected } = await ApplyJob.update(
          {
            status,
          },
          {
            where: {
              id,
              mitraId: req.userId,
              status: {
                [Op.notIn]: ["rejected", "deleted", "canceled"],
              },
            },
            returning: true,
          }
        );

        if (numaffected === 0) {
          return res.status(400).json({
            message: "Apply job can be updated",
          });
        }
        return res.status(200).json({
          message:
            status === "finished"
              ? `Job ${status} successfully`
              : `Application ${status} successfully`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // -------------- END FITUR UPDATE STATUS FOR APPLICANT ---------------- //

  // -------------- START FITUR GET ALL APPLICANT (MITRA) ---------------- //

  getApplicants: async (req, res) => {
    try {
      const applyJob = await ApplyJob.findAll({
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
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
              "linkCV",
            ],
          },
          {
            model: Jobs,
            attributes: [
              "id",
              "jobTitle",
              "maxApplicants",
              "maxPositions",
              "acceptedCandidates",
              "jobType",
              "salary",
              "duration",
              "jobPost",
              "deadline",
              "desc",
            ],
          },
          {
            model: Users,
            attributes: [
              "id",
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
        where: {
          mitraId: req.userId,
        },
        order: [["dateOfApply", "DESC"]],
      });

      res.status(200).json({
        message: "Success get data employer",
        data: applyJob,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  // -------------- END FITUR GET ALL APPLICANT (MITRA) ----------------- //

  // -------------- START FITUR GET ALL APPLICANT (MITRA) BY ID ---------------- //

  getApplicantsByID: async (req, res) => {
    const { id } = req.params;
    try {
      const applyJob = await ApplyJob.findOne({
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "cv",
              "linkCV",
              "desc",
            ],
          },
          {
            model: Jobs,
            attributes: [
              "id",
              "jobTitle",
              "maxApplicants",
              "maxPositions",
              "acceptedCandidates",
              "jobType",
              "salary",
              "duration",
              "jobPost",
              "deadline",
              "desc",
            ],
          },
          {
            model: Users,
            attributes: [
              "id",
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
        where: {
          id,
          mitraId: req.userId,
        },
        order: [["dateOfApply", "DESC"]],
      });

      res.status(200).json({
        message: "Success get data employer by id",
        data: applyJob,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  // -------------- END FITUR GET ALL APPLICANT (MITRA) BY ID ----------------- //

  // -------------- START FITUR GET ALL APPLICANT (MAHASISWA) ---------------- //

  getApplicantsMhs: async (req, res) => {
    try {
      const applyJob = await ApplyJob.findAll({
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
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
          {
            model: Jobs,
            attributes: [
              "id",
              "jobTitle",
              "maxApplicants",
              "maxPositions",
              "acceptedCandidates",
              "jobType",
              "salary",
              "duration",
              "jobPost",
              "deadline",
              "desc",
            ],
          },
          {
            model: Users,
            attributes: [
              "id",
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
        where: {
          mhsId: req.mhsId,
        },
        order: [["dateOfApply", "DESC"]],
      });

      res.status(200).json({
        message: "Success get data employer",
        data: applyJob,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  // -------------- END FITUR GET ALL APPLICANT (MAHASISWA) ----------------- //

  // -------------- START FITUR GET A LIST OF FINAL APPLICANTS FOR CURRENT / ALL HIS JOB ----------------- //

  getListFinal: async (req, res) => {
    try {
      let findParams = {
        mitraId: req.userId,
      };

      if (req.query.jobId) {
        findParams.jobId = req.query.jobId;
      }

      if (req.query.status) {
        findParams.status = Array.isArray(req.query.status)
          ? { [Op.in]: req.query.status }
          : req.query.status;
      }

      let sortParams = ["id"];

      if (req.query.asc) {
        sortParams = Array.isArray(req.query.asc)
          ? req.query.asc
          : [req.query.asc];
      }

      if (req.query.desc) {
        sortParams = Array.isArray(req.query.desc)
          ? req.query.desc.map((key) => `${key} DESC`)
          : [`${req.query.desc} DESC`];
      }

      const applications = await ApplyJob.findAll({
        where: findParams,
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
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
          {
            model: Jobs,
            attributes: [
              "id",
              "jobTitle",
              "maxApplicants",
              "maxPositions",
              "acceptedCandidates",
              "jobType",
              "salary",
              "duration",
              "jobPost",
              "deadline",
              "desc",
            ],
          },
        ],
        order: sortParams,
      });

      if (applications.length === 0) {
        return res.status(404).json({ message: "No applicants found" });
      }

      res.status(200).json({
        message: "Success get data",
        data: applications,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // -------------- END FITUR GET A LIST OF FINAL APPLICANTS FOR CURRENT / ALL HIS JOB ------------------ //
};
