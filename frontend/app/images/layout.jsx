"use client"
import React, { useState, useEffect } from 'react';

import Navbar from '@/components/Navbar/page';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className='h-screen w-screen'>Loading...</div>; 
  }

  return (
    <section>
      <div className='text-5xl w-screen bg-white h flex  flex-row justify-around items-center'>
       <h1 className='mb-6 mt-6'> ImgShare</h1>
        </div>
      {children}
    </section>
  );
}
