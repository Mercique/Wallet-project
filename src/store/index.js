import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from "./category/reducer";
import { iconsReducer } from "./icons/reducer";
import { modalReducer } from "./modal/reducer";
import { paymentsReducer } from "./payments/reducer";
import { profileReducer } from "./profile/reducer";

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  payments: paymentsReducer,
  icons: iconsReducer,
  category: categoryReducer,
  modal: modalReducer,
  profile: profileReducer,
});

export const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(thunk)),
);
