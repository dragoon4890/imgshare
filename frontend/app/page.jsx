import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center '>
        <h1 className='semi-bold text-8xl mb-5 '>ImgShare</h1>
        <p className='text-2xl mb-6'> Share Your Images Easily</p>

        <Link href='/dashboard'>     
<button className="px-8 py-4 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
 Try this out
</button>
</Link>
    </main>
  )
}

export default page
