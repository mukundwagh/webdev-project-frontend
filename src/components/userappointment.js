import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
import {getAppointments} from "../service/UserService";
import {getAppointmentsByOwner} from "../service/RestaurantService"

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

      if(this.state.user.role==="customer"){
        let appointments = await getAppointments(this.state.user.id);
        this.setState({appointments: appointments})
      }else if(this.state.user.role==="owner"){
        let appointments = await getAppointmentsByOwner(this.state.user.id);
        this.setState({appointments: appointments})
      }
    }
  };

  render() {
    if (this.token !== null && this.state.user !== undefined) {
      if (this.state.user) {
        return (
            <div className="table-responsive">
              <table className="table table-borderless table-light">
                <thead className="m-2">
                <tr>
                  <th className="text-left" scope="col">#</th>
                  <th className="text-left" scope="col">Restaurant Name</th>
                  <th className="text-left" scope="col">Date</th>
                  <th className="text-left" scope="col">Time</th>
                  {
                    this.state.user.role === "owner" &&
                    <th className="text-left" scope="col">User</th>
                  }
                    </tr>
                </thead>
                <tbody>
                {
                  this.state.appointments &&
                  this.state.appointments.map((appointment) => (
                          <tr>
                            <th className="text-left" scope="row">*</th>
                            <td className="text-left">
                              <Link to={`/restaurant/${parseInt(appointment.restaurant.id)}`}>
                                {appointment.restaurant.name}
                              </Link>
                            </td>
                            <td className="text-left">
                              {appointment.date}
                            </td>
                            <td className="text-left">
                              {appointment.time}
                            </td>
                            {
                              this.state.user.role==="owner"
                              &&
                              <td className="text-left">
                                <Link to={`/profile/${appointment.customer.username}`}>
                                  {appointment.customer.username}
                                </Link>
                              </td>
                            }
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