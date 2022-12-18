import { GET_LOCATION } from "./actions";

const initialState = {
  data: "/operations",
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION: {
      return {
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
