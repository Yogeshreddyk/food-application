import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import RestroReducer from "./Slices/RestraurantInfo";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    restraurant: RestroReducer,
  },
});

export default appStore;
