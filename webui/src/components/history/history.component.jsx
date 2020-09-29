import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './steps.styles.css';
import Moment from 'react-moment';
import LastRunOutCome from '../../utils/last-run-outcome.utils';
import { HistorySubItem } from '../history-subitem/history-subitem.component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


//Each row of each job's steaps
export const History = (props) => {
    const [subOpen, setSubOpen] = useState(false);

    return(
                <>
                <tr onClick={() => setSubOpen(!subOpen)} aria-controls={`test2`} aria-expanded={subOpen}>
                    <td><Moment format="DD/MM/YYYY">{props.start_exec_time}</Moment></td>
                    <td><Moment parse="YYYY-MM-DDTHH:mm:ss" format="HH:mm:ss"> {props.history.run_timestamp} </Moment></td>
                    <td>{props.history.step_name} </td>
                    <td>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="tooltip-disabled"><b><i>{props.history.message}</i></b> </Tooltip>}>
                       <span className="d-inline-block">
                         <LastRunOutCome isColored={true} outcome={props.history.run_status} />
                       </span>
                    </OverlayTrigger> 
                    </td>
                    <td>{props.history.run_duration}</td>
                </tr>
             
                <Collapse in={subOpen} >
                    <HistorySubItem history={props.subHistory} />
                </Collapse>
                </>

            
                      
    )
}