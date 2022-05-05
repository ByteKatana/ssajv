import React from "react"

//react-bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

//Components
import List from "../components/list/list.component"
import LastOutcomeFilter from "../components/last-outcome-filter/last-outcome-filter.component"
import ServerList from "../components/server-list/server-list.component"

//Searchbox
import { SearchBox } from "../components/search-box/search-box.component"

//FullCalendar
import FullCalendar from "@fullcalendar/react"
import listPlugin from "@fullcalendar/list"

//HOC - Loading
import { WithLoading } from "../components/with-loading/with-loading.component"

//ENV
const env = process.env

//Sending Components to HOC
const ListWithLoading = WithLoading(List)
const CalendarWithLoading = WithLoading(FullCalendar)
const ServerListWithLoading = WithLoading(ServerList)

// ================================================ //
class HomePage extends React.Component {
  constructor() {
    super()

    this.state = {
      jobs: [],
      servers: [],
      scheduledJobs: "",
      searchField: "",
      loading: true,
      calendarLoading: true,
      serverListLoading: true,
      LastOutcomeField: ""
    }
    this.getAllJobs.bind(this)
  }

  getAllJobs() {
    if (this.state.loading === false) {
      this.setState({ loading: true })
    }
    return fetch(
      `${env.REACT_APP_API_PROTOCOL}://${env.REACT_APP_API_URI}:${env.REACT_APP_API_PORT}/api/jobs/details`
    )
      .then((response) => response.json())
      .then((jobs) => {
        console.log(jobs)
        this.setState({ loading: false, jobs: jobs })
      })
  }

  componentDidMount() {
    //Getting Schedule data from API Server

    fetch(
      `${env.REACT_APP_API_PROTOCOL}://${env.REACT_APP_API_URI}:${env.REACT_APP_API_PORT}/api/schedules/details`
    )
      .then((response) => response.json())
      .then((sj) => {
        let calendarDts = sj.map((dt) => ({
          title: `${dt.job[0].name}`,
          start: `${
            dt.next_run_date.toString().slice(0, 4) !== 0 && `${dt.next_run_timestamp}`
          }`
        }))
        return this.setState({ scheduledJobs: calendarDts, calendarLoading: false })
      })

    //Getting Jobs from API Server
    this.getAllJobs()

    //Getting Servers from API Server

    fetch(
      `${env.REACT_APP_API_PROTOCOL}://${env.REACT_APP_API_URI}:${env.REACT_APP_API_PORT}/api/servers`
    )
      .then((response) => response.json())
      .then((servers) => {
        return this.setState({ serverListLoading: false, servers: servers })
      })
  }

  render() {
    const {
      jobs,
      servers,
      scheduledJobs,
      searchField,
      loading,
      calendarLoading,
      serverListLoading,
      LastOutcomeField
    } = this.state
    //Filtering jobs when user type in the search box
    var filteredJobs = jobs
      .filter((job) => job.name.toLowerCase().includes(searchField.toLocaleLowerCase()))
      .filter((job) =>
        job.servers[0].last_run_outcome.toString().includes(LastOutcomeField.toString())
      )
    const changeListByServer = (id) => {
      if (this.state.loading === false) {
        this.setState({ loading: true })
      }

      fetch(
        `${env.REACT_APP_API_PROTOCOL}://${env.REACT_APP_API_URI}:${env.REACT_APP_API_PORT}/api/server/${id}/details`
      )
        .then((response) => response.json())
        .then((details) => {
          details[0].jobs.forEach((job) => {
            job.servers = [
              {
                job_id: details[0].job_id,
                server_id: details[0].server_id,
                last_run_outcome: details[0].last_run_outcome,
                last_outcome_message: details[0].last_outcome_message,
                last_run_date: details[0].last_run_date,
                last_run_time: details[0].last_run_time,
                last_run_timestamp: details[0].last_run_timestamp,
                last_run_duration: details[0].last_run_duration,
                originating_server_id: details[0].originating_server_id,
                originating_server: details[0].originating_server,
                master_server: details[0].master_server
              }
            ]
            console.log(job)
          })
          return this.setState({
            loading: false,
            jobs: details[0].jobs
          })
        })
    }

    const filterResult = (filterId) => {
      this.setState({ LastOutcomeField: filterId })
    }

    return (
      <Container fluid className="App">
        <Row className={"mt-5"}>
          <Col md={4}>
            <h2>
              <b>Job List</b>
            </h2>
          </Col>
          <Col md={4}>
            {this.state.loading === false && (
              <Row>
                <Col md={6}>
                  <LastOutcomeFilter filterResult={filterResult} />
                </Col>
                <Col md={6}>
                  <SearchBox
                    placeholder={"Search"}
                    handleChange={(e) => this.setState({ searchField: e.target.value })}
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col md={4}>
            <h2>
              <b>Weekly Schedule</b>
            </h2>
          </Col>
        </Row>
        <Row className={"mt-1"}>
          <Col md={8}>
            <ListWithLoading isLoading={loading} jobs={filteredJobs} />
          </Col>
          <Col md={4}>
            <CalendarWithLoading
              isLoading={calendarLoading}
              plugins={[listPlugin]} //other available options: timeGridPlugin, dayGridPlugin
              initialView="listWeek" //other available options: timeGridWeek (for timeGridPlugin ) -  dayGridMonth (for dayGridPlugin)
              timeZone="Europe/Istanbul"
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit", //the seconds can be added by adding this line => seconds:'2-digit',
                hour12: false
              }}
              firstDay={1} // 0 => sunday 1 => monday 2 => tuesday etc.
              weekends={true}
              locale={"en"}
              events={scheduledJobs}
            />
          </Col>
        </Row>
        <Row className="mt-1">
          <Col md={8}></Col>
          <Col md={4}>
            <h2>
              <b>Server List</b>
            </h2>
            <ServerListWithLoading
              isLoading={serverListLoading}
              servers={servers}
              changeListByServer={changeListByServer}
              getAllJobs={this.getAllJobs.bind(this)}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HomePage
