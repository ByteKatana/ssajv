const express = require('express');
const router = express.Router();

const jobController = require('../Controllers/SysJobController')

router.get('/api/jobs', jobController.getAllJobs)
router.get('/api/job/:id', jobController.getJobById)
router.get('/api/job/name/:jobName', jobController.getJobByName)
router.get('/api/job/name/:jobName/details', jobController.getJobByNameWithAllDetails)
router.get('/api/job/:id/details', jobController.getJobWithAllDetails)
router.get('/api/jobs/details',jobController.getJobsWithAllDetails)

router.get('/api/steps', jobController.getAllSteps)
router.get('/api/steps/details', jobController.getAllStepsWithAllDetails)

router.get('/api/activity', jobController.getAllActivity)
router.get('/api/activity/details', jobController.getAllActivityWithAllDetails)

router.get('/api/schedules', jobController.getAllSchedules)
router.get('/api/schedules/details', jobController.getAllSchedulesWithAllDetails)

router.get('/api/history', jobController.getAllHistory)
router.get('/api/history/details', jobController.getAllHistoryWithAllDetails)

router.get('/api/servers', jobController.getAllServers)
router.get('/api/servers/details', jobController.getAllServersWithAllDetails)
router.get('/api/server/:id', jobController.getServerById)
router.get('/api/server/:id/details', jobController.getServerByIdWithAllDetails)
router.get('/api/server/name/:serverName', jobController.getServerByName)
router.get('/api/server/name/:serverName/details', jobController.getServerByNameWithAllDetails)


module.exports = router





