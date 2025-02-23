import React from 'react'
import { useDispatch } from 'react-redux'
import auth from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate=useNavigate();

    const LogoutHandler=()=>{
        auth.logout().then(()=>dispatch(logout))
      
    }
  return (
   <button className='inline-block rounded-xl bg-amber-400 p-3 duration-200
   hover:bg-orange-600'
    onClick={LogoutHandler}>Logout</button>
  )
}
