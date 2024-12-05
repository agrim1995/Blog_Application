import { createSlice } from "@reduxjs/toolkit";
const slice=createSlice({
    name:"userSlice",
    initialState:{
        value:{
            id:undefined, name:undefined,token:undefined,isLogin:false
        }
    },
    reducers:{
        storeUserInfo(state,action)
    {
      var data=action.payload;
      console.log("inside Data : "+JSON.stringify(data));
      state.value=data
    }   
 }
})
export const{storeUserInfo}=slice.actions;
export default  slice.reducer;