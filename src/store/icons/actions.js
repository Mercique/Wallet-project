import { getData } from "../../utils/asyncActions";
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

export const getIcons = () => (dispatch) => {
  dispatch(getIconsRequest());

  getData(apiIcons)
    .then((result) => dispatch(getIconsSuccess(result)))
    .catch((err) => {
      console.warn(err);
      dispatch(getIconsFailure("Ошибка загрузки иконок!"));
    });
};
