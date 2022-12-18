import { apiLogin, apiLogout, apiToken } from "../../utils/constants";
import cookie from "cookie";

export const AUTH_USER_REQUEST = "USER::AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "USER::AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "USER::AUTH_USER_FAILURE";
export const GET_USER_SUCCESS = "USER::GET_USER_SUCCESS";
export const UNAUTH_USER_SUCCESS = "USER::UNAUTH_USER_SUCCESS";

export const authUserRequest = () => ({
  type: AUTH_USER_REQUEST,
});

export const authUserSuccess = () => ({
  type: AUTH_USER_SUCCESS,
});

export const authUserFailure = (error) => ({
  type: AUTH_USER_FAILURE,
  payload: error,
});

export const unauthUserSuccess = () => ({
  type: UNAUTH_USER_SUCCESS,
});

export const getUser = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const authUser = (login) => async (dispatch) => {
  dispatch(authUserRequest());
  try {
    const tokenResponse = await fetch(apiToken, {
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
    });

    if (!tokenResponse.ok) {
      throw new Error(`Could not get token ${apiToken}, received ${tokenResponse.status}`);
    }

    const loginResponse = await fetch(apiLogin, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(login),
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        "X-XSRF-TOKEN": cookie.parse(document.cookie)["XSRF-TOKEN"] || false
      },
    });

    if (!loginResponse.ok) {
      throw new Error(`Could not authorize ${apiToken}, received ${loginResponse.status}`);
    }

    dispatch(authUserSuccess());
    dispatch(getUser(login));
  } catch (err) {
    console.warn(err);
    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(authUserFailure("Ошибка авторизации!"));
  }
};

export const unAuthUser= () => async (dispatch) => {
  try {
    const response = await fetch(apiLogout, {
      method: "POST",
      body: JSON.stringify(null),
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Could not unauthorize ${apiLogout}, received ${response.status}`);
    }

    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(unauthUserSuccess());
  } catch (err) {
    console.warn(err);
  }
};
