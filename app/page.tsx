"use client"

import Image from "next/image";
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from "next/link";
import { Alert } from "flowbite-react";
import Accordian from "./components/Accordian";
import Mockup from "./components/Mockup";


export default function Home() {

  const [user] = useAuthState(auth);

  return (
    <div>

      <div className="px-4 py-6">
        <h1 className="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">TRACK ATTENDANCE</span> SIMPLIFIED
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Track your class attendance using a few clicks. Edit it. Delete it. All at ease
        </p>
      </div>
      {user ? <div className="flex justify-center m-6 gap-4">
        <Link href='/viewschedule' className="text-xl lg:text-2xl font-bold px-4 py-2 bg-blue-600 rounded-lg"> GO TO ATTENDANCE</Link>


      </div> : <div>
        <div className="flex justify-center text-md ">

          <Link href='/auth/signin' className="bg-blue-500 text-white font-mono rounded px-4 py-2">Signin or SignUp to continue</Link>
        </div>
      </div>}


      {/* <div className="flex justify-center">
        <Accordian />
      </div> */}

      <div className="p-6">
        <Mockup />
      </div>


      {/* {user ? <div className="flex flex-col justify-center m-6 gap-4">
        <Link href='/dash' className="text-2xl font-bold px-4 py-2 bg-slate-800 rounded-lg"> GO TO DASHBOARD</Link>


      </div> : <div>
        <div>
          Login or SignUp to continue
        </div>
      </div>} */}

    </div>

  );
}
