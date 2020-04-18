import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import DateTimePicker from 'react-datetime-picker'
import ReviewComponent from "./reviews.component";
import PostReviewComponent from "./postreviews.component";
import {claimRestaurantService,getRestaurantService,fetchZomatoRestaurantbyId} from "../service/RestaurantService"

export default class RestaurantPage extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = true;
    if (token == null) {
      isloggedIn = false;
    }

    this.state = {
      loggedIn: isloggedIn,
      restaurant: null,
      appointmentTime: new Date()
    }

  }

  componentWillMount = async () => {
      const {match: {params}} = this.props;
      let restaurant = await fetchZomatoRestaurantbyId(params.id);
      this.setState({
        restaurant: restaurant
      });

      let restaurantDB = await
      getRestaurantService(restaurant.id);
      this.setState({
        restaurantDB: restaurantDB
      })
  };


  selectReservationTime = appointmentTime => this.setState({appointmentTime});

  makeReservation = async (e) => {
    console.log(e.toString())
  };

  claimRestaurant = async (e) => {
    let user = localStorage.getItem("token");
    if(user!=null && this.state.restaurant != null){
      let rest ={
        "id": parseInt(this.state.restaurant.id),
        "name": this.state.restaurant.name,
        "address": this.state.restaurant.location.address,
        "city": this.state.restaurant.location.locality_verbose,
        "rating": parseFloat(this.state.restaurant.user_rating.aggregate_rating),
        "owner": parseInt(JSON.parse(user).id),
        "website": this.state.restaurant.url,
        "phone": this.state.restaurant.phone_numbers.toString()
      };

      await claimRestaurantService(rest);
    }
  };


  postReview = async (e) => {
    console.log(e.toString())
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
                  <div className="auth-inner">
                    <h2 className="text-center mb-2 border-bottom">Details</h2>
                    <form>
                      <div className="form-group row">
                        <label>Locality : </label>
                        <address className="pl-2">
                          {this.state.restaurant.location.locality_verbose}
                        </address>
                      </div>

                      <div className="form-group row">
                        <label>Address : </label>
                        <address className="pl-2">
                          {this.state.restaurant.location.address}
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
                        === "customer" && this.state.restaurantDB!=null &&
                        <div className="form-group row">
                          <DateTimePicker disableClock={true}
                                          disableCalendar={true}
                                          onChange={this.selectReservationTime}
                                          value={this.state.appointmentTime}
                          />
                          <button type="submit" onClick={this.makeReservation}
                                  className="btn btn-success ml-2">Make
                            Reservation
                          </button>
                        </div>
                      }
                      {
                        localStorage.getItem("token") !== null &&
                        JSON.parse(localStorage.getItem("token")).role
                        === "owner" && this.state.restaurantDB==null &&
                        <div>
                          <div className="form-group row">
                            <button type="submit" onClick={this.claimRestaurant}
                                    className="btn btn-success">Claim Restaurant
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
                    <div className="form-group row">
                      <PostReviewComponent postReview={this.postReview}/>
                    </div>
                    {
                      localStorage.getItem("token") !== null &&
                      JSON.parse(localStorage.getItem("token")).reviews.map(
                          review =>
                              (review.rating !== null && review.comment
                                  !== undefined) ?
                                  <ReviewComponent review={review}
                                                   key={review.id}/> :
                                  null
                      )
                    }
                  </div>
                  <div>
                    {
                      this.state.restaurant.all_reviews
                      &&
                      this.state.restaurant.all_reviews.reviews.map(review =>
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