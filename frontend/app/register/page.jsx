"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Register = () => {
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
        fetch(`${process.env.PORT}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.ok) {
                    router.push('/login')
                } else {
                    alert('incorrect id or password')
                    console.error(response);
                }
            })
            .catch(error => {
                console.error('Error occurred during login:', error);
            });
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
<card className='w-[500px] '>
            <form className='flex flex-col gap-4 justify-center items-center ' onSubmit={handleSubmit}>
                <h1 className='text-4xl bold '>Register</h1>
                <input type="text" name="username" value={username} onChange={handleChange} placeholder='Username' className='grid w-full max-w-sm items-center gap-1.5 px-3 py-3 rounded-lg'></input>
                <input type='password' name="password" value={password} onChange={handleChange} placeholder='Password' className='grid w-full max-w-sm items-center gap-1.5 px-3 py-3 rounded-lg'></input>
                <button className="px-8 py-3 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
                        Submit
                    </button>
            </form>
            <span className='items-center justify-center flex flex-row w-full mt-5'>
                <Link href='/login'> Existing user?</Link>
            </span>

            </card>
        </div>
    );
};

export default Register;
