import React from 'react';
import Moment from 'react-moment';
import LastRunOutCome from '../../utils/last-run-outcome.utils';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


//Each row of each job's steaps
export const HistorySubItem = (props) => (
        
        props.history.map(log =>(
                                    <tr className={`step_item ${props.className}`} >
                                         <td> </td>
                                         <td><Moment parse="YYYY-MM-DDTHH:mm:ss" format="HH:mm:ss"> {log.run_timestamp} </Moment></td>
                                         <td> {log.instance_id} - {log.step_name}</td>
                                         <td>
                                             <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="tooltip-disabled"><b><i>{log.message}</i></b> </Tooltip>}>
                                                <span className="d-inline-block">
                                                  <LastRunOutCome isColored={true} outcome={log.run_status} />
                                                </span>
                                             </OverlayTrigger> 
                                        </td>
                                         <td>{log.run_duration}</td>
                                    </tr>
                                )
                         )
		
        
    )
