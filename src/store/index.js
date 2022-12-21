import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from "./category/reducer";
import { iconsReducer } from "./icons/reducer";
import { modalReducer } from "./modal/reducer";
import { paymentsReducer } from "./payments/reducer";
import { profileReducer } from "./profile/reducer";

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  payments: paymentsReducer,
  icons: iconsReducer,
  category: categoryReducer,
  modal: modalReducer,
  profile: profileReducer,
})

const rootReducer = (state, action) => {
  if (action.type === "USER::UNAUTH_USER_SUCCESS") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

export const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(thunk)),
);
