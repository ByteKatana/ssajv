import React from "react"
import { Form } from "react-bootstrap"

export const SearchBox = ({ placeholder, handleChange }) => (
  <Form.Group>
    <Form.Control
      size="lg"
      type="search"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </Form.Group>
)
