import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from "../components/navbar.component";
import HomePage from "../components/homepage.component";
import Login from "../components/login.component";
import SignUp from "../components/signup.component";
import Logout from "../components/logout.component";
import RestaurantPage from "../components/restaurnat.component";
import Profile from "../components/userprofile";

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn:false
    }
  }


  loggedInEvent = (e) => {
    this.setState({
      isLoggedIn:true
    });
  };

  loggedOutEvent = (e) => {
    this.setState({
      isLoggedIn:false
    });
  };

  render() {
    return(
        <div>
          <Router>
            <div className="App">
              <NavBar isLoggedIn={this.state.isLoggedIn}></NavBar>
              <div>
                <div>
                  <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/search/:query?' component={HomePage}/>
                    <Route
                        path='/sign-in'
                        render={(props) => <Login {...props} loggedInEvent={this.loggedInEvent} />}
                    />
                    <Route
                        path='/sign-out'
                        render={(props) => <Logout {...props} loggedOutEvent={this.loggedOutEvent} />}
                    />
                    <Route exact path="/sign-up" component={SignUp}/>
                    <Route path="/restaurant/:id" component={RestaurantPage}/>
                    <Route path="/profile/:username?" component={Profile}/>
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        </div>
    )
  }
};