import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
};

const AutSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        SetUser(state,action){
            state.user = action.payload
        },
        RemoveUser(state){
            state.user = null
        }
    }
})

export const {SetUser,RemoveUser} = AutSlice.actions

export default AutSlice.reducer