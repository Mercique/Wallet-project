import { FETCH_STATUSES } from "../../utils/constants";

export const selectPayments = (state) => state.payments.data;
export const selectPaymentsLoading = (state) => state.payments.status === FETCH_STATUSES.REQUEST;
export const selectPaymentsError = (state) => state.payments.error;