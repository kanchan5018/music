import { act } from "react";
import { ActionTypes } from "./action";

const defaultState = {
  registraData: '',
  isRegistration: false,
  isLogin: false,
  logindata: {},
  registerStatus: '',
  loginstatus: ''
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_REQUEST:
      return {
        ...state,
        isRegistration: true,
      };
    case ActionTypes.REGISTRATION_SUCCESS:
      return {
        ...state,
        registraData: action.data,
        registerStatus: action.data.status,
        isRegistration: false,
      };
    case ActionTypes.REGISTRATION_FAILURE:
      return {
        ...state,
        isRegistration: false,
        registerStatus: action.data.status,
        error: action.error,
      };
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        logindata: action.data,
        loginstatus:action.data.status,
        isLogin: false,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
        loginstatus:action.data.status,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
