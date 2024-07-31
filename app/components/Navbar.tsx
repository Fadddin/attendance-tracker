"use client";

import React, { useState } from 'react';
import { signOutUser } from '../lib/auth';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  const clickHandler = () => {
    signOutUser();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-wrap p-6 justify-between bg-indigo-600 text-white items-center'>
      <Link href='/'>
        <div className='text-2xl font-bold'>Attendy</div>
      </Link>

      <button className='block lg:hidden p-2 rounded bg-black' onClick={toggleMenu}>
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
        </svg>
      </button>

      <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <div className='flex flex-col lg:flex-row lg:ml-auto lg:items-center'>
          {user ? (
            <div className='flex flex-col lg:flex-row lg:items-center'>
              <button className='py-2 px-4 rounded bg-black text-white' onClick={clickHandler}>SignOut</button>
              <p className='mt-2 lg:mt-0 lg:ml-4 lg:text-md text-sm'>{user.email}</p>
            </div>
          ) : (
            <div className='flex flex-col lg:flex-row gap-2 lg:gap-x-4 mt-2 lg:mt-0'>
              <Link href="/auth/signin" className='bg-slate-900 rounded p-2'>SignIn</Link>
              <Link href="/auth/signup" className='bg-slate-900 rounded p-2'>SignUp</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
