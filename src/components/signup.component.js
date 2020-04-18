import React, {Component} from "react";
import {createUserService} from "../service/UserService"

export default class SignUp extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    error:null,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
      username: ""
    }
  };

  updateEmail = (e) => {
    this.setState({
    user: {
      ...this.state.user,
      email: e.target.value,
      username: e.target.value
    }
    });
  };

  updatePassword = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value
      }
    });

  };

  updateFirstName = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        firstName: e.target.value
      }
    });
  };

  updateLastName = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        lastName: e.target.value
      }
    });

  };

  updateRole = (e) => {
    this.setState({
      user: {
        ...this.state.user,
      role: e.target.value
      }
    });
  };

  createUser = async () => {
    let out = await createUserService(this.state)
    if(out && out.email===null){
      this.setState({error: "Invalid details"})
    }

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
                       value={this.state.firstName}
                       onChange={this.updateFirstName}/>
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control"
                       placeholder="Last name"
                       value={this.state.lastName}
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
                        onChange={this.updateRole}>
                  <option value="customer">Customer</option>
                  <option value="owner">Restaurant Owner</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-block"
                      onClick={this.createUser}>Sign Up
              </button>
              <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
              </p>
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