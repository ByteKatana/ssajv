const jobModel = require("../Models/Job")
const jobStepModel = require("../Models/JobStep")
const jobScheduleModel = require("../Models/JobSchedule")
const jobActivityModel = require("../Models/jobActivity")
const jobHistoryModel = require("../Models/JobHistory")
const jobServerModel = require("../Models/JobServer")
const _ = require("lodash")

//Only sysjob table data
const getAllJobs = (req, res) => {
  jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

//Only sysjob table data by ID
const getJobById = (req, res) => {
  jobModel.getById(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

//Only sysjob table data by jobName
const getJobByName = (req, res) => {
  jobModel.getByName(req.params.jobName).then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

//All Job data from sysjob and its activity, history, server, schedule, steps data from other tables
const getJobsWithAllDetails = async (req, res) => {
  let jobs = await jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })
  let steps = await jobStepModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let schedules = await jobScheduleModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let activity = await jobActivityModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let history = await jobHistoryModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let servers = await jobServerModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  jobs.forEach((element) => {
    element.steps = _.filter(steps, { job_id: element.job_id })
    element.schedules = _.filter(schedules, { job_id: element.job_id })
    element.activity = _.filter(activity, { job_id: element.job_id })
    element.history = _.filter(history, { job_id: element.job_id })
    element.servers = _.filter(servers, { job_id: element.job_id })
  })

  res.json(jobs)
}

//Same as getJobsWithAllDetails method but this method returns only one job by ID
const getJobWithAllDetails = async (req, res) => {
  let job = await jobModel.getById(req.params.id).then((result) => {
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })
  let steps = await jobStepModel.getByJobId(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let schedules = await jobScheduleModel.getByJobId(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let activity = await jobActivityModel.getByJobId(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let history = await jobHistoryModel.getByJobId(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let servers = await jobServerModel.getByJobId(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  job.map((element) => {
    element.steps = steps
    element.schedules = schedules
    element.activity = activity
    element.history = history
    element.servers = servers
  })

  res.json(job)
}
//Returns a job by name and its all details.
const getJobByNameWithAllDetails = async (req, res) => {
  let job = await jobModel.getByName(req.params.jobName).then((result) => {
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  //This for loop will add all jobs that has same name.
  for (let jobIndex = 0; jobIndex < job.length; jobIndex++) {
    let steps = await jobStepModel.getByJobId(job[jobIndex].job_id).then((result) => {
      if (_.isEmpty(result)) return {}
      return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    let schedules = await jobScheduleModel
      .getByJobId(job[jobIndex].job_id)
      .then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    let activity = await jobActivityModel
      .getByJobId(job[jobIndex].job_id)
      .then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    let history = await jobHistoryModel
      .getByJobId(job[jobIndex].job_id)
      .then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    let servers = await jobServerModel.getByJobId(job[jobIndex].job_id).then((result) => {
      if (_.isEmpty(result)) return {}
      return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    job[jobIndex].steps = steps
    job[jobIndex].schedules = schedules
    job[jobIndex].activity = activity
    job[jobIndex].history = history
    job[jobIndex].servers = servers
  }

  /*      job.map(element => {
        element.steps = steps
        element.schedules = schedules
        element.activity = activity
        element.history = history
        element.servers = servers
    })   */

  res.json(job)
}

//Only sysjobsteps table data
const getAllSteps = (req, res) => {
  jobStepModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

const getAllStepsWithAllDetails = async (req, res) => {
  let jobs = await jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let steps = await jobStepModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  steps.forEach((element) => {
    element.job = _.filter(jobs, { job_id: element.job_id })
    element.job_name = element.job.name
  })
  res.send(steps)
}

//Only sysjobschedules table data
const getAllSchedules = (req, res) => {
  jobScheduleModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

//sysjobschedules table data with related sysjob data
const getAllSchedulesWithAllDetails = async (req, res) => {
  let jobs = await jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let schedules = await jobScheduleModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  schedules.forEach((element) => {
    element.job = _.filter(jobs, { job_id: element.job_id })
    element.job_name = element.job.name
  })

  res.json(schedules)
}

//Only sysjobactivity table data
const getAllActivity = (req, res) => {
  jobActivityModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

//sysjobactivity table data with related sysjob data
const getAllActivityWithAllDetails = async (req, res) => {
  let jobs = await jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let activities = await jobActivityModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  activities.forEach((element) => {
    element.job = _.filter(jobs, { job_id: element.job_id })
    element.job_name = element.job.name
  })
  res.json(activities)
}

//Only sysjobhistory table data
const getAllHistory = (req, res) => {
  jobHistoryModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

//sysjobhistory table data with related sysjob data
const getAllHistoryWithAllDetails = async (req, res) => {
  let jobs = await jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let history = await jobHistoryModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  history.forEach((element) => {
    element.job = _.filter(jobs, { job_id: element.job_id })
    element.job_name = element.job.name
  })

  res.json(history)
}

//Only sysjobservers table data
const getAllServers = async (req, res) => {
  let servers = await jobServerModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  for (let serverIndex = 0; serverIndex < servers.length; serverIndex++) {
    let last_job = await jobModel.getById(servers[serverIndex].job_id).then((result) => {
      if (_.isEmpty(result)) return {}
      return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    servers[serverIndex].job_name = last_job[0].name
  }

  res.send(servers)
}

const getAllServersWithAllDetails = async (req, res) => {
  let jobs = await jobModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let servers = await jobServerModel.getAll().then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  servers.forEach((server) => {
    server.jobs = _.filter(jobs, { originating_server_id: server.server_id })
  })

  res.json(servers)
}

const getServerById = (req, res) => {
  jobServerModel.getById(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

const getServerByIdWithAllDetails = async (req, res) => {
  let server = await jobServerModel.getById(req.params.id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let last_job = await jobModel.getById(server[0].job_id).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  let jobs = await jobModel.getByServerId(req.params.id).then((result) => {
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  for (let jobIndex = 0; jobIndex < jobs.length; jobIndex++) {
    let steps = await jobStepModel.getByJobId(jobs[jobIndex].job_id).then((result) => {
      if (_.isEmpty(result)) return {}
      return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    let activity = await jobActivityModel
      .getByJobId(jobs[jobIndex].job_id)
      .then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    let schedules = await jobScheduleModel
      .getByJobId(jobs[jobIndex].job_id)
      .then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    let history = await jobHistoryModel
      .getByJobId(jobs[jobIndex].job_id)
      .then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    jobs[jobIndex].steps = steps
    jobs[jobIndex].activity = activity
    jobs[jobIndex].schedules = schedules
    jobs[jobIndex].history = history
  }

  server.map((server) => {
    server.job_name = last_job[0].name
    server.jobs_length = jobs.length
    server.jobs = jobs
  })

  res.json(server)
}

const getServerByName = async (req, res) => {
  jobServerModel.getByName(req.params.serverName).then((result) => {
    if (_.isEmpty(result)) return {}
    res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
  })
}

const getServerByNameWithAllDetails = async (req, res) => {
  let server = await jobServerModel.getByName(req.params.serverName).then((result) => {
    if (_.isEmpty(result)) return {}
    return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
  })

  //This for loop will add all jobs that has same name.
  for (let serverIndex = 0; serverIndex < server.length; serverIndex++) {
    let jobs = await jobModel
      .getByServerId(server[serverIndex].server_id)
      .then((result) => {
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

    for (let jobIndex = 0; jobIndex < jobs.length; jobIndex++) {
      let steps = await jobStepModel.getByJobId(jobs[jobIndex].job_id).then((result) => {
        if (_.isEmpty(result)) return {}
        return JSON.parse(
          result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      })

      let activity = await jobActivityModel
        .getByJobId(jobs[jobIndex].job_id)
        .then((result) => {
          if (_.isEmpty(result)) return {}
          return JSON.parse(
            result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
          )
        })

      let schedules = await jobScheduleModel
        .getByJobId(jobs[jobIndex].job_id)
        .then((result) => {
          if (_.isEmpty(result)) return {}
          return JSON.parse(
            result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
          )
        })

      let history = await jobHistoryModel
        .getByJobId(jobs[jobIndex].job_id)
        .then((result) => {
          if (_.isEmpty(result)) return {}
          return JSON.parse(
            result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
          )
        })

      jobs[jobIndex].steps = steps
      jobs[jobIndex].activity = activity
      jobs[jobIndex].schedules = schedules
      jobs[jobIndex].history = history
    }

    server[serverIndex].jobs = jobs
  }

  /*server.map((server) => {
        server.jobs = jobs
        })*/
  res.json(server)
}

module.exports = {
  getAllJobs,
  getJobById,
  getJobByName,
  getAllSteps,
  getAllSchedules,
  getAllActivity,
  getAllHistory,
  getAllServers,
  getServerById,
  getServerByName,
  getServerByIdWithAllDetails,
  getServerByNameWithAllDetails,
  getAllSchedulesWithAllDetails,
  getJobsWithAllDetails,
  getJobWithAllDetails,
  getJobByNameWithAllDetails,
  getAllActivityWithAllDetails,
  getAllStepsWithAllDetails,
  getAllHistoryWithAllDetails,
  getAllServersWithAllDetails
}
