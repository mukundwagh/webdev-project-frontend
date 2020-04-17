import {API_URL} from "../common/constants";

export const createUserService = async (user) => {
  let response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  });
  return await response.json()
};



export const findUserByEmailIdService = async (userEmailId) => {
  const response = await fetch(`${API_URL}/${userEmailId}`, {
    method: 'GET'
  });
  return await response.json()
};
