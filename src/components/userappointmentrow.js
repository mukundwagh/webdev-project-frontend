import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
import DateTimePicker from "react-datetime-picker";
import {
  deleteAppointmentService,
  updateAppointmentService
} from "../service/UserService"

export default class AppointmentTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: this.props.appointment,
      user: this.props.user,
      appointmentTime: this.props
    };
  }

  updateAppointmentTime = async (e) => {
    e.preventDefault();
    await updateAppointmentService(this.state.appointment);
    this.props.updateAppointments();

  };

  deleteAppointmentTime = async (e) => {
    e.preventDefault();
    await deleteAppointmentService(this.state.appointment);
    this.props.updateAppointments();
  };

  selectReservationTime = appointmentTime => this.setState({
    appointment: {
      ...this.state.appointment,
      time: appointmentTime,
      date: appointmentTime
    }
  });

  render() {
    return (
        <tr>
          <th className="text-left" scope="row">*</th>
          <td className="text-left">
            <Link to={`/restaurant/${parseInt(
                this.state.appointment.restaurant.id)}`}>
              {this.state.appointment.restaurant.name}
            </Link>
          </td>
          <td className="text-left">
            <DateTimePicker className="w-100"
                            disabled={this.state.user.role !== "customer"}
                            disableClock={true}
                            disableCalendar={true}
                            onChange={this.selectReservationTime}
                            value={this.state.appointment.date}/>
          </td>
          {
            this.state.user.role === "owner"
            &&
            <td className="text-left">
              <Link
                  to={`/profile/${this.state.appointment.customer.username}`}>
                {this.state.appointment.customer.username}
              </Link>
            </td>
          }
          {
            this.state.user.role === "customer" &&
            <td className="text-left">
              <i className="fa fa-2x fa-save mr-2 "
                 style={{cursor:'pointer'}}
                 onClick={this.updateAppointmentTime}></i>
              <i className="fa fa-2x fa-trash"
                 style={{cursor:'pointer'}}
                 onClick={this.deleteAppointmentTime}></i>
            </td>
          }
        </tr>

    )

  }
}