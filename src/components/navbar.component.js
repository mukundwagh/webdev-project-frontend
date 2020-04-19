import React, {Component} from "react";
import {Link} from "react-router-dom"

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = true;
    if (token === null) {
      isloggedIn = false;
    }
    this.state = {
      loggedIn: isloggedIn,
      restaurant: null
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      loggedIn :nextProps.isLoggedIn,
    })
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>Restaurant Search</Link>
            <div className="collapse navbar-collapse"
                 id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {
                  this.state.loggedIn !== true &&
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                }
                {
                  this.state.loggedIn !== true &&
                  <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                }

                {
                  this.state.loggedIn === true &&
                  <li className="nav-item">
                    <Link className="nav-link" to={"/profile"}>Profile</Link>
                  </li>
                }
                {
                  this.state.loggedIn === true &&
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}