import { FETCH_STATUSES } from "../../utils/constants";

export const selectIcons = (state) => state.icons.data;
export const selectIconsLoading = (state) => state.icons.status === FETCH_STATUSES.REQUEST;
export const selectIconsError = (state) => state.icons.error;