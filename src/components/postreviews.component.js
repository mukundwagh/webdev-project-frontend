import React from 'react';
import StarRating from 'react-star-ratings';
import {Link} from "react-router-dom";

export default class PostReviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      rating: 0,
    };
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };

  changeComment = (e) => {
    this.setState({
      comment: e.target.value
    });
  };

  render() {
    return (
          <div className="review-component review-component-border">
            <StarRating rating={this.state.rating}
                        starRatedColor="red"
                        starDefaultColor="gray"
                        numberOfStars={5}
                        name='rating'
                        changeRating={this.changeRating}
                        starDimension="20px"
                        starSpacing="3px"></StarRating>
            <textarea
                value={this.state.comment}
                onChange={this.changeComment}
                className="review-component"
            ></textarea>
            <button onClick={() => {
              this.props.postReview(this.state)
            }} className="btn btn-dark">Post Comment</button>
        </div>
    )
  }
}
