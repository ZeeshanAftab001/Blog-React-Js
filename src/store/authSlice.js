import { createSlice } from "@reduxjs/toolkit";
import { userData } from "three/tsl";


const initialState ={
    status:false,
    userData
}

const authSlice=createSlice(
    {
        name:"auth",
        initialState,
        reducer:{
            login : (state,action)=>{
                state.status=true
                state.userData=action.payload.userData

            },
            logout:(state)=>{
                state.status=false
                state.userData=null
            }
        }
    }
)
export default authSlice.reducer;

export const {login,logout} = authSlice.actions