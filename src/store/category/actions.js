import { getData, sendRequest } from "../../utils/asyncActions";
import { apiCategory } from "../../utils/constants";
import { getPayments } from "../payments/actions";

export const GET_CATEGORY_REQUEST = "CATEGORY::GET_CATEGORY_REQUEST";
export const GET_CATEGORY_SUCCESS = "CATEGORY::GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAILURE = "CATEGORY::GET_CATEGORY_FAILURE";
export const POST_CATEGORY_SUCCESS = "CATEGORY::POST_CATEGORY_SUCCESS";
export const PUT_CATEGORY_SUCCESS = "CATEGORY::PUT_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_SUCCESS = "CATEGORY::DELETE_CATEGORY_SUCCESS";

export const getCategoryRequest = () => ({
  type: GET_CATEGORY_REQUEST,
});

export const getCategorySuccess = (category) => ({
  type: GET_CATEGORY_SUCCESS,
  payload: category,
});

export const getCategoryFailure = (error) => ({
  type: GET_CATEGORY_FAILURE,
  payload: error,
});

export const postCategorySuccess = (category) => ({
  type: POST_CATEGORY_SUCCESS,
  payload: category,
});

export const putCategorySuccess = (category) => ({
  type: PUT_CATEGORY_SUCCESS,
  payload: category,
});

export const deleteCategorySuccess = (category) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: category,
});

export const getCategory = () => (dispatch) => {
  dispatch(getCategoryRequest());

  getData(apiCategory)
    .then((result) => dispatch(getCategorySuccess(result)))
    .catch((err) => {
      console.warn(err);
      dispatch(getCategoryFailure("Ошибка загрузки категорий!"));
    });
};

export const addCategory = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(postCategorySuccess(result)))
    .catch((err) => console.log("POST err", err));
};

export const putCategory = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => {
      dispatch(putCategorySuccess(result));
      dispatch(getPayments());
    })
    .catch((err) => console.log("POST err", err));
};

export const deleteCategory = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(deleteCategorySuccess(result)))
    .catch((err) => console.warn(err));
};
