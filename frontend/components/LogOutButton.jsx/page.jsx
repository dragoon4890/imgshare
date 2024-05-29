import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();


    return (
        <button
            className="px-8 py-3 h-50 bg-slate-200 text-black text-sm rounded-md hover:bg-black/[0.8] hover:shadow-lg"
            onClick={() => {
                localStorage.removeItem('token');
                router.push('/login'); // Change '/login' to your actual login route
            }}
        >
            Logout
        </button>
    );
};

export default Logout;
