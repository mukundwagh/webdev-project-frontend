import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Profile extends Component {

  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    if (token !== null) {
      const user = JSON.parse(token);
      this.state = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        username: user.username
      }
    }

  }

  render() {
    if (localStorage.getItem("token") !== null) {
      return (

          <div className="auth-wrapper">
            <div className="auth-inner">
              <form>
                <div className="form-group">
                  <label>First name</label>
                  <input type="text" readOnly="true"
                         className="form-control"
                         placeholder="First name"
                         value={this.state.firstName}
                         />
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" className="form-control" readOnly="true"
                         placeholder="Last name"
                         value={this.state.lastName}
                         />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" readOnly="true"
                         placeholder="Enter email"
                         value={this.state.email}/>
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <select value={this.state.role} className="form-control"
                          disabled="true">
                    <option value="customer">Customer</option>
                    <option value="owner">Restaurant Owner</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
      );
    }

  }
}