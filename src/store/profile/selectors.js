import { FETCH_STATUSES } from "../../utils/constants";

export const selectUser = (state) => state.profile.user;
export const selectUserLoading = (state) =>state.profile.status === FETCH_STATUSES.REQUEST;
export const selectUserAuthed = (state) => state.profile.authed;
export const selectUserError = (state) => state.profile.error;
