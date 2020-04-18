import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {findUserByEmailIdService} from "../service/UserService"

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
      error:null,
      loggedIn: isloggedIn
    }
  }

  updateEmail = (e) => {
    this.setState({
      error:null,
      email: e.target.value
    });
  };

  updatePassword = (e) => {
    this.setState({
      error:null,
      password: e.target.value
    });

  };

  loginUser = async (e) => {
    e.preventDefault();
    let get_user = await findUserByEmailIdService(this.state.email);
    if (get_user && get_user.error){
      this.setState({
        error: get_user.error
      })
    }else if(this.state.email === get_user.email
        && this.state.password === get_user.password) {
      localStorage.setItem("token", JSON.stringify(get_user));
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
              <div>
                {
                  this.state.error &&
                  <h6 className="text-danger">
                    {this.state.error}
                  </h6>
                }
              </div>
            </form>
          </div>
        </div>

    );
  }
}