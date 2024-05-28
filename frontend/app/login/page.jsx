"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Make API call to authenticate user
        fetch('http://localhost:8069/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                
                console.log('Login successful');
                router.push('/')
            } else {
                alert('incorrect id or password')
            }
        })
        .catch(error => {
            console.error('Error occurred during login:', error);
        });
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center'>
            <form className='flex flex-col gap-4 justify-center items-center ' onSubmit={handleSubmit}>
                <input type="text" name="username" value={username} onChange={handleChange} placeholder='Username' className='grid w-full max-w-sm items-center gap-1.5'></input>
                <input type='password' name="password" value={password} onChange={handleChange} placeholder='Password' className='grid w-full max-w-sm items-center gap-1.5'></input>
                <button type="submit">Submit</button>
            </form>
            <span className='items-center justify-center flex flex-row w-full'>
            <Link href='/register'> Sign in</Link></span>
        </div>
    );
};

export default Login;
