import { FETCH_STATUSES } from "../../utils/constants";
import {
  AUTH_EDIT_FAILURE,
  AUTH_EDIT_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  UNAUTH_USER_SUCCESS,
} from "./actions";

const initialState = {
  user: {},
  createError: null,
  loginError: null,
  loginStatus: FETCH_STATUSES.IDLE,
  logoutStatus: FETCH_STATUSES.IDLE,
  userStatus: FETCH_STATUSES.IDLE,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        loginError: null,
        loginStatus: FETCH_STATUSES.REQUEST,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        loginStatus: FETCH_STATUSES.SUCCESS,
      };
    }
    case AUTH_LOGIN_FAILURE: {
      return {
        ...state,
        loginError: action.payload,
        loginStatus: FETCH_STATUSES.FAILURE,
      };
    }
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        createError: null,
        loginStatus: FETCH_STATUSES.SUCCESS,
      };
    }
    case AUTH_EDIT_SUCCESS: {
      return {
        ...state,
        createError: null,
        loginStatus: FETCH_STATUSES.SUCCESS,
      };
    }
    case AUTH_EDIT_FAILURE: {
      return {
        ...state,
        createError: action.payload,
      };
    }
    case AUTH_USER_REQUEST: {
      return {
        ...state,
        loginError: null,
        userStatus: FETCH_STATUSES.REQUEST,
      };
    }
    case AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload[0],
        loginError: null,
        userStatus: FETCH_STATUSES.SUCCESS,
      };
    }
    case UNAUTH_USER_SUCCESS: {
      return {
        ...state,
        logoutStatus: FETCH_STATUSES.SUCCESS,
      };
    }
    default: {
      return state;
    }
  }
};
