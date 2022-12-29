import { FETCH_STATUSES } from "../../utils/constants";

export const selectPayments = (state) => state.payments.data;
export const selectPaymentsLoading = (state) => state.payments.status === FETCH_STATUSES.REQUEST;
export const selectPaymentsError = (state) => state.payments.error;
export const selectPaymentsPostError = (state) => state.payments.postError;
export const selectPaymentsPutError = (state) => state.payments.putError;