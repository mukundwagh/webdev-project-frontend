import React, { Component } from "react";
import {Link,Redirect} from "react-router-dom"
export default class AdminPage extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = true;
    if(token==null){
      isloggedIn=false;
    }


    this.state={
      loggedIn:isloggedIn,
      restaurant:null
    }

  }

  componentDidMount(){
    const { handle } = this.props.match.params;
    const { restaurant } = this.props.location.state;
    this.setState({
      restaurant: restaurant
    })

  }


  render() {
    if(this.state.loggedIn===false){
        return <Redirect to="/"/>
    }
    return (
        <div>
          <h3>Admin page</h3>
          <div>
            {
              this.state.restaurant &&
              <h1>{this.state.restaurant.name}</h1>
            }
          </div>
          <Link to="/sign-out">Logout</Link>
        </div>
    );
  }
}