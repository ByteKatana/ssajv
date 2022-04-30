const request = require("supertest")
const app = require("./app")

describe("Jobs data", () => {
  let response
  beforeAll(async () => {
    response = await request(app).get("/api/jobs/").set("Accept", "application/json")
  })
  it("should respond with a 200 status code", () => {
    expect(response.status).toEqual(200)
  })

  it("should return JSON data", () => {
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })

  describe("should return data as expected", () => {
    it("return job id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return server id", () => {
      expect(response._body[0].originating_server_id).toBeDefined()
      expect(typeof response._body[0].originating_server_id).toEqual("number")
    })
    it("return enabled", () => {
      expect(response._body[0].enabled).toBeDefined()
      expect(typeof response._body[0].enabled).toEqual("number")
    })
    it("return description", () => {
      expect(response._body[0].description).toBeDefined()
      expect(typeof response._body[0].description).toEqual("string")
    })
    it("return start_step_id", () => {
      expect(response._body[0].start_step_id).toBeDefined()
      expect(typeof response._body[0].start_step_id).toEqual("number")
    })
    it("return category_id", () => {
      expect(response._body[0].category_id).toBeDefined()
      expect(typeof response._body[0].category_id).toEqual("number")
    })
    it("return owner_sid", () => {
      expect(response._body[0].owner_sid).toBeDefined()
      expect(typeof response._body[0].owner_sid).toEqual("string")
    })
    it("return notify_level_eventlog", () => {
      expect(response._body[0].notify_level_eventlog).toBeDefined()
      expect(typeof response._body[0].notify_level_eventlog).toEqual("number")
    })
    it("return start_step_id", () => {
      expect(response._body[0].start_step_id).toBeDefined()
      expect(typeof response._body[0].start_step_id).toEqual("number")
    })
    it("return notify_level_email", () => {
      expect(response._body[0].notify_level_email).toBeDefined()
      expect(typeof response._body[0].notify_level_email).toEqual("number")
    })
    it("return notify_level_netsend", () => {
      expect(response._body[0].notify_level_netsend).toBeDefined()
      expect(typeof response._body[0].notify_level_netsend).toEqual("number")
    })
    it("return start_step_id", () => {
      expect(response._body[0].start_step_id).toBeDefined()
      expect(typeof response._body[0].start_step_id).toEqual("number")
    })
    it("return notify_level_page", () => {
      expect(response._body[0].notify_level_page).toBeDefined()
      expect(typeof response._body[0].notify_level_page).toEqual("number")
    })
    it("return notify_email_operator_id", () => {
      expect(response._body[0].notify_email_operator_id).toBeDefined()
      expect(typeof response._body[0].notify_email_operator_id).toEqual("number")
    })
    it("return notify_netsend_operator_id", () => {
      expect(response._body[0].notify_netsend_operator_id).toBeDefined()
      expect(typeof response._body[0].notify_netsend_operator_id).toEqual("number")
    })
    it("return notify_page_operator_id", () => {
      expect(response._body[0].notify_page_operator_id).toBeDefined()
      expect(typeof response._body[0].notify_page_operator_id).toEqual("number")
    })
    it("return delete_level", () => {
      expect(response._body[0].delete_level).toBeDefined()
      expect(typeof response._body[0].delete_level).toEqual("number")
    })
    it("return date_created", () => {
      expect(response._body[0].date_created).toBeDefined()
      expect(typeof response._body[0].date_created).toEqual("string")
    })
    it("return date_modified", () => {
      expect(response._body[0].date_modified).toBeDefined()
      expect(typeof response._body[0].date_modified).toEqual("string")
    })
    it("return version_number", () => {
      expect(response._body[0].version_number).toBeDefined()
      expect(typeof response._body[0].version_number).toEqual("number")
    })
  })
})

describe("Activity data", () => {
  let response
  beforeAll(async () => {
    response = await request(app).get("/api/activity/").set("Accept", "application/json")
  })
  it("should respond with a 200 status code", () => {
    expect(response.status).toEqual(200)
  })

  it("should return JSON data", () => {
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })

  describe("should return data as expected", () => {
    it("return session_id", () => {
      expect(response._body[0].session_id).toBeDefined()
      expect(typeof response._body[0].session_id).toEqual("number")
    })
    it("return job_id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return run_requested_date", () => {
      expect(response._body[0].run_requested_date).toBeDefined()
      expect(typeof response._body[0].run_requested_date).toEqual("string")
    })
    it("return job id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return run_requested_source", () => {
      expect(response._body[0].run_requested_source).toBeDefined()
      expect(typeof response._body[0].run_requested_source).toEqual("string")
    })
    it("return start_execution_date", () => {
      expect(response._body[0].start_execution_date).toBeDefined()
      expect(typeof response._body[0].start_execution_date).toEqual("string")
    })
    it("return last_executed_step_id", () => {
      expect(response._body[0].last_executed_step_id).toBeDefined()
      expect(typeof response._body[0].last_executed_step_id).toEqual("number")
    })
    it("return last_executed_step_date", () => {
      expect(response._body[0].last_executed_step_date).toBeDefined()
      expect(typeof response._body[0].last_executed_step_date).toEqual("string")
    })
    it("return stop_execution_date", () => {
      expect(response._body[0].stop_execution_date).toBeDefined()
      expect(typeof response._body[0].stop_execution_date).toEqual("string")
    })
    it("return job_history_id", () => {
      expect(response._body[0].job_history_id).toBeDefined()
      expect(typeof response._body[0].job_history_id).toEqual("number")
    })
    it("return next_scheduled_run_date", () => {
      expect(response._body[0].next_scheduled_run_date).toBeDefined()
      expect(typeof response._body[0].next_scheduled_run_date).toEqual("string")
    })
  })
})

describe("Schedules data", () => {
  let response
  beforeAll(async () => {
    response = await request(app).get("/api/schedules/").set("Accept", "application/json")
  })
  it("should respond with a 200 status code", () => {
    expect(response.status).toEqual(200)
  })

  it("should return JSON data", () => {
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })

  describe("should return data as expected", () => {
    it("return next_run_timestamp", () => {
      expect(response._body[0].next_run_timestamp).toBeDefined()
      expect(typeof response._body[0].next_run_timestamp).toEqual("string")
    })
    it("return schedule_id", () => {
      expect(response._body[0].schedule_id).toBeDefined()
      expect(typeof response._body[0].schedule_id).toEqual("number")
    })
    it("return job_id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return next_run_date", () => {
      expect(response._body[0].next_run_date).toBeDefined()
      expect(typeof response._body[0].next_run_date).toEqual("number")
    })
    it("return next_run_time", () => {
      expect(response._body[0].next_run_time).toBeDefined()
      expect(typeof response._body[0].next_run_time).toEqual("number")
    })
  })
})

describe("History data", () => {
  let response
  beforeAll(async () => {
    response = await request(app).get("/api/history/").set("Accept", "application/json")
  })
  it("should respond with a 200 status code", () => {
    expect(response.status).toEqual(200)
  })

  it("should return JSON data", () => {
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })
  describe("should return data as expected", () => {
    it("return run_timestamp", () => {
      expect(response._body[0].run_timestamp).toBeDefined()
      expect(typeof response._body[0].run_timestamp).toEqual("string")
    })
    it("return instance_id", () => {
      expect(response._body[0].instance_id).toBeDefined()
      expect(typeof response._body[0].instance_id).toEqual("number")
    })
    it("return job_id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return step_id", () => {
      expect(response._body[0].step_id).toBeDefined()
      expect(typeof response._body[0].step_id).toEqual("number")
    })
    it("return step_name", () => {
      expect(response._body[0].step_name).toBeDefined()
      expect(typeof response._body[0].step_name).toEqual("string")
    })
    it("return sql_message_id", () => {
      expect(response._body[0].sql_message_id).toBeDefined()
      expect(typeof response._body[0].sql_message_id).toEqual("number")
    })
    it("return sql_severity", () => {
      expect(response._body[0].sql_severity).toBeDefined()
      expect(typeof response._body[0].sql_severity).toEqual("number")
    })
    it("return message", () => {
      expect(response._body[0].message).toBeDefined()
      expect(typeof response._body[0].message).toEqual("string")
    })
    it("return run_status", () => {
      expect(response._body[0].run_status).toBeDefined()
      expect(typeof response._body[0].run_status).toEqual("number")
    })
    it("return run_date", () => {
      expect(response._body[0].run_date).toBeDefined()
      expect(typeof response._body[0].run_date).toEqual("number")
    })
    it("return run_time", () => {
      expect(response._body[0].run_time).toBeDefined()
      expect(typeof response._body[0].run_time).toEqual("number")
    })
    it("return run_duration", () => {
      expect(response._body[0].run_duration).toBeDefined()
      expect(typeof response._body[0].run_duration).toEqual("number")
    })
    it("return operator_id_emailed", () => {
      expect(response._body[0].operator_id_emailed).toBeDefined()
      expect(typeof response._body[0].operator_id_emailed).toEqual("number")
    })
    it("return operator_id_netsent", () => {
      expect(response._body[0].operator_id_netsent).toBeDefined()
      expect(typeof response._body[0].operator_id_netsent).toEqual("number")
    })
    it("return operator_id_paged", () => {
      expect(response._body[0].operator_id_paged).toBeDefined()
      expect(typeof response._body[0].operator_id_paged).toEqual("number")
    })
    it("return retries_attempted", () => {
      expect(response._body[0].retries_attempted).toBeDefined()
      expect(typeof response._body[0].retries_attempted).toEqual("number")
    })
    it("return server", () => {
      expect(response._body[0].server).toBeDefined()
      expect(typeof response._body[0].server).toEqual("string")
    })
  })
})

describe("Steps data", () => {
  let response
  beforeAll(async () => {
    response = await request(app).get("/api/steps/").set("Accept", "application/json")
  })
  it("should respond with a 200 status code", () => {
    expect(response.status).toEqual(200)
  })

  it("should return JSON data", () => {
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })

  describe("should return data as expected", () => {
    it("return last_run_timestamp", () => {
      expect(response._body[0].last_run_timestamp).toBeDefined()
      expect(typeof response._body[0].last_run_timestamp).toEqual("string")
    })
    it("return job_id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return step_id", () => {
      expect(response._body[0].step_id).toBeDefined()
      expect(typeof response._body[0].step_id).toEqual("number")
    })
    it("return step_name", () => {
      expect(response._body[0].step_name).toBeDefined()
      expect(typeof response._body[0].step_name).toEqual("string")
    })
    it("return subsystem", () => {
      expect(response._body[0].subsystem).toBeDefined()
      expect(typeof response._body[0].subsystem).toEqual("string")
    })
    it("return command", () => {
      expect(response._body[0].command).toBeDefined()
      expect(typeof response._body[0].command).toEqual("string")
    })
    it("return flags", () => {
      expect(response._body[0].flags).toBeDefined()
      expect(typeof response._body[0].flags).toEqual("number")
    })
    it("return cmdexec_success_code", () => {
      expect(response._body[0].cmdexec_success_code).toBeDefined()
      expect(typeof response._body[0].cmdexec_success_code).toEqual("number")
    })
    it("return on_success_action", () => {
      expect(response._body[0].on_success_action).toBeDefined()
      expect(typeof response._body[0].on_success_action).toEqual("number")
    })
    it("return on_success_step_id", () => {
      expect(response._body[0].on_success_step_id).toBeDefined()
      expect(typeof response._body[0].on_success_step_id).toEqual("number")
    })
    it("return on_fail_action", () => {
      expect(response._body[0].on_fail_action).toBeDefined()
      expect(typeof response._body[0].on_fail_action).toEqual("number")
    })
    it("return on_fail_step_id", () => {
      expect(response._body[0].on_fail_step_id).toBeDefined()
      expect(typeof response._body[0].on_fail_step_id).toEqual("number")
    })
    it("return database_name", () => {
      expect(response._body[0].database_name).toBeDefined()
      expect(typeof response._body[0].database_name).toEqual("string")
    })
    it("return retry_attempts", () => {
      expect(response._body[0].retry_attempts).toBeDefined()
      expect(typeof response._body[0].retry_attempts).toEqual("number")
    })
    it("return retry_interval", () => {
      expect(response._body[0].retry_interval).toBeDefined()
      expect(typeof response._body[0].retry_interval).toEqual("number")
    })
    it("return os_run_priority", () => {
      expect(response._body[0].os_run_priority).toBeDefined()
      expect(typeof response._body[0].os_run_priority).toEqual("number")
    })
    it("return last_run_outcome", () => {
      expect(response._body[0].last_run_outcome).toBeDefined()
      expect(typeof response._body[0].last_run_outcome).toEqual("number")
    })
    it("return last_run_duration", () => {
      expect(response._body[0].last_run_duration).toBeDefined()
      expect(typeof response._body[0].last_run_duration).toEqual("number")
    })
    it("return last_run_retries", () => {
      expect(response._body[0].last_run_retries).toBeDefined()
      expect(typeof response._body[0].last_run_retries).toEqual("number")
    })
    it("return last_run_date", () => {
      expect(response._body[0].last_run_date).toBeDefined()
      expect(typeof response._body[0].last_run_date).toEqual("number")
    })
    it("return last_run_time", () => {
      expect(response._body[0].last_run_time).toBeDefined()
      expect(typeof response._body[0].last_run_time).toEqual("number")
    })
    it("return step_uid", () => {
      expect(response._body[0].step_uid).toBeDefined()
      expect(typeof response._body[0].step_uid).toEqual("string")
    })
  })
})

describe("Servers data", () => {
  let response
  beforeAll(async () => {
    response = await request(app).get("/api/servers/").set("Accept", "application/json")
  })
  it("should respond with a 200 status code", () => {
    expect(response.status).toEqual(200)
  })

  it("should return JSON data", () => {
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })

  describe("should return data as expected", () => {
    it("return last_run_timestamp", () => {
      expect(response._body[0].last_run_timestamp).toBeDefined()
      expect(typeof response._body[0].last_run_timestamp).toEqual("string")
    })
    it("return job_id", () => {
      expect(response._body[0].job_id).toBeDefined()
      expect(typeof response._body[0].job_id).toEqual("string")
    })
    it("return server_id", () => {
      expect(response._body[0].server_id).toBeDefined()
      expect(typeof response._body[0].server_id).toEqual("number")
    })
    it("return last_run_outcome", () => {
      expect(response._body[0].last_run_outcome).toBeDefined()
      expect(typeof response._body[0].last_run_outcome).toEqual("number")
    })

    it("return last_outcome_message", () => {
      expect(response._body[0].last_outcome_message).toBeDefined()
      expect(typeof response._body[0].last_outcome_message).toEqual("string")
    })
    it("return last_run_date", () => {
      expect(response._body[0].last_run_date).toBeDefined()
      expect(typeof response._body[0].last_run_date).toEqual("number")
    })
    it("return last_run_time", () => {
      expect(response._body[0].last_run_time).toBeDefined()
      expect(typeof response._body[0].last_run_time).toEqual("number")
    })
    it("return last_run_duration", () => {
      expect(response._body[0].last_run_duration).toBeDefined()
      expect(typeof response._body[0].last_run_duration).toEqual("number")
    })
    it("return originating_server_id", () => {
      expect(response._body[0].originating_server_id).toBeDefined()
      expect(typeof response._body[0].originating_server_id).toEqual("number")
    })
    it("return originating_server", () => {
      expect(response._body[0].originating_server).toBeDefined()
      expect(typeof response._body[0].originating_server).toEqual("string")
    })
    it("return master_server", () => {
      expect(response._body[0].master_server).toBeDefined()
      expect(typeof response._body[0].master_server).toEqual("number")
    })
    it("return job_name", () => {
      expect(response._body[0].job_name).toBeDefined()
      expect(typeof response._body[0].job_name).toEqual("string")
    })
  })
})
