"use client"

import React from 'react'
import { signOutUser } from '../lib/auth'
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link';

const Navbar = () => {

  const clickHandler = () => {
    signOutUser();

  }

  const [user] = useAuthState(auth);

  return (
    <div className='flex p-6 justify-between bg-indigo-600 text-white items-center'>
      <Link href='/'>
        <div>Attendance Tracker</div>

      </Link>

      <div className='flex gap-2 items-center'>
        {user ? <div>
          <button className='py-2 px-4 rounded bg-black text-white' onClick={clickHandler}>SignOut</button>
        </div> :
         <div className='flex gap-x-4'> 
            <Link href="/auth/signin">Signin</Link>
            <Link href="/auth/signup">SignUp</Link>

          </div>}
        {user ? <p>{user.email}</p> : <p>Guest</p>}
      </div>
    </div>
  )
}

export default Navbar