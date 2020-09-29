import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import { AppNavbar } from './components/navbar/navbar.component'

//Pages
import Homepage from './pages/Homepage'
import Statistics from './pages/Statistics'

// ================================================ //

class App extends  React.Component {

  constructor() {
    super();
    this.state = {}

  }


  render(){
    return (
<>
<AppNavbar />
      <Router>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/statistics">
              <Statistics />
            </Route>
        </Switch>
      </Router>
</>
    )
  }
}


export default App;
