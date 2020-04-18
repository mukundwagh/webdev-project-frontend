import React from 'react';
import StarRating from 'react-star-ratings';

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
      return (<div className="container-fluid">
        <div>

        </div>
        <StarRating rating={this.state.rating}
                    starRatedColor="red"
                    starDefaultColor="gray"
                    numberOfStars={5}
                    name='rating'
                    changeRating={this.changeRating}
                    starDimension="20px"
                    starSpacing="3px"></StarRating>
        <div>
          <textarea
              onChange={this.changeComment}
              value={this.state.comment}
              className="review-comment"
          ></textarea>
          <button onClick={() => {
            this.props.postReview(this.state)}}
                  className="btn btn-dark float-right post">Post Comment
          </button>
        </div>

      </div>)
    }
}
