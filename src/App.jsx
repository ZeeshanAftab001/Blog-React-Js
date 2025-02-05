import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import auth from "../src/appwrite/auth.js"
import {useDispatch} from "react-redux"
import {login,logout} from "../src/store/authSlice.js"

function App() {
  
  const [loader,setLoader]=useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    auth.currentUser()
    .then((userData)=>{
        useDispatch(login({userData}))
    })
    .finally(()=>useDispatch(logout()))
  },[])



  return (
    <>
    <Header />
    <Footer /> 
    </>
  )
}

export default App
