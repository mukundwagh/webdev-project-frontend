import React, { Component } from "react";
import {Link,Redirect} from "react-router-dom"
import RestaurantRowComponent from "./restauranttablerow.componet"

export default class RestaurantPanel extends Component {
  constructor(props) {
    super(props);
    let restaurantNames;
    if (this.props.searchRestaurantResult){
      restaurantNames = this.props.searchRestaurantResult.restaurants.map(
          restaurant => restaurant.restaurant.name);
    }
    this.state = {
      searchRestaurantText :this.props.searchRestaurantText,
      searchRestaurantResult:this.props.searchRestaurantResult,
      data : {name:restaurantNames}
    };
  }

  componentWillReceiveProps(nextProps){
    let restaurantNames;
    if (this.props.searchRestaurantResult){
      restaurantNames = nextProps.searchRestaurantResult.restaurants.map(
          restaurant => restaurant.restaurant.name);
    }
    this.setState({
      searchRestaurantText :nextProps.searchRestaurantText,
      searchRestaurantResult:nextProps.searchRestaurantResult,
      data : {name:restaurantNames}
    })
  }

  render() {
    return (
          <div class="table-responsive">
            <table className="table table-borderless table-light">
              <thead>
              <tr>
                <th className="text-left" scope="col">#</th>
                <th className="text-left" scope="col">Name</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.searchRestaurantResult.restaurants.map(restaurant =>
                    <RestaurantRowComponent
                        restaurant={restaurant.restaurant}
                        key={restaurant.restaurant.id}
                    />
                )
              }
              </tbody>
            </table>
          </div>
    );
  }
}