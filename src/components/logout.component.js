import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";

export default class Logout extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(localStorage.getItem("token")!==null){
      this.props.loggedOutEvent();
      localStorage.removeItem("token");
    }
    return <Redirect to="/"/>;
  }
}