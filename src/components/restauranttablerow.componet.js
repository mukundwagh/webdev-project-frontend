import React from 'react';
import {Link} from "react-router-dom";

export default class RestaurantRowComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    restaurant: this.props.restaurant
  };

  render() {
    return (
        <tr>
          <th className="text-left" scope="row">*</th>
          <td className="text-left">
            {
              localStorage.getItem("token")!=null &&
              <Link to={{
                pathname: "/admin",
                state: {
                  restaurant: this.state.restaurant
                }
              }}>{this.state.restaurant.name}</Link>
            }
            {
              localStorage.getItem("token")==null &&
              this.state.restaurant.name
            }
          </td>
        </tr>
    )
  }
}
