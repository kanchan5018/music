export const ActionTypes = {

  REGISTRATION_REQUEST: 'REGISTRATION_REQUEST',
  REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE: 'REGISTRATION_FAILURE',

  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

};


export const registrationRequest = (registrationData) => {
  return {
    type: ActionTypes.REGISTRATION_REQUEST,
    payload: registrationData,
  };
};

export const loginRequest = (loginData) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: loginData,
  };
};
