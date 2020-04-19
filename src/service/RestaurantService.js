import {ZOMATO_API_URL, USER_KEY, API_URL} from "../common/constants";

export const searchRestaurant = async (searchString) => {
  let url = ZOMATO_API_URL + "/search?q=" + searchString;
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


export const fetchZomatoRestaurantbyId = async (restaurantId) => {
  let url = ZOMATO_API_URL + "/restaurant?res_id=" + restaurantId;
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-key': USER_KEY
    }
  });
  return await response.json()
};


export const getRestaurantService = async (restaurant_id) => {
  let url = API_URL + "/restaurant/" + restaurant_id;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};

export const claimRestaurantService = async (restaurant) => {
  let url = API_URL + "/restaurant";
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(restaurant),
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};

export const bookAppointmentService = async (appointment) => {
  let url = API_URL + "/appointment";
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(appointment),
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};


export const updateRestaurantService = async (restaurant) => {
  let url = API_URL + "/restaurant?" + restaurant.id;
  let response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(restaurant),
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};
