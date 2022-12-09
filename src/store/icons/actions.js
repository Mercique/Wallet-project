import { apiIcons } from "../../utils/constants";

export const GET_ICONS_REQUEST = "ICONS::GET_ICONS_REQUEST";
export const GET_ICONS_SUCCESS = "ICONS::GET_ICONS_SUCCESS";
export const GET_ICONS_FAILURE = "ICONS::GET_ICONS_FAILURE";

export const getIconsRequest = () => ({
  type: GET_ICONS_REQUEST,
});

export const getIconsSuccess = (icons) => ({
  type: GET_ICONS_SUCCESS,
  payload: icons,
});

export const getIconsFailure = (error) => ({
  type: GET_ICONS_FAILURE,
  payload: error,
});

export const getIcons = () => async (dispatch) => {
  dispatch(getIconsRequest());

  try {
    const response = await fetch(apiIcons);
    if (!response.status) {
      console.log(response.status);
      throw new Error(`Could not fetch ${apiIcons}, received ${response.status}`);
    }
    const result = await response.json();
    dispatch(getIconsSuccess(result));
  } catch (err) {
    dispatch(getIconsFailure(`${err.name}: Ошибка загрузки списка иконок!`));
    console.warn(err);
  }
};
