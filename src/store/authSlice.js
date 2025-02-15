import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    status:false,
    //status:false,
    userData:{},
}

const authSlice=createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            login : (state,action)=>{
                state.status=true
                state.userData=action.payload

            },
            logout:(state)=>{
                state.status=false
                state.userData={}
            }
        }
    }
)
export default authSlice.reducer;

export const {login,logout} = authSlice.actions


