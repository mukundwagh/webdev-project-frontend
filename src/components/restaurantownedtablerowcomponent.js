import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
import DateTimePicker from "react-datetime-picker";
import {
  unclaimRestaurantService
} from "../service/RestaurantService"

export default class RestaurantOwnedTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.restaurant,
      editable: this.props.editable
    };
  }

  deleteRestaurant = async (e) => {
    e.preventDefault();
    await unclaimRestaurantService(this.state.restaurant.id);
    this.props.updateRestaurantTable();

  };

  render() {
    return (
        <tr>
          <th className="text-left" scope="row">*</th>
          <td className="text-left">
            <Link to={`/restaurant/${parseInt(
                this.state.restaurant.id)}`}>
              {this.state.restaurant.name}
            </Link>
          </td>
          {
            this.state.editable &&
            <td className="text-left">
              <i className="fa fa-2x fa-trash"
                 style={{cursor: 'pointer'}}
                 onClick={this.deleteRestaurant}></i>
            </td>
          }
        </tr>

    )

  }
}