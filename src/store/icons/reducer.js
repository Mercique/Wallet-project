import { FETCH_STATUSES } from "../../utils/constants";
import { GET_ICONS_FAILURE, GET_ICONS_REQUEST, GET_ICONS_SUCCESS } from "./actions";

const initialState = {
  data: [],
  error: null,
  status: FETCH_STATUSES.IDLE,
};

export const iconsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ICONS_REQUEST: {
      return {
        ...state,
        error: null,
        status: FETCH_STATUSES.REQUEST,
      };
    }
    case GET_ICONS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case GET_ICONS_FAILURE: {
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
