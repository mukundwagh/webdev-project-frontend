import React, {Component} from "react";
import {Link} from "react-router-dom";
import AppointmentTable from "./userappointment";
import {searchRestaurant} from "../service/RestaurantService";
import {findUserByUsernameService} from "../service/UserService";
import SignUp from "./signup.component";

export default class Profile extends Component {


  constructor(props) {

    super(props);
    let token = localStorage.getItem("token");

    if (token !== null) {
      const user = JSON.parse(token);
      this.state = {
        detailsOfLoggedInUser:true,
        userId:null,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        username: user.username
      }
    }
  }


  componentWillMount = async () => {
    const { match: { params } } = this.props;
    let username;
    let detailsOfLoggedInUser=false;

    if(params.username){
      username=params.username;
    }else{
      username=this.state.username;
    }

    if(username===this.state.username){
      detailsOfLoggedInUser=true;
    }
    this.setState({
      userId:username,
      detailsOfLoggedInUser:detailsOfLoggedInUser
    });

  };


  componentWillReceiveProps = async (nextProps) => {
    const { match: { params } } = nextProps;
    let userId;
    let detailsOfLoggedInUser=false;

    if(params.username){
      userId=params.username;
    }else{
      userId=this.state.username;
    }

    if(userId===this.state.username){
      detailsOfLoggedInUser=true;
    }
    this.setState({
      userId:userId,
      detailsOfLoggedInUser:detailsOfLoggedInUser
    });

  };

  render() {
    if (localStorage.getItem("token") !== null) {
      return (
          <SignUp detailsOfLoggedInUser={this.state.detailsOfLoggedInUser}
          username={this.state.userId}
          profilePage={true}/>
      );
    }

  }
}