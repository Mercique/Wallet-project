export const SHOW_EDIT = "EDIT::SHOW_EDIT";
export const HIDE_EDIT = "EDIT::HIDE_EDIT";
export const SHOW_MODAL = "MODAL::SHOW_MODAL";
export const HIDE_MODAL = "MODAL::HIDE_MODAL";

export const showEdit = (payment) => ({
  type: SHOW_EDIT,
  payload: payment,
});

export const hideEdit = () => ({
  type: HIDE_EDIT,
});

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
