import React, {Component} from "react";
import {Link} from "react-router-dom"

export default class Logout extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    localStorage.removeItem("token");
    return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              <h3>You have been logged out</h3>
              <Link to="/sign-in">Login</Link>
            </div>
          </div>
        </div>
    );
  }
}