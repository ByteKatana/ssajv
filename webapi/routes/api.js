const express = require('express');
const router = express.Router();

const jobController = require('../Controllers/SysJobController')

router.get('/api/jobs', jobController.getAllJobs)
router.get('/api/job/:id', jobController.getJobById)
router.get('/api/job/:id/details', jobController.getJobWithAllDetails)
router.get('/api/jobs/details',jobController.getJobsWithAllDetails)

router.get('/api/steps', jobController.getAllSteps)
router.get('/api/activity', jobController.getAllActivity)
router.get('/api/schedules', jobController.getAllSchedules)
router.get('/api/schedules/details', jobController.getAllSchedulesDetails)
router.get('/api/history', jobController.getAllHistory)
router.get('/api/servers', jobController.getAllServers)

module.exports = router





