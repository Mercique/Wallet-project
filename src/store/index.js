import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from "./category/reducer";
import { iconsReducer } from "./icons/reducer";
import { paymentsReducer } from "./payments/reducer";

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  payments: paymentsReducer,
  icons: iconsReducer,
  category: categoryReducer,
});

export const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(thunk)),
);
