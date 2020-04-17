import {ZOMATO_API_URL,USER_KEY} from "../common/constants";

export const searchRestaurant = async (searchString) => {
  let url = ZOMATO_API_URL + "?q=" + searchString;
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(searchString),
    headers: {
      'content-type': 'application/json',
      'user-key': USER_KEY
    }
  });
  return await response.json()
};
