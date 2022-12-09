import { apiCategory } from "../../utils/constants";

export const GET_CATEGORY_REQUEST = "CATEGORY::GET_CATEGORY_REQUEST";
export const GET_CATEGORY_SUCCESS = "CATEGORY::GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAILURE = "CATEGORY::GET_CATEGORY_FAILURE";

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

export const getCategory = () => async (dispatch) => {
  dispatch(getCategoryRequest());

  try {
    const response = await fetch(apiCategory);
    if (!response.status) {
      console.log(response.status);
      throw new Error(`Could not fetch ${apiCategory}, received ${response.status}`);
    }
    const result = await response.json();
    dispatch(getCategorySuccess(result));
  } catch (err) {
    dispatch(getCategoryFailure(`${err.name}: Ошибка загрузки списка категорий!`));
    console.warn(err);
  }
};
