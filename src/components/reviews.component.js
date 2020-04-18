import React from 'react';
import StarRating from 'react-star-ratings';

export default class ReviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.review.comment,
      rating: this.props.review.rating,
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
          <div>
            <div>
              <StarRating rating={this.state.rating}
                          starRatedColor="red"
                          starDefaultColor="gray"
                          numberOfStars={5}
                          name='rating'
                          starDimension="20px"
                          starSpacing="3px"></StarRating>
              <textarea
                  value={this.state.comment}
                  className="review-comment"
              ></textarea>
            </div>
          </div>)
  }
}
