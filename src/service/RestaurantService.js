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

export const getRestaurantByOwnerService = async (ownerId) => {
  let url = API_URL + "/restaurants/owner/" + ownerId;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};


export const getAppointmentsByOwner = async (ownerId) => {

  let restaurants = await getRestaurantByOwnerService(ownerId);

  let appointments = [];
  for (const rest of restaurants) {
    let appoint = await getAppointmentsByRestaurant(rest.id)
    appointments = appointments.concat(appoint);
  }

  return appointments;
}


export const getAppointmentsByRestaurant= async (restId) => {
  const url = API_URL+"/appointment/restaurant/"+ restId;
  const response = await fetch(url, {
    method: 'GET'
  });

  let res = await response.json();

  if(response.status===200 && res.length!==0){
    return res
  }

  return res

};