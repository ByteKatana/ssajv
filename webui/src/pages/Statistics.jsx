import React from 'react';

import _ from 'lodash'

//react-bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

//Moment - For dates and times
import moment from 'moment';

//Nivo -  Bar Chart
import { ResponsiveBar  } from '@nivo/bar'

//HOC - Loading
import { WithLoading } from '../components/with-loading/with-loading.component'

//Components


//Sending Components to HOC
const ChartWithLoading = WithLoading(ResponsiveBar);

// ================================================

class Statistics extends React.Component {
  constructor() {
    super();

    this.state = {
      jobs: [],
      loading: false,
    }

  }

  componentDidMount(){
    this.setState({ loading: true })
    
    //Getting Jobs from API Server
    fetch('http://localhost:3000/api/jobs/details')
    .then(response => response.json())
    .then(jobs => {
      return this.setState({loading: false, jobs: jobs})
    })


  }


      render(){
        const {jobs, loading} = this.state;

        //Trackers for duration tracking
        let totalHistoryDuration = 0
        let durationChartData = []

        //Trackers for error tracking
        let totalError = 0
        let errorChartData = []


        jobs.map(job => {
          job.activity.filter((val, key) => key <= 9).map((act) => {
            if(act.start_execution_date){
                //reformat activity execution date to be able to compare with history run date
                let activityDate = `${act.start_execution_date.slice(0,4)}${act.start_execution_date.slice(5,7)}${act.start_execution_date.slice(8,10)}`
                
                job.history.filter(ht => ht.step_id == '0' && ht.run_date.toString() === activityDate).map(ht => {
                    totalHistoryDuration += ht.run_duration
                    ht.run_status == '0' && ++totalError
                })
            }
          })
          if(totalHistoryDuration != 0){
            durationChartData.push(
              {
                  "job": `${job.name}`,
                  "Last 10 Activity Total Duration" : totalHistoryDuration
              }
            )
          }
          if(totalError != 0){
            errorChartData.push(
              {
                "job": `${job.name}`,
                "error": totalError
              }
            )
          }
          totalError = 0
          totalHistoryDuration = 0
        })
      

        return(
          <Container fluid>

            <Row style={{marginTop: "50px"}}>
              <Col>

              <Tab.Container id="left-tabs-example" defaultActiveKey="duration-chart">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <h3><b>Chart List</b></h3>
                      <Nav.Item>
                        <Nav.Link eventKey="duration-chart">Top 10 Job - Duration Chart (Last 10 Activity Total Duration)</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="error-chart">Top 10 Job - Error Chart (Last 10 Activity Total Error)</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="duration-chart">
                      <div style={{height:'700px', marginTop:'15px', marginBottom:'25px' }}>
                      <h3><b>Top 10 Job - Duration Chart (Last 10 Activity Total Duration)</b></h3>
                      <ChartWithLoading
                          isLoading={loading}
                      data={ _.orderBy(durationChartData, ['Last 10 Activity Total Duration'], ['desc']).filter((val, key) => key <= 9)} //Order by Last 10 Activity Total Duration - top 10 job
                      keys={[ 'Last 10 Activity Total Duration' ]}
                      indexBy="job"
                      margin={{ top: 25, right: 100, bottom: 50, left: 50 }}
                      padding={0.25}
                      layout="vertical"
                      groupMode="grouped"
                      colors={{ scheme: 'nivo' }}
                      defs={[
                          {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: '#38bcb2',
                              size: 4,
                              padding: 1,
                              stagger: true
                          },
                          {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: '#eed312',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10
                          }
                      ]}

                      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Job',
                          legendPosition: 'middle',
                          legendOffset: 32
                      }}
                      axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Seconds',
                          legendPosition: 'middle',
                          legendOffset: -40
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                      legends={[
                          {
                              dataFrom: 'keys',
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: false,
                              translateX: 120,
                              translateY: 0,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemDirection: 'left-to-right',
                              itemOpacity: 0.85,
                              symbolSize: 20,
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                      animate={true}
                      motionStiffness={90}
                          motionDamping={15}
                      />
                    </div> 
                      </Tab.Pane>
                      <Tab.Pane eventKey="error-chart">
                      <div style={{height:'700px', marginTop:'15px', marginBottom:'25px' }}>
                      <h3><b>Top 10 Job - Error Chart (Last 10 Activity Total Error)</b></h3>
                      <ChartWithLoading
                          isLoading={loading}
                      data={_.orderBy(errorChartData, ['error'], ['desc']).filter((val, key) => key <= 9)  } //Order by error - top 10 job 
                      keys={[ 'error' ]}
                      indexBy="job"
                      margin={{ top: 25, right: 100, bottom: 50, left: 50 }}
                      padding={0.25}
                      layout="vertical"
                      groupMode="grouped"
                      colors={{ scheme: 'nivo' }}
                      defs={[
                          {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: '#38bcb2',
                              size: 4,
                              padding: 1,
                              stagger: true
                          },
                          {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: '#eed312',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10
                          }
                      ]}

                      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Job',
                          legendPosition: 'middle',
                          legendOffset: 32
                      }}
                      axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Errors',
                          legendPosition: 'middle',
                          legendOffset: -40
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                      legends={[
                          {
                              dataFrom: 'keys',
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: false,
                              translateX: 120,
                              translateY: 0,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemDirection: 'left-to-right',
                              itemOpacity: 0.85,
                              symbolSize: 20,
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                      animate={true}
                      motionStiffness={90}
                          motionDamping={15}
                      />
                    </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              </Col>
            </Row>
          </Container>
            
        )
      }

      

}

export default Statistics