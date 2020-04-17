import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from "../components/navbar.component";
import HomePage from "../components/homepage.component";
import Login from "../components/login.component";
import SignUp from "../components/signup.component";
import Logout from "../components/logout.component";
import AdminPage from "../components/admin.component";
import Profile from "../components/userdetails";

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn:false
    }
  }

  render() {
    return(
        <div>
          <Router>
            <div className="App">
              <NavBar></NavBar>
              <div>
                <div>
                  <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path="/sign-in" component={Login}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/sign-out" component={Logout}/>
                    <Route path="/admin" component={AdminPage}/>
                    <Route path="/profile" component={Profile}/>
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        </div>
    )
  }
};