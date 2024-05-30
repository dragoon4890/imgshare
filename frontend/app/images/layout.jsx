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
      <Navbar />
      {children}
    </section>
  );
}
