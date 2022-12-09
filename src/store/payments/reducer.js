import { FETCH_STATUSES } from "../../utils/constants";
import { DELETE_PAYMENTS_SUCCESS, GET_PAYMENTS_FAILURE, GET_PAYMENTS_REQUEST, GET_PAYMENTS_SUCCESS, POST_PAYMENTS_SUCCESS, PUT_PAYMENTS_SUCCESS } from "./actions";

const initialState = {
  data: [],
  error: null,
  status: FETCH_STATUSES.IDLE,
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENTS_REQUEST: {
      return {
        ...state,
        error: null,
        status: FETCH_STATUSES.REQUEST,
      };
    }
    case GET_PAYMENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case GET_PAYMENTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        status: FETCH_STATUSES.FAILURE,
      };
    }
    case POST_PAYMENTS_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case PUT_PAYMENTS_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case DELETE_PAYMENTS_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    default: {
      return state;
    }
  }
};
