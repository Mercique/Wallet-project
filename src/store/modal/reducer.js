import { HIDE_EDIT, HIDE_MODAL, SHOW_EDIT, SHOW_MODAL } from "./actions";

const initialState = {
  paymentInfo: {},
  showEditId: null,
  showModal: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT: {
      return {
        ...state,
        paymentInfo: action.payload,
        showEditId: action.payload.id,
      };
    }
    case HIDE_EDIT: {
      return {
        ...state,
        paymentInfo: {},
        showEditId: null,
      };
    }
    case SHOW_MODAL: {
      return {
        ...state,
        showEditId: null,
        showModal: true,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        paymentInfo: {},
        showModal: false,
      };
    }
    default: {
      return state;
    }
  }
};
