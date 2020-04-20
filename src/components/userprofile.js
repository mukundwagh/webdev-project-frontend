import React, {Component} from "react";
import {Link} from "react-router-dom";
import AppointmentTable from "./userappointment";
import {searchRestaurant} from "../service/RestaurantService";
import {findUserByEmailIdService} from "../service/UserService";
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
    let userId;
    let detailsOfLoggedInUser=false;

    if(params.id){
      userId=params.id;
    }else{
      userId=this.state.email;
    }

    if(userId===this.state.email){
      detailsOfLoggedInUser=true;
    }
    this.setState({
      userId:userId,
      detailsOfLoggedInUser:detailsOfLoggedInUser
    });

  };


  componentWillReceiveProps = async (nextProps) => {
    const { match: { params } } = nextProps;
    let userId;
    let detailsOfLoggedInUser=false;

    if(params.id){
      userId=params.id;
    }else{
      userId=this.state.email;
    }

    if(userId===this.state.email){
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
          userId={this.state.userId}
          profilePage={true}/>
      );
    }

  }
}