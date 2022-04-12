import React from "react"
import { BrowserRouter as Router, Routes, Route /*Link*/ } from "react-router-dom"

import { AppNavbar } from "./components/navbar/navbar.component"

//Pages
import Homepage from "./pages/Homepage"
import Statistics from "./pages/Statistics"

// ================================================ //

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <AppNavbar />
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App
