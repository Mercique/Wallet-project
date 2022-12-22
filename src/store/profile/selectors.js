import { FETCH_STATUSES } from "../../utils/constants";

export const selectLoginLoading = (state) =>state.profile.loginStatus === FETCH_STATUSES.REQUEST;
export const selectLoginSuccess = (state) =>state.profile.loginStatus === FETCH_STATUSES.SUCCESS;
export const selectLoginError = (state) => state.profile.loginError;
export const selectUserLoading = (state) =>state.profile.userStatus === FETCH_STATUSES.REQUEST;
export const selectUser = (state) => state.profile.user;
export const selectUserAuthed = (state) => state.profile.authed;
export const selectUserCreateError = (state) => state.profile.createError;
