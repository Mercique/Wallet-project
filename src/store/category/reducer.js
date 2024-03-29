import { FETCH_STATUSES } from "../../utils/constants";
import {
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  POST_CATEGORY_SUCCESS,
  PUT_CATEGORY_SUCCESS,
} from "./actions";

const initialState = {
  data: [],
  error: null,
  errorDelete: null,
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
        errorDelete: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case PUT_CATEGORY_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        errorDelete: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case DELETE_CATEGORY_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        errorDelete: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case DELETE_CATEGORY_FAILURE: {
      return {
        ...state,
        errorDelete: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
