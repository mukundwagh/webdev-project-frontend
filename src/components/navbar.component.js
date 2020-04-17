import React, { Component } from "react";
import {Link,Redirect} from "react-router-dom"
export default class NavBar extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = this.props.isloggedIn;
    if(token==null){
      isloggedIn=false;
    }
    this.state={
      loggedIn:isloggedIn,
      restaurant:null
    }
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>Restaurant Search</Link>
            <div className="collapse navbar-collapse"
                 id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/profile"}>Profile</Link>
                  </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}