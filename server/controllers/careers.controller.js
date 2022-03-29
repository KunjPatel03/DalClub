const multiparty = require('multiparty');
const { CareersModel, JobApplicationsModel } = require("../models");
const { s3 } = require("../config/awsConfig")
const fs = require('fs');

const getJobsList = (req, res) => {

  CareersModel.findAll()
    .then((jobs) => {
      res.send({ success: true, jobs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const getJob = (req, res) => {
  CareersModel.findOne({ where: { job_id: req.params.jobId } })
    .then((job) => {
      res.send({ success: true, job });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const applyJob = (req, res) => {

  const form = new multiparty.Form();

  form.parse(req, async (error, fields, formData) => {
    if (error) {
      return response.status(500).send(error);
    };
    try {
      const jobApplication = {
        job_id: fields.jobId[0],
        first_name: fields.firstName[0],
        last_name: fields.lastName[0],
        dob: fields.dob[0],
        phone_no: fields.phNumber[0],
        email: fields.email[0],
        address: fields.address[0],
        resume: formData.resume[0].originalFilename,
        status: "applied"
      }
      JobApplicationsModel.create(jobApplication, {
        include: [{ model: CareersModel }]
      })
        .then((data) => {
          try {
            const fileContent = fs.readFileSync(formData.resume[0].path);
            const params = {
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: `resumes/${data.dataValues.application_id}/${formData.resume[0].originalFilename}`,
              Body: fileContent,
              ContentDisposition: "inline",
              ContentType: "application/pdf"
            };

            s3.upload(params, function (err, data) {
              if (err) {
                throw err;
              }
              console.log(`File uploaded successfully. ${data.Location}`);
            });
          } catch (err) {
            console.log(err)
            return res.status(500).send({
              message: err.message || 'Some error occurred while creating the Job Application.',
            });
          }
          return res.send({ success: true })
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({
            message: err.message || 'Some error occurred while creating the Job Application.',
          });
        });
    } catch (err) {
      return response.status(500).send(err);
    }
  });

};

const addJob = (req, res) => {
  const job = {
    title: req.body.title,
    description: req.body.description,
    details: req.body.details,
    job_type: req.body.job_type,
    salary: req.body.salary,
    vacancies: req.body.vacancies,
    status: "open"
  }

  CareersModel.create(job, {})
    .then((data) => {
      res.send({ success: true })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Job Posting.',
      });
    });
};

const deleteJob = (req, res) => {
  CareersModel.destroy({ where: { job_id: req.params.jobId } })
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const updateJob = (req, res) => {
  CareersModel.update(req.body, { where: { job_id: req.params.jobId } })
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
}

const getApplications = (req, res) => {
  JobApplicationsModel.findAll({ where: { job_id: req.params.jobId } })
    .then((applicants) => {
      res.send({ success: true, applicants });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
}

const getAllApplications = (req, res) => {
  JobApplicationsModel.count({
    attributes: ['job_id'],
    distinct: 'job_id',
    group: 'job_id'
  })
    .then((applicants) => {
      applicantsMap = {}
      applicants.forEach(function (job) {
        applicantsMap[job['job_id']] = job['count'];
      })
      res.send({ success: true, applicantsMap });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
}

module.exports = {
  getJobsList,
  getJob,
  applyJob,
  addJob,
  deleteJob,
  updateJob,
  getApplications,
  getAllApplications
};