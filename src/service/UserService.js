import {API_URL} from "../common/constants";

export const createUserService = async (restaurant) => {
  let url = API_URL + "/user";
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(restaurant),
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};


export const findUserByEmailIdService = async (userEmailId) => {
  const url = API_URL+"/user/email/"+ userEmailId;
  const response = await fetch(url, {
    method: 'GET'
  });

  let res = await response.json();

  if(response.status===200 && res.id!=null){
    return res
  }

  return {"error" : "Invalid user input"}

};


export const getAppointments = async (userId) => {
  const url = API_URL+"/appointment/customer/"+ userId;
  const response = await fetch(url, {
    method: 'GET'
  });

  let res = await response.json();

  if(response.status===200 && res.length!==0){
    return res
  }

  return res

};

export const updateAppointmentService = async (appointment) => {
  let url = API_URL + "/appointment/" + appointment.id;
  let response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(appointment),
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};

export const deleteAppointmentService = async (appointment) => {
  let url = API_URL + "/appointment/" + appointment.id;
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.status
};


