import React, {Component} from "react";
import {createUserService} from "../service/UserService"

export default class SignUp extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "User"
  };

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  updatePassword = (e) => {
    this.setState({
      password: e.target.value
    });

  };

  updateFirstName = (e) => {
    this.setState({
      firstname: e.target.value
    });
  };

  updateLastName = (e) => {
    this.setState({
      lastname: e.target.value
    });

  };

  updateRole = (e) => {
    this.setState({
      role: e.target.value
    });
  };

  createUser = async () => {
    createUserService(this.state).then()
  };

  render() {
    return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Sign Up</h3>

              <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control"
                       placeholder="First name"
                       value={this.state.firstname}
                       onChange={this.updateFirstName}/>
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control"
                       placeholder="Last name"
                       value={this.state.lastname}
                       onChange={this.updateLastName}/>
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control"
                       placeholder="Enter email"
                       value={this.state.email} onChange={this.updateEmail}/>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       placeholder="Enter password"
                       value={this.state.password}
                       onChange={this.updatePassword}/>
              </div>

              <div className="form-group">
                <label>Type</label>
                <select value={this.state.role} className="form-control"
                        onChange={this.updateType}>
                  <option value="User">User</option>
                  <option value="Restaurant_Owner">Restaurant Owner</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-block"
                      onClick={this.createUser}>Sign Up
              </button>
              <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
              </p>
            </form>
          </div>
        </div>
    );
  }
}