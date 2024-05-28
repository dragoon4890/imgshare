import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className='h-screen w-screen '>
        Hello 
        <Link href='/upload'> Do u want to upload</Link>
    </main>
  )
}

export default page
