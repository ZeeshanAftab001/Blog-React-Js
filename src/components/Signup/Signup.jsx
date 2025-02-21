import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import auth from '../../appwrite/auth.js'
import { login } from '../../store/authSlice.js';
import { useNavigate,Link } from 'react-router-dom';
import Input from '../Input/Input.jsx';
import Button from '../Button.jsx';


export default function Signup() {
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const navigate=useNavigate();
    const [error,setError]=useState('');

    const signup=(data)=>{
           setError("")
            try {
                const session=auth.register(data);
            if(session){
                const userData=auth.currentUser();
                if(userData) dispatch(login(userData));
                navigate("/");
            }
            } catch (error) {
                setError(error)
            }
    }
  return (
    <div className='flex items-center justify-center w-full'>
    <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <h2 className='text-center text-black text-2xl font-bold leading-tight'>Signup your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Do have an account?&nbsp;
            <Link
                to='/login'
                className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign Up
            </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(signup)} className='mt-8 space-y-4'>
            <Input 
                label='Email'
                type='email'
                placeholder='Enter your email'
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Enter a valid email address'
                    }
                })}
            />
            <Input 
                label='Password'
                type='password'
                placeholder='Enter your password'
                {...register('password', {
                    required: 'Password is required'
                })}
            />
            <Input 
                label='name'
                type='text'
                placeholder='Enter your Name'
                {...register('name', {
                    required: 'Name is required'
                })}
            />
            <Button value="Signup" type='submit' className='w-full'>Signup</Button>
        </form>
    </div>
</div>
  )
}
