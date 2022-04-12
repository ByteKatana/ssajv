import React from "react"
import Table from "react-bootstrap/Table"
import "./list.style.css"
import { ListItem } from "../list-item/list-item.component"

//Job Table
export const List = (props) => {
  return (
    <Table bordered hover responsive className={"text-center"}>
      <thead>
        <tr>
          <th>Enabled</th>
          <th>Name</th>
          <th>Last Outcome</th>
          <th>Last Run</th>
          <th>Next Run</th>
        </tr>
      </thead>
      <tbody>
        {props.jobs.map((job) => (
          <ListItem key={job.job_id} job={job} />
        ))}
      </tbody>
    </Table>
  )
}

export default List
