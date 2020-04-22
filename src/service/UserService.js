import {API_URL} from "../common/constants";

export const createUserService = async (user) => {
  let url = API_URL + "/user";

  let userDB = await findUserByUsernameService(user.username);
  if(userDB.id===null|| userDB.id===undefined) {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    });
    return await response.json()
  }
};



export const updateUserService = async (user) => {

  let userDB = await findUserByUsernameService(user.username);
  if(userDB.id!==null|| userDB.id!==undefined) {
    let url = API_URL + "/user/" + userDB.id;
    let response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    });
    return await response.json()
  }
};



export const findUserByUsernameService = async (userEmailId) => {
  const url = API_URL+"/user/username/"+ userEmailId;
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


