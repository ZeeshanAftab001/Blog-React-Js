import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import auth from '../../appwrite/auth';
import { login as loginAction } from '../../store/authSlice';
import Input from '../Input/Input';
import Button from '../Button';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setError('');
        try {
           // const session = await auth.login(email=data.email,password=data.password);
            const session = await auth.login(data);
            if (session) {
                const userData = await auth.currentUser();
                if (userData) {
                    dispatch(loginAction(userData));
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <h2 className='text-center text-black text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to='/signup'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-4'>
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
                    <Button value="Login" type='submit' className='w-full'>Sign in</Button>
                </form>
            </div>
        </div>
    );
}
