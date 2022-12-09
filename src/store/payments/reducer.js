import { FETCH_STATUSES } from "../../utils/constants";
import { GET_PAYMENTS_FAILURE, GET_PAYMENTS_REQUEST, GET_PAYMENTS_SUCCESS } from "./actions";

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
    default: {
      return state;
    }
  }
};
