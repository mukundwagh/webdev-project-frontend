import React, {Component} from 'react';
import SearchBar from "./restaurantsearch.component";
import RestaurantPanel from "./restaurantpannel.component"
import {
  fetchZomatoRestaurantbyId, getRestaurantService,
  searchRestaurant
} from "../service/RestaurantService";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.searchTextChange = this.searchTextChange.bind(this)
    this.searchByValue = this.searchByValue.bind(this)
  }

  get initialState() {
    return {
      searchRestaurantText: '',
      showContent: false,
      searchRestaurantResult: null
    }
  }

  clearSearch = async (e) => {
    this.setState(this.initialState)
    this.props.history.push(`/`)
  };

  searchTextChange = async (e)=> {
    e.persist();
    this.setState({searchRestaurantText: e.target.value});
    if (e.keyCode === 13 || e.which === 13) {
      await this.searchByValue();
    }
  }

  componentWillMount = async () => {
    const { match: { params } } = this.props;
    if(params.query){
      this.setState({
        searchRestaurantText: params.query,
        searchRestaurantResult:await searchRestaurant(params.query)
      });
    }
  };

  searchByValue = async () => {
    if (this.state.searchRestaurantText !== "") {
      console.log('Searching for ', this.state.searchRestaurantText);
      console.log(this.state.searchRestaurantText);
      // this.setState({showContent: false})
      let restaurant = await searchRestaurant(this.state.searchRestaurantText);
      this.setState({
        searchRestaurantResult: restaurant
      },() => {
            this.props.history.push(`/search/${this.state.searchRestaurantText}`)
          })
    }
  };

  // searchByRestaurants = async () => {
  //   if (this.state.searchRestaurantText !== "") {
  //     console.log('Searching for ', this.state.searchRestaurantText);
  //     console.log(this.state.searchRestaurantText);
  //     // this.setState({showContent: false})
  //     let restaurant = await searchRestaurant(this.state.searchRestaurantText);
  //     this.setState({
  //       searchRestaurantResult: restaurant
  //     })
  //   }
  // };

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <SearchBar
                  searchText={this.state.searchRestaurantText}
                  searchTextChange={this.searchTextChange}
                  clearSearch={this.clearSearch}
                  searchByValue={this.searchByValue}/>
            </div>
            <div className="col-4"></div>
          </div>
          <div className="p-2 row">
            <div className="col-4"></div>
            <div className="col-4">
              {
                this.state.searchRestaurantResult &&
                <RestaurantPanel
                    searchRestaurantText={this.state.searchRestaurantText}
                    searchRestaurantResult={this.state.searchRestaurantResult}
                />
              }</div>
            <div className="col-4"></div>
          </div>
        </div>
    );
  }
}
