import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
import {
  getAppointments,
  updateAppointmentService
} from "../service/UserService";
import {getAppointmentsByOwner} from "../service/RestaurantService"
import AppointmentTableRow from "./userappointmentrow"
import DateTimePicker from "react-datetime-picker";

export default class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    let state = {};
    if (token !== null) {
      this.state = {user: JSON.parse(token), appointments: null};
    }
  }


  selectReservationTime = appointmentTime => this.setState({appointmentTime});

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

  updateAppointments = async () => {
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
                  {
                    this.state.user.role === "owner" &&
                    <th className="text-left" scope="col">User</th>
                  }
                  {
                    this.state.user.role === "customer" &&
                    <th className="text-left" scope="col">Actions</th>
                  }
                    </tr>
                </thead>
                <tbody>
                {
                  this.state.appointments &&
                  this.state.appointments.map((appointment) => (
                      <AppointmentTableRow appointment={appointment}
                                           user={this.state.user}
                                           updateAppointments={this.updateAppointments}
                                           key={appointment.id+new Date().getTime()}
                      />
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