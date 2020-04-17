import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export default class Login extends Component {

  constructor(props) {
    super(props)
    const token = localStorage.getItem("token");
    let isloggedIn = true;

    if (token == null) {
      isloggedIn = false;
    }

    this.state = {
      email: "",
      password: "",
      loggedIn: isloggedIn
    }
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  updatePassword = (e) => {
    this.setState({
      password: e.target.value
    });

  }

  loginUser = (e) => {
    e.preventDefault()
    if (this.state.email === "A" && this.state.password === "A") {
      localStorage.setItem("token", "jwttoken");
      this.setState({
        loggedIn: true
      })
    }

  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/"/>
    }

    return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Sign In</h3>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control"
                       placeholder="Enter email"
                       onChange={this.updateEmail}
                       value={this.state.email}/>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       placeholder="Enter password"
                       onChange={this.updatePassword}
                       value={this.state.password}/>
              </div>

              <button type="submit" className="btn btn-primary btn-block"
                      onClick={this.loginUser}>Submit
              </button>
            </form>
          </div>
        </div>

    );
  }
}