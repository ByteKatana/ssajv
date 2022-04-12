import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
//import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

//Moment - For dates and times
import Moment from "react-moment"
//import moment from "moment"

import LastRunOutCome from "../../utils/last-run-outcome.utils"

//Style
import "./server-list.style.css"

//icons
import {
  FiServer,
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiCornerUpLeft
} from "react-icons/fi"

function ServerList(props) {
  const { servers, changeListByServer, getAllJobs } = props
  return (
    <ListGroup as="ol">
      <ListGroup.Item key="header-server" variant="dark">
        <Row>
          <Col md={10}>
            <b>Servers</b>
          </Col>
          <Col className="ms-4" md={1}>
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="tooltip-disabled">
                  <b>
                    <i>{` Return all Jobs' List`} </i>
                  </b>
                </Tooltip>
              }>
              <Button
                className="mt-1"
                variant="primary"
                size="sm"
                style={{ borderRadius: "50px" }}
                onClick={() => getAllJobs()}>
                <FiCornerUpLeft className="ms-2 me-2" />
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </ListGroup.Item>
      {servers.map((server) => (
        <ListGroup.Item
          key={server.server_id}
          as="li"
          className="d-flex justify-content-between align-items-start">
          <div className="row ms-2 me-auto">
            <div className="fw-bold" style={{ fontSize: "24px" }}>
              <span className="me-2">
                <FiServer size={24} />
              </span>
              {server.originating_server}
            </div>
          </div>
          <div className="col-3 mt-2">
            <span className="pe-1">
              <LastRunOutCome isColored={true} outcome={server.last_run_outcome} />
            </span>
            <small style={{ fontSize: "9px" }}>{server.job_name}</small>
          </div>
          <div className="col-2 mt-2">
            <span className="pe-1">
              <FiCalendar size={20} />
            </span>
            <small>
              <Moment parse="YYYY-MM-DD" format="DD/MM/YY">
                {server.last_run_date}
              </Moment>
            </small>
          </div>
          <div className="col-2 mt-2">
            <span className="pe-1">
              <FiClock size={20} />
            </span>
            <small>
              <Moment parse="HH:mm:ss" format="HH:mm">
                {server.last_run_time}
              </Moment>
            </small>
          </div>
          <Button
            className="mt-1"
            variant="primary"
            size="sm"
            style={{ borderRadius: "50px" }}
            onClick={() => changeListByServer(server.server_id)}>
            <span>
              <FiChevronRight className="ms-2 me-2" />
            </span>
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ServerList
