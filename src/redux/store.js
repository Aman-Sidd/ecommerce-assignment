import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";

const MyStore = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export default MyStore;
