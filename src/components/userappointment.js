import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import RestaurantRowComponent from "./restauranttablerow.componet"
import {findUserByEmailIdService} from "../service/UserService";

export default class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    let state = {};
    if (token !== null) {
      this.state = {user: JSON.parse(token), appointments: null};
    }
  }

  componentDidMount = async () => {
    if (this.state.user !== undefined) {
      let userObj = await findUserByEmailIdService(this.state);
      this.setState({user: userObj})
    }
  };

  render() {
    if (this.token !== null && this.state.user !== undefined) {
      if (this.state.user.role === "customer") {
        return (
            <div class="table-responsive">
              <table className="table table-borderless table-light">
                <thead>
                <tr>
                  <th className="text-left" scope="col">#</th>
                  <th className="text-left" scope="col">Restaurant Name</th>
                  <th className="text-left" scope="col">Time</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.user.appointments.map((appointment) => (
                          <tr>
                            <th className="text-left" scope="row">*</th>
                            <td className="text-left">
                              {appointment.restaurantName}
                            </td>
                            <td className="text-left">
                              {appointment.time}
                            </td>
                          </tr>
                      )
                  )
                }
                </tbody>
              </table>
            </div>
        )
      } else if (this.state.user.role === "customer") {
        return (
            <div className="table-responsive">
              <table className="table table-borderless table-light">
                <thead>
                <tr>
                  <th className="text-left" scope="col">#</th>
                  <th className="text-left" scope="col">Restaurant Name</th>
                  <th className="text-left" scope="col">Time</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.user.appointments.map((appointment) => (
                          <tr>
                            <th className="text-left" scope="row">*</th>
                            <td className="text-left">
                              {appointment.restaurantName}
                            </td>
                            <td className="text-left">
                              {appointment.time}
                            </td>
                          </tr>
                      )
                  )
                }
                </tbody>
              </table>
            </div>
        )
      }

    }
  }
}