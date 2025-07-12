import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="dark:bg-gray-950 flex justify-center items-center flex-col gap-3 bg-white h-40 ">
      <div className="flex justify-center items-center gap-8">
        {NavItems.map((items, index) => (
          <div key={index} className="">
            <Link href={items.link} className="dark:text-gray-300 text-gray-700 dark:hover:text-blue-500 hover:text-blue-500 text-center font-bold text-base md:text-lg font-sans transition-all duration-300">
              {items.title}
            </Link>
          </div>
        ))}
      </div>
      <h2 className='text-center text-purple-600 text-lg font-medium'>© 2025 All rights reserved by <span className='font-bold'>Dipu</span></h2>
    </div>
  );
}

interface NavItems {
    title : string,
    link: string
}

const NavItems = [
    {
        title:'Home',
        link:'#hero'
    },
    {
        title:'Works',
        link:'#works'
    },
    {
        title:'Skills',
        link:'#skill'
    },
    {
        title:'Contact Us',
        link:'#contact'
    },
  
]