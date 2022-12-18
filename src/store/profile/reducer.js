import { FETCH_STATUSES } from "../../utils/constants";
import {
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  GET_USER_SUCCESS,
  UNAUTH_USER_SUCCESS,
} from "./actions";

const initialState = {
  user: {},
  authed: false,
  error: null,
  status: FETCH_STATUSES.IDLE,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST: {
      return {
        ...state,
        error: null,
        status: FETCH_STATUSES.REQUEST,
      };
    }
    case AUTH_USER_SUCCESS: {
      return {
        ...state,
        authed: true,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case AUTH_USER_FAILURE: {
      return {
        ...state,
        authed: false,
        error: action.payload,
        status: FETCH_STATUSES.FAILURE,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        user: action.payload,
        authed: true,
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case UNAUTH_USER_SUCCESS: {
      return {
        user: {},
        authed: false,
        error: null,
        status: FETCH_STATUSES.IDLE,
      };
    }
    default: {
      return state;
    }
  }
};
