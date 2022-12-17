import { FETCH_STATUSES } from "../../utils/constants";

export const selectCategory = (state) => state.category.data;
export const selectCategoryLoading = (state) => state.category.status === FETCH_STATUSES.REQUEST;
export const selectCategoryError = (state) => state.category.error;
export const selectCategoryErrorDelete = (state) => state.category.errorDelete;