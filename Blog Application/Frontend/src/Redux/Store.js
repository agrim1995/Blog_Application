import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice";
import  BlogReducer  from "./UpdateSlice";
const store = configureStore({
    reducer:{
      userData:userReducer,
      blogData: BlogReducer
    }
  })
  export default store;