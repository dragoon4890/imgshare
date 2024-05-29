"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        console.log(process.env.RENDER_PUBLIC_PORT)
        // Make API call to authenticate user
        fetch(`${process.env.RENDER_PUBLIC_PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false); // Set loading to false after API call completes
                if (data.token) { // Assuming the token is sent in the 'token' field of the response
                    localStorage.setItem('token', data.token); // Store the token in localStorage
                    console.log('Login successful');
                    router.push('/');
                } else {
                    alert('Incorrect username or password');
                }
            })
            .catch(error => {
                setLoading(false); // Set loading to false if an error occurs
                console.error('Error occurred during login:', error);
            });
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <div className='w-[500px] p-4 bg-white shadow-lg rounded-lg'>
                <form className='flex flex-col gap-8 justify-center items-center' onSubmit={handleSubmit}>
                    <h1 className='text-4xl bold'>Login</h1>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        placeholder='Username'
                        className='grid w-full max-w-sm items-center gap-1.5 px-3 py-3 rounded-lg border border-gray-300'
                    />
                    <input
                        type='password'
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder='Password'
                        className='grid w-full max-w-sm items-center gap-1.5 px-3 py-3 rounded-lg border border-gray-300'
                    />
                    <button
                        type="submit"
                        className="px-8 py-3 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? 'Loading...' : 'Submit'} 
                    </button>
                </form>
                <span className='items-center justify-center flex flex-row w-full mt-5'>
                    <Link href='/register' className='underline underline-offset-4'>New? Make an account</Link>
                </span>
            </div>
        </div>
    );
};

export default Login;
