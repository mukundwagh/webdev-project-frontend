import {API_URL} from "../common/constants";

export const createUserService = async (user) => {
  let response = await fetch(API_URL + "/user", {
    method: 'POST',
    body: JSON.stringify(user),
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
