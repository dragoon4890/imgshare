"use client"
import React from 'react';



import Navbar from '@/components/Navbar/page';
import useAuth from '@/components/Auth/Auth';





export default function RootLayout({ children }) {
  const loading = useAuth();

  if (loading) {
    return <div className=' h-screen w-screen'>Loading...</div>; // Loading indicator while checking authentication
  }

  return (
    <section>
        <Navbar />
        {children}
     </section>
  );
}
