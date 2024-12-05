import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: undefined
}
const Slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setBlogReducer: (state, action) => {
            state.value = action.payload
            }
    }
})

export const { setBlogReducer } = Slice.actions
export default Slice.reducer