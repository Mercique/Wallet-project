import { FETCH_STATUSES } from "../../utils/constants";
import { GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, POST_CATEGORY_SUCCESS } from "./actions";

const initialState = {
  data: [],
  error: null,
  status: FETCH_STATUSES.IDLE,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST: {
      return {
        ...state,
        error: null,
        status: FETCH_STATUSES.REQUEST,
      };
    }
    case GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case GET_CATEGORY_FAILURE: {
      return {
        ...state,
        error: action.payload,
        status: FETCH_STATUSES.FAILURE,
      };
    }
    case POST_CATEGORY_SUCCESS: {
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
