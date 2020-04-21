import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {getRestaurantByOwnerNameService} from "../service/RestaurantService";
import RestaurantOwnedTableRow from "./restaurantownedtablerowcomponent";

export default class OwnedRestaurantTable extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    if (token !== null) {
      this.state = {
        auth: true,
        ownerUsername: props.ownerUsername,
        restaurants: null,
        editable: props.editable
      };
    }
  }

  componentDidMount = async () => {
    if (this.state.ownerUsername !== undefined) {
        let restaurants = await getRestaurantByOwnerNameService(this.state.ownerUsername);
        this.setState({restaurants: restaurants})
    }
  };

  updateRestaurantTable = async () => {
    if (this.state.ownerUsername !== undefined) {
      let restaurants = await getRestaurantByOwnerNameService(this.state.ownerUsername);
      this.setState({restaurants: restaurants})
    }
  };

  render() {
    if (this.state && this.state.auth !== null) {
        return (
            <div className="table-responsive">
              <table className="table table-borderless table-light">
                <thead className="m-2">
                <tr>
                  <th className="text-left" scope="col">#</th>
                  <th className="text-left" scope="col">Restaurant Name</th>
                  {
                    this.state.editable &&
                    <th className="text-left" scope="col">Actions</th>
                  }
                </tr>
                </thead>
                <tbody>
                {
                  this.state.restaurants &&
                  this.state.restaurants.map((rest) => (
                          <RestaurantOwnedTableRow restaurant={rest}
                                               editable={this.state.editable}
                                               updateRestaurantTable={this.updateRestaurantTable}
                                               key={rest.id + new Date().getTime()}
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