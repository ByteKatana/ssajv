const jobModel = require('../Models/Job');
const jobStepModel = require('../Models/JobStep');
const jobScheduleModel = require('../Models/JobSchedule');
const jobActivityModel = require('../Models/jobActivity');
const jobHistoryModel = require('../Models/JobHistory');
const jobServerModel = require('../Models/JobServer');
const _ = require('lodash');


//Only sysjob table data
const getAllJobs = (req,res) => {
    jobModel.getAll().then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//Only sysjob table data by ID
const getJobById = (req,res) => {
    jobModel.getById(req.params.id).then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//Only sysjobsteps table data
const getAllSteps = (req,res) => {
    jobStepModel.getAll().then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//Only sysjobschedules table data
const getAllSchedules = (req,res) => {
    jobScheduleModel.getAll().then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//sysjobschedules table data with related sysjob data
const getAllSchedulesDetails = async (req,res) => {
    let jobs = await jobModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    let schedules =  await jobScheduleModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    schedules.forEach(element => {
        element.job = _.filter(jobs, {"job_id" : element.job_id})
        element.job_name = element.job.name
    })

    res.json(schedules)
}

//Only sysjobactivity table data
const getAllActivity = (req,res) => {
    jobActivityModel.getAll().then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//Only sysjobhistory table data 
const getAllHistory = (req,res) => {
    jobHistoryModel.getAll().then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//Only sysjobservers table data
const getAllServers = (req,res) => {
    jobServerModel.getAll().then(result => {
        if(_.isEmpty(result)) return {}
        res.send(JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
    })
}

//All Job data from sysjob and its activity, history, server, schedule, steps data from other tables
const getJobsWithAllDetails = async (req,res) => {
    let jobs = await jobModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })
    let steps = await jobStepModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    let schedules =  await jobScheduleModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })
    
    let activity = await jobActivityModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    let history = await jobHistoryModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    let servers = await jobServerModel.getAll().then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

    jobs.forEach(element => {
        element.steps = _.filter(steps, {"job_id" : element.job_id})
        element.schedules = _.filter(schedules, {"job_id" : element.job_id})
        element.activity = _.filter(activity, {"job_id" : element.job_id})
        element.history = _.filter(history, {"job_id" : element.job_id})
        element.servers = _.filter(servers, {"job_id" : element.job_id})
    })

    res.json(jobs)

}

//Same as getJobsWithAllDetails method but this method returns only one job by ID
const getJobWithAllDetails = async (req,res) => {
    let job = await jobModel.getById(req.params.id).then(result =>{
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })
    let steps = await jobStepModel.getByJobId(req.params.id).then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

     let schedules =  await jobScheduleModel.getByJobId(req.params.id).then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })
    
    let activity = await jobActivityModel.getByJobId(req.params.id).then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'])
    })

    let history = await jobHistoryModel.getByJobId(req.params.id).then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'])
    })

    let servers = await jobServerModel.getByJobId(req.params.id).then(result =>{
        if(_.isEmpty(result)) return {}
        return JSON.parse(result.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    })

     job.map(element => {
        element.steps = steps
        element.schedules = schedules
        element.activity = activity
        element.history = history
        element.servers = servers
    })  

    res.json(job)
    
}


module.exports = {
    getAllJobs,
    getJobById,
    getAllSteps,
    getAllSchedules,
    getAllSchedulesDetails,
    getAllActivity,
    getAllHistory,
    getAllServers,
    getJobsWithAllDetails,
    getJobWithAllDetails
}