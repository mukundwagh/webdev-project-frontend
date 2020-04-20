import React, {Component} from "react";
import {
  createUserService,
  findUserByEmailIdService
} from "../service/UserService"
import AppointmentTable from "./userappointment";

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    this.state = {
      detailsOfLoggedInUser: false,
      save_status: null,
      profilePage: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "customer",
        username: ""
      }
    };
  }

  componentDidMount = async () => {

    let token = localStorage.getItem("token");

    if (token !== null) {
      const user = JSON.parse(token);
      let detailsOfLoggedInUser = false;
      let userDB;
      if(this.props.userId===undefined||this.props.userId===null){
        userDB = await findUserByEmailIdService(user.email);
      }else if(user.email===this.props.userId){
        userDB = await findUserByEmailIdService(this.props.userId);
        detailsOfLoggedInUser = true
      }else{
        userDB = await findUserByEmailIdService(this.props.userId);
      }
      this.setState({
        detailsOfLoggedInUser: detailsOfLoggedInUser,
        profilePage: true,
        user: {
          ...this.state.user,
          firstName: userDB.firstName,
          lastName: userDB.lastName,
          email: userDB.email,
          password: userDB.password,
          role: userDB.role,
          username: userDB.username
        },
      })
    }

  }

  componentWillReceiveProps = async (nextProps) => {
    let userDB = await findUserByEmailIdService(nextProps.userId);
    this.setState({
      detailsOfLoggedInUser: nextProps.detailsOfLoggedInUser,
      profilePage: nextProps.profilePage,
      user: {
        ...this.state.user,
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        password: userDB.password,
        role: userDB.role,
        username: userDB.username
      },
    })
  };

  updateEmail = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        email: e.target.value
      },
      save_status: null

    });
  };

  updateUsername = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        username: e.target.value,
      },
      save_status: null

    });
  };

  updatePassword = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value,
      },
      save_status: null

    });

  };

  updateFirstName = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        firstName: e.target.value
      },
      save_status: null

    });
  };

  updateLastName = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        lastName: e.target.value,
      },
      save_status: null

    });

  };

  updateRole = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        role: e.target.value
      },
      save_status: null
    });
  };

  createUser = async (e) => {
    e.preventDefault();
    let out = await createUserService(this.state.user);
    if (out && out.email === null) {
      this.setState({save_status: "Invalid details"})
    } else {
      this.setState({save_status: "Successfully created"})
    }

  };

  render() {
    return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>{this.state.profilePage ? "Profile": "Sign Up"}</h3>

              <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control"
                       placeholder="First name"
                       value={this.state.user.firstName}
                       onChange={this.updateFirstName}/>
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control"
                       placeholder="Last name"
                       value={this.state.user.lastName}
                       onChange={this.updateLastName}/>
              </div>

              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control"
                       placeholder="Enter username"
                       value={this.state.user.username}
                       onChange={this.updateUsername}/>
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control"
                       placeholder="Enter email"
                       value={this.state.user.email}
                       onChange={this.updateEmail}/>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       placeholder="Enter password"
                       value={this.state.user.password}
                       onChange={this.updatePassword}/>
              </div>

              <div className="form-group">
                <label>Type</label>
                <select value={this.state.user.role} className="form-control"
                        onChange={this.updateRole}>
                  <option value="customer">Customer</option>
                  <option value="owner">Restaurant Owner</option>
                </select>
              </div>

              {
                this.state.profilePage===false
                &&
                <button type="submit" className="btn btn-primary btn-block"
                        onClick={this.createUser}>
                  Sign Up
                </button>
              }
              {
                this.state.detailsOfLoggedInUser &&
                this.state.profilePage===true&&
                <button type="submit" className="btn btn-primary btn-block"
                        onClick={this.createUser}>
                  Update
                </button>
              }
              <div>
                {
                  this.state.save_status &&
                  <h6 className="text-danger">
                    {this.state.save_status}
                  </h6>
                }
              </div>
              {
                this.state.detailsOfLoggedInUser &&
                <div className="form-group">
                  <AppointmentTable
                      detailsOfLoggedInUser={this.state.detailsOfLoggedInUser}/>
                </div>
              }
            </form>
          </div>
        </div>
    );
  }
}