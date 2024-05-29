"use client"

import Home from '@/components/upload/page';
import GetPics from '@/components/GetPics/page';
import useAuth from '@/components/Auth/Auth';

const Page = () => {

  return (
    <div className='h-screen w-screen flex flex-col items-center gap-8 '>
      <h1 className=' mt-3 text-3xl'>Dashboard</h1>
      <Home />
      < GetPics />
    </div>
  );
}

export default Page;
