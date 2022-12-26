import { apiLogin, apiLogout, apiRegister, apiToken, apiUser } from "../../utils/constants";
import { getData } from "../../utils/asyncActions";
import cookie from "cookie";

export const AUTH_LOGIN_REQUEST = "LOGIN::AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "LOGIN::AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "LOGIN::AUTH_LOGIN_FAILURE";
export const AUTH_REGISTER_SUCCESS = "REGISTER::AUTH_REGISTER_SUCCESS";
export const AUTH_EDIT_SUCCESS = "EDIT::AUTH_EDIT_SUCCESS";
export const AUTH_EDIT_FAILURE = "EDIT::AUTH_EDIT_FAILURE";
export const AUTH_USER_REQUEST = "USER::AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "USER::AUTH_USER_SUCCESS";
export const UNAUTH_USER_SUCCESS = "USER::UNAUTH_USER_SUCCESS";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const authRegisterSuccess = () => ({
  type: AUTH_REGISTER_SUCCESS,
});

export const authEditSuccess = () => ({
  type: AUTH_EDIT_SUCCESS,
});

export const authEditFailure = (error) => ({
  type: AUTH_EDIT_FAILURE,
  payload: error,
});

export const authUserRequest = () => ({
  type: AUTH_USER_REQUEST,
});

export const authUserSuccess = (user) => ({
  type: AUTH_USER_SUCCESS,
  payload: user,
});

export const unAuthUserSuccess = () => ({
  type: UNAUTH_USER_SUCCESS,
});

export const authLogin = (login) => async (dispatch) => {
  dispatch(authLoginRequest());
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
      const message = loginResponse.json();
      message.then((err) => dispatch(authLoginFailure(err.message)));
      throw new Error(`Could not authorize ${apiLogin}, received ${loginResponse.status}`);
    }

    dispatch(authLoginSuccess());
  } catch (err) {
    console.warn(err);
    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const authEdit = (id, user) => async (dispatch) => {
  try {
    const editResponse = await fetch(`${apiUser}/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
    });

    if (!editResponse.ok) {
      const message = editResponse.json();
      message.then((err) => dispatch(authEditFailure(err.message)));
      throw new Error(`Could not edit ${apiUser}, received ${editResponse.status}`);
    }

    dispatch(authEditSuccess());
    dispatch(getUser());
  } catch (err) {
    console.warn(err);
  }
};

export const authRegister = (user) => async (dispatch) => {
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

    const registerResponse = await fetch(apiRegister, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        "X-XSRF-TOKEN": cookie.parse(document.cookie)["XSRF-TOKEN"] || false
      },
    });

    if (!registerResponse.ok) {
      const message = registerResponse.json();
      message.then((err) => dispatch(authEditFailure(err.message)));
      throw new Error(`Could not authorize ${apiRegister}, received ${registerResponse.status}`);
    }

    dispatch(authRegisterSuccess());
  } catch (err) {
    console.warn(err);
    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(authUserRequest());
  getData(apiUser)
    .then((data) => dispatch(authUserSuccess(data)))
    .catch((err) => {
      document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
      console.warn("Could not GET user", err);
    });
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
    dispatch(unAuthUserSuccess());
  } catch (err) {
    console.warn(err);
  }
};
