import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import DateTimePicker from 'react-datetime-picker'
import ReviewComponent from "./reviews.component";
import PostReviewComponent from "./postreviews.component";
import {
  bookAppointmentService,
  claimRestaurantService,
  fetchZomatoRestaurantbyId,
  getRestaurantService,
  unclaimRestaurantService,
  updateRestaurantService
} from "../service/RestaurantService"

import {
  fetchReviewByRestaurantId,
  postReviewService
} from "../service/ReviewService"

export default class RestaurantPage extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = false;
    let loggedInUserId = null;
    if (token !== null) {
      isloggedIn = true;
      loggedInUserId = JSON.parse(token).id;
    }

    this.state = {
      loggedIn: isloggedIn,
      loggedInOwner: false,
      loggedInUserId: loggedInUserId,
      restaurant: null,
      appointmentTime: new Date()
    }

  }

  componentDidMount = async () => {
    const {match: {params}} = this.props;
    let restaurant = await fetchZomatoRestaurantbyId(params.id);
    this.setState({
      restaurant: restaurant
    });

    let restaurantDB = await getRestaurantService(restaurant.id);
    let loggedInOwner;
    if (this.state.loggedInUserId && restaurantDB.name !== null) {
      loggedInOwner = false;
      if (restaurantDB.owner === this.state.loggedInUserId) {
        loggedInOwner = true
      }
    } else {
      restaurantDB = null;
    }

    let reviewDB = await fetchReviewByRestaurantId(restaurant.id);
    this.setState({
      reviewDB: reviewDB,
      restaurant: restaurant,
      restaurantDB: restaurantDB,
      loggedInOwner: loggedInOwner
    })
  };

  selectReservationTime = appointmentTime => this.setState({appointmentTime});

  updateAddress = (e) => {
    this.setState({
      restaurantDB: {
        ...this.state.restaurantDB,
        address: e.target.value
      }
    });
  };

  updateCity = (e) => {
    this.setState({
      restaurantDB: {
        ...this.state.restaurantDB,
        city: e.target.value
      }
    });
  };

  makeReservation = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") !== null) {
      let user = JSON.parse(localStorage.getItem("token"));
      let datetime = {};
      datetime["date"] = this.state.appointmentTime.toString();
      datetime["time"] = this.state.appointmentTime.toString();
      datetime["customerId"] = user.id;
      datetime["restaurantId"] = parseInt(this.state.restaurant.id);
      await bookAppointmentService(datetime);
    }
  };

  unclaimRestaurant = async (e) => {
    e.preventDefault();
    let user = localStorage.getItem("token");
    if (user != null && this.state.restaurantDB != null) {
      await unclaimRestaurantService(this.state.restaurantDB.id);
      let restaurant = await fetchZomatoRestaurantbyId(
          this.state.restaurantDB.id);
      this.setState({
        restaurantDB: null,
      });
    }
  };

  updateRestaurant = async (e) => {
    e.preventDefault();
    let user = localStorage.getItem("token");
    if (user != null && this.state.restaurantDB != null) {
      await updateRestaurantService(this.state.restaurantDB);
    }
    let restaurantDB = await getRestaurantService(this.state.restaurant.id);
    if (restaurantDB.name !== null) {
      this.setState({
        restaurantDB: restaurantDB
      })
    }
  };

  claimRestaurant = async (e) => {
    e.preventDefault();
    let user = localStorage.getItem("token");
    if (user != null && this.state.restaurant != null) {
      let rest = {
        "id": parseInt(this.state.restaurant.id),
        "name": this.state.restaurant.name,
        "address": this.state.restaurant.location.address,
        "city": this.state.restaurant.location.locality_verbose,
        "rating": parseFloat(
            this.state.restaurant.user_rating.aggregate_rating),
        "owner": parseInt(JSON.parse(user).id),
        "website": this.state.restaurant.url,
        "phone": this.state.restaurant.phone_numbers.toString()
      };
      await claimRestaurantService(rest);
    }

    let restaurantDB = await getRestaurantService(this.state.restaurant.id);
    let loggedInOwner;
    if (this.state.loggedInUserId && restaurantDB.name !== null) {
      loggedInOwner = false;
      if (restaurantDB.owner === this.state.loggedInUserId) {
        loggedInOwner = true
      }
    }
    if (restaurantDB.name !== null) {
      this.setState({
        restaurantDB: restaurantDB,
        loggedInOwner:loggedInOwner
      })
    }

  };

  postReview = async (review) => {

    if (localStorage.getItem("token") !== null) {
      let user = JSON.parse(localStorage.getItem("token"));
      review["customerId"] = user.id;
      review["restaurantId"] = parseInt(this.state.restaurant.id);
      await postReviewService(review);
      let reviewDB = await fetchReviewByRestaurantId(this.state.restaurant.id);
      this.setState({
        reviewDB: reviewDB
      })
    }
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/"/>
    }
    return (
        <div className="container-fluid">
          {
            this.state.restaurant
            &&
            <div className="container">
              <div className="result-header">
                <h2>{this.state.restaurant.name}</h2>
              </div>
              <div className="rowC">
                <div className="mt-3 auth-wrapper">
                  <div className="auth-inner-profile">
                    <h2 className="text-center mb-2 border-bottom">Details</h2>
                    <form>
                      <div className="form-group row">
                        <label>Locality : </label>
                        <address className="pl-2">
                          {
                            localStorage.getItem("token") !== null &&
                            JSON.parse(localStorage.getItem("token")).role
                            === "owner" && this.state.restaurantDB !== null &&
                            this.state.restaurantDB !== undefined &&
                            this.state.loggedInOwner === true &&
                            <textarea type="text" className="form-control"
                                      placeholder="Enter city"
                                      value={this.state.restaurantDB.city}
                                      onChange={this.updateCity}
                            />
                          }
                          {
                            this.state.restaurantDB !== null &&
                            this.state.restaurantDB !== undefined &&
                            this.state.loggedInOwner === false &&
                            <textarea type="text" className="form-control"
                                      placeholder="Enter city"
                                      disabled={true}
                                      onChange={this.updateCity}
                                      value={this.state.restaurantDB.city}/>
                          }
                          {
                            this.state.restaurantDB === null
                            &&
                            this.state.restaurant.location.locality_verbose
                          }
                        </address>
                      </div>

                      <div className="form-group row">
                        <label>Address : </label>
                        <address className="pl-2">
                          {
                            localStorage.getItem("token") !== null &&
                            JSON.parse(localStorage.getItem("token")).role
                            === "owner" && this.state.restaurantDB !== null &&
                            this.state.restaurantDB !== undefined &&
                            this.state.loggedInOwner === true &&
                            <textarea type="text" className="form-control"
                                      placeholder="Enter cuisines"
                                      onChange={this.updateAddress}
                                      value={this.state.restaurantDB.address}/>
                          }
                          {
                            this.state.restaurantDB !== null &&
                            this.state.restaurantDB !== undefined &&
                            this.state.loggedInOwner === false &&
                            <textarea type="text" className="form-control"
                                      placeholder="Enter cuisines"
                                      disabled={true}
                                      onChange={this.updateAddress}
                                      value={this.state.restaurantDB.address}/>
                          }
                          {
                            this.state.restaurantDB === null
                            &&
                            this.state.restaurant.location.address
                          }
                        </address>
                      </div>

                      <div className="form-group row">
                        <label>Cuisines : </label>
                        <address className="pl-2">
                          {this.state.restaurant.cuisines.toString()}
                        </address>
                      </div>

                      <div className="form-group row">
                        <label>Price Range : </label>
                        <address className="pl-2">
                          {"$".repeat(this.state.restaurant.price_range)}
                        </address>
                      </div>

                      {
                        localStorage.getItem("token") !== null &&
                        JSON.parse(localStorage.getItem("token")).role
                        === "customer" && this.state.restaurantDB != null &&
                        <div className="form-group row">
                          <DateTimePicker disableClock={true}
                                          disableCalendar={true}
                                          onChange={this.selectReservationTime}
                                          value={this.state.appointmentTime}
                          />
                          <button onClick={this.makeReservation}
                                  className="btn btn-success ml-2">Make
                            Reservation
                          </button>
                        </div>
                      }
                      {
                        localStorage.getItem("token") !== null &&
                        JSON.parse(localStorage.getItem("token")).role
                        === "owner" && this.state.restaurantDB == null &&
                        <div>
                          <div className="form-group row">
                            <button type="submit" onClick={this.claimRestaurant}
                                    className="btn btn-success">Claim Restaurant
                            </button>
                          </div>
                        </div>
                      }
                      {
                        localStorage.getItem("token") !== null &&
                        JSON.parse(localStorage.getItem("token")).role
                        === "owner" && this.state.restaurantDB !== null &&
                        this.state.loggedInOwner &&
                        <div>
                          <div className="form-group row">
                            <button type="submit"
                                    onClick={this.updateRestaurant}
                                    className="btn btn-success">Update
                            </button>
                          </div>
                        </div>
                      }
                      {
                        localStorage.getItem("token") !== null &&
                        JSON.parse(localStorage.getItem("token")).role
                        === "owner" && this.state.restaurantDB !== null &&
                        this.state.loggedInOwner &&
                        <div>
                          <div className="form-group row">
                            <button type="submit"
                                    onClick={this.unclaimRestaurant}
                                    className="btn btn-danger">Unclaim
                              Restaurant
                            </button>
                          </div>
                        </div>
                      }
                    </form>
                  </div>
                </div>
                <div className="mt-3 auth-wrapper">
                  <div className="auth-inner">
                    <h2 className="text-center mb-2 border-bottom">Reviews</h2>
                    {
                      localStorage.getItem("token") !== null &&
                      JSON.parse(localStorage.getItem("token")).role
                      === "customer" && this.state.restaurantDB !== null &&
                      this.state.restaurantDB !== undefined &&
                      <PostReviewComponent postReview={this.postReview}/>

                    }

                    {
                      localStorage.getItem("token") !== null &&
                      this.state.reviewDB &&
                      this.state.reviewDB.map(
                          review =>
                              (review.rating !== null && review.comment
                                  !== undefined) ?
                                  <ReviewComponent review={review}
                                                   key={review.id}/> :
                                  null
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    );
  }
}