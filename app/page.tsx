"use client"

import Image from "next/image";
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from "next/link";

export default function Home() {

  const [user] = useAuthState(auth);

  return (
    <div>
      Hello from Next Js

    {user? <div className="flex justify-center m-6"> 
      <Link href='/dash' className="text-2xl font-bold px-4 py-2 bg-slate-800 rounded-lg"> GO TO DASHBOARD</Link>
    </div> : <div>
      <div>
        Login or SignUp to continue
        </div>
      </div>}

    </div>
    
  );
}
