import React from 'react';
import StarRating from 'react-star-ratings';
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

export default class ReviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.review.comment,
      rating: this.props.review.rating,
      username: this.props.review.customer.username,
    };
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }

  changeComment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  render() {
    return (
          <div className="review-component review-component-border">
            <Link to={`/profile/${this.state.username}`}>
              <i className="fa fa-2x fa-user mr-2"></i>
              {this.state.username}
            </Link>
            <div className="d-block">

            <StarRating rating={this.state.rating}
                        starRatedColor="red"
                        starDefaultColor="gray"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="3px"
            ></StarRating>
            </div>

            <textarea
                value={this.state.comment}
                className="review-component"
            ></textarea>
        </div>)
  }
}
