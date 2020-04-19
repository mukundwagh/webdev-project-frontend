import {ZOMATO_API_URL, USER_KEY, API_URL} from "../common/constants";

export const postReviewService = async (review) => {
  let url = API_URL + "/review";
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'content-type': 'application/json',
    }
  });
  return await response.json()
};


export const fetchReviewByRestaurantId = async (restaurantId) => {
  let url = API_URL + "/reviews/restaurant/" + restaurantId;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()

};
