import React, { useState } from 'react';

//Lodash
import _ from 'lodash'

//react-bootstrap
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

//Moment - For dates and times
import Moment from 'react-moment';
import moment from 'moment';

//Nivo - Line chart
import { ResponsiveLine } from '@nivo/line'

import { History } from '../history/history.component';
import LastRunOutCome from '../../utils/last-run-outcome.utils';

//icons
import { FiCheck, FiX } from 'react-icons/fi';

//Stylesheet
import './list-item.styles.css';

// ================================================ //

//Each row of the job table and its sub contents
export const ListItem = (props) => {

    const [open, setOpen] = useState(false);
    let durationChartData = []
    let totalHistoryDuration = 0
    let tempActivityChartData = []
    let tempJobChartData = []

 if(open){
    //Preparing empty object for line chart
    durationChartData.push(
        {
            "id": `${props.job.name}`,
            "data" : []
        }
    )

    //Fetching data by id between 0-9 to get top 10 activity
    props.job.activity.filter((val, key) => key <= 9).map((act) => {
        if(act.start_execution_date){
            //reformat activity execution date to be able to compare with history run date
            let activityDate = `${act.start_execution_date.slice(0,4)}${act.start_execution_date.slice(5,7)}${act.start_execution_date.slice(8,10)}`
            //reformat activity execution date to show in line chart as Month-DayTH format
            let formattedActivityDate = `${ moment(act.start_execution_date.slice(0,10), "YYYY-MM-DD").format("MMM Do")}`
            
            props.job.history.filter(ht => ht.step_id == '0' && ht.run_date.toString() === activityDate).map(ht => {
                totalHistoryDuration += ht.run_duration
            })
            tempActivityChartData.push({
                "x": `${formattedActivityDate}`,
                "y": `${totalHistoryDuration}`
            })
            totalHistoryDuration= 0
        }
    })

    //
    durationChartData.map(chartData => chartData.data = _.reverse(tempActivityChartData))
 }
    
    return (
        <>
        <tr onClick={() => setOpen(!open)} aria-controls={`test`} aria-expanded={open}>
            <td>{props.job.enabled == 1 ?  <FiCheck color={"#28a745"} size={"24px"} />: <FiX color={"#d73a49"} size={"24px"} />}</td>
            <td>{props.job.name}</td>
            <td>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} 
                overlay={<Tooltip id="tooltip-disabled"><b><i>{props.job.servers[0].last_outcome_message}</i></b> </Tooltip>}>
                  <span className="d-inline-block">
                    <LastRunOutCome isColored={true} outcome={props.job.servers[0].last_run_outcome} />
                  </span>
                </OverlayTrigger>    
            </td> 
            <td><Moment parse="YYYY-MM-DDTHH:mm:ss" format="DD/MM/YYYY HH:mm:ss">{props.job.servers[0].last_run_timestamp}</Moment></td>
            <td><Moment parse="YYYY-MM-DDTHH:mm:ss" format="DD/MM/YYYY HH:mm:ss">{props.job.schedules.slice(0,1).map(schedule => schedule.next_run_timestamp)}</Moment></td>
        </tr>

        
        <Collapse in={open} >
        <tr className={'subItem'}>
            <td colspan="12">
                <div>  
                { open === true &&
                      <Tabs defaultActiveKey="activity" id="job-details">
                      <Tab eventKey="activity" title="Activity List">
                        <h3>Activity List</h3>
                        <Table bordered hover responsive className={'text-center'}>
                            <thead>
                                <tr>
                                    <th>Activity Date</th>
                                    <th>Run Time</th>
                                    <th>Name</th>
                                    <th>Last Outcome</th>
                                    <th>Run Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                      props.job.activity.map((act) => {
                                          if(act.start_execution_date){
                                            let activity_date = `${act.start_execution_date.slice(0,4)}${act.start_execution_date.slice(5,7)}${act.start_execution_date.slice(8,10)}` 
                                            /* let activity_time = `${act.}` */
                                              return(
                                                    <>
                                                    {
                                                        props.job.history.filter(log => log.step_id == '0' && log.run_date.toString() === activity_date).map((log) =>{
                                                            return <History key={log.instance_id} start_exec_time={act.start_execution_date}  history={log} subHistory={props.job.history.filter(lg => lg.step_id != 0 && lg.run_date.toString() === activity_date && lg.run_time >= log.run_time && lg.run_time <= ( Number(log.run_time) + Number(log.run_duration) )) } />
                                                        })
                                                    
                                                    }
                                                    </>

                                              )
                                          }
                                      })
                                  
                                  
                                  }
                            </tbody>
                        </Table>
                      </Tab>
                      <Tab eventKey="trend" title="Run Duration Trend Chart">
                        <div style={{height:'300px', marginTop:'15px', marginBottom:'25px' }}> 
                            <h3>Run Duration Trend Chart (Last 10 Activity)</h3>
                              <ResponsiveLine  
                              key={durationChartData.id}
                              margin={{ top: 25, right: 100, bottom: 50, left: 50 }}
                              xScale={{ type: 'point' }}
                              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                              axisTop={null}
                              axisRight={null}
                              axisBottom={{
                                  orient: 'bottom',
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Date',
                                  legendOffset: 36,
                                  legendPosition: 'middle'
                              }}
                              axisLeft={{
                                  orient: 'left',
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Run Duration',
                                  legendOffset: -40,
                                  legendPosition: 'middle'
                              }}
                              colors={{ scheme: 'nivo' }}
                              pointSize={7}
                              pointColor={{ theme: 'background' }}
                              pointBorderWidth={2}
                              pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                              pointLabel="y"
                              pointLabelYOffset={-15}
                              areaBlendMode="lighten"
                              useMesh={true}
                              legends={[
                                  {
                                      anchor: 'bottom-right',
                                      direction: 'column',
                                      justify: false,
                                      translateX: 95,
                                      translateY: 0,
                                      itemsSpacing: 0,
                                      itemDirection: 'left-to-right',
                                      itemWidth: 80,
                                      itemHeight: 20,
                                      itemOpacity: 0.75,
                                      symbolSize: 12,
                                      symbolShape: 'circle',
                                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                      effects: [
                                          {
                                              on: 'hover',
                                              style: {
                                                  itemBackground: 'rgba(0, 0, 0, .03)',
                                                  itemOpacity: 1
                                              }
                                          }
                                      ]
                                  }
                              ]}
                              data={durationChartData}/>
                        </div>
                      </Tab>
                    </Tabs>
                }
                </div>
            </td>
        </tr>
        </Collapse>

        
        </>
)}
  

