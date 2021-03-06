import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import item from "./item";
import cart from "./cart";
import sellItem from "./sellItem";
import order from "./order";

export default combineReducers({
  users: user,
  form: formReducer,
  items: item,
  cart: cart,
  sellItems: sellItem,
  orders: order,
});
