import React from 'react';

//react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import  List  from '../components/list/list.component';
import LastOutcomeFilter from '../components/last-outcome-filter/last-outcome-filter.component'

//Searchbox
import { SearchBox } from '../components/search-box/search-box.component';

//FullCalendar
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

//HOC - Loading
import { WithLoading } from '../components/with-loading/with-loading.component'

//Sending Components to HOC
const ListWithLoading = WithLoading(List);
const CalendarWithLoading = WithLoading(FullCalendar);

// ================================================ //
class HomePage extends React.Component {
    constructor() {
        super();
    
        this.state = {
          jobs: [],
          scheduledJobs: [],
          searchField: '',
          loading: false,
          calendarLoading: false,
          LastOutcomeField: ''
        }
    
      }

      componentDidMount(){
        this.setState({ loading: true })
        this.setState({ calendarLoading: true })
        
        //Getting Jobs from API Server
        fetch('http://localhost:3000/api/jobs/details')
        .then(response => response.json())
        .then(jobs => {
          return this.setState({loading: false, jobs: jobs})
        })
    
        //Getting Schedule data from API Server
        fetch('http://localhost:3000/api/schedules/details')
        .then(response => response.json())
        .then(sj => {
          return this.setState({calendarLoading: false, scheduledJobs: sj})
        })
    
      }

      render(){
        const {jobs, scheduledJobs, searchField, loading, calendarLoading, LastOutcomeField} = this.state;

        //Filtering jobs when user type in the search box
        var filteredJobs = jobs.filter(job => job.name.toLowerCase().includes(searchField.toLocaleLowerCase())).filter(job => job.servers[0].last_run_outcome.toString().includes(LastOutcomeField.toString()))     
/*         if (LastOutcomeField !== undefined){
          filteredJobs = jobs.filter(job => job.servers[0].last_run_outcome.includes(LastOutcomeField.toString()))        
        } */
        /* jobs.filter(job => console.log("LAST OUTCOME IS TYPE is "+typeof(job.servers[0].last_run_outcome))) */
        //Prepairing scheduled jobs' name and date for the calender
        let calendarDates = scheduledJobs.map(sj => (
          {title: `${sj.job[0].name}`, date: `${sj.next_run_date.toString().slice(0,4) != 0 &&  `${sj.next_run_timestamp}`}`}
        ))

        return(
            <Container fluid className="App">
              <Row className={"mt-5"}>
                <Col md={4}>
                  <h2> <b>Job List</b> </h2>
                </Col>
                <Col md={4}>
                  { this.state.loading === false && 
                  <Row><Col md={6}><LastOutcomeFilter handleChange={e => this.setState({LastOutcomeField: e.target.value})} /></Col><Col md={6}> <SearchBox placeholder={'Search'} handleChange={e => this.setState({searchField: e.target.value})} /></Col></Row> }
                </Col>
                <Col md={4}>
                <h2> <b>Weekly Schedule</b> </h2>
                </Col>
              </Row>
              <Row className={"mt-1"}>
                <Col md={8}>
                  <ListWithLoading isLoading={loading} jobs = {filteredJobs} />
                </Col>
                <Col md={4}>
                <CalendarWithLoading
                  isLoading={calendarLoading}
                  plugins={[ listPlugin ]} //other available options: timeGridPlugin, dayGridPlugin 
                  initialView="listWeek" //other available options: timeGridWeek (for timeGridPlugin ) -  dayGridMonth (for dayGridPlugin)
                  timeZone="Europe/Istanbul"
                  eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit', //the seconds can be added by adding this line => seconds:'2-digit',
                    hour12: false
                  }}
                  firstDay={1} // 0 => sunday 1 => monday 2 => tuesday etc.
                  weekends={true}
                  locale={'en'}
                  events={calendarDates.filter(dt => dt.date != "false").map(dt => ({title: `${dt.title}`, start: `${dt.date}`}))}
                  
                />
      
                </Col>
              </Row>   
             </Container>
        )
      }
}

export default HomePage