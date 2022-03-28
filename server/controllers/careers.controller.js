const { CareersModel, JobApplicationsModel } = require("../models");

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
  const jobApplication = {
    job_id: req.body.jobId,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    dob: req.body.dob,
    phone_no: req.body.phNumber,
    email: req.body.email,
    address: req.body.address,
    resume: req.body.resume,
    status: "applied"
  }
  JobApplicationsModel.create(jobApplication, { 
    include: [{ model: CareersModel}]})
    .then((data) => {
      res.send({ success: true })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Job Application.',
      });
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
    res.send({ success: true});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ success: false });
  });
};

module.exports = {
  getJobsList,
  getJob,
  applyJob,
  addJob,
  deleteJob
};