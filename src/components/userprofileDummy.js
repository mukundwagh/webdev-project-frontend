import React, {Component} from "react";
import {Link} from "react-router-dom";
import AppointmentTable from "./userappointment";
import {searchRestaurant} from "../service/RestaurantService";
import {findUserByUsernameService} from "../service/UserService";

export default class Profile extends Component {

  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");

    if (token !== null) {
      const user = JSON.parse(token);
      this.state = {
        detailsOfLoggedInUser:true,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        username: user.username
      }
    }

  }


  componentWillMount = async () => {
    const { match: { params } } = this.props;
    let userId;
    let detailsOfLoggedInUser=false;

    if(params.id){
      userId=params.id;
    }else{
      userId=this.state.email;
    }

    if(userId===this.state.email){
      detailsOfLoggedInUser=true;
    }

    let userDB = await findUserByUsernameService(userId);
    this.setState({
      detailsOfLoggedInUser:detailsOfLoggedInUser,
      firstName: userDB.firstName,
      lastName: userDB.lastName,
      email: userDB.email,
      password: userDB.password,
      role: userDB.role,
      username: userDB.username
    });

  };

  render() {
    if (localStorage.getItem("token") !== null) {
      return (

          <div className="container-fluid">
            <div className="auth-wrapper">
              <div className={this.state.detailsOfLoggedInUser?"auth-inner-profile":
                  "auth-inner"}>
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
                    <label>Username</label>
                    <input type="text" className="form-control" readOnly="true"
                           placeholder="Enter username"
                           value={this.state.username}/>
                  </div>

                  <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control"
                           readOnly="true"
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

                  {
                    this.state.detailsOfLoggedInUser &&
                    <div className="form-group">
                      <AppointmentTable/>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
      );
    }

  }
}