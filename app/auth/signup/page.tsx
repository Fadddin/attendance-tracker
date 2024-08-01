"use client"

import { useState, FormEvent } from 'react';
import { signUp } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from 'next/link';


// export default function SignUp() {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [error, setError] = useState<string | null>(null);

//     const router = useRouter();

//     const handleSignUp = async (e: FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         try {
//             const user = await signUp(email, password);
//             console.log('User signed up:', user);
//             router.push('/dash');

//         } catch (error) {
//             setError((error as Error).message);
//         }
//     };

//     return (
//         <div>
//             <h1>Sign Up</h1>
//             <form onSubmit={handleSignUp}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                     className='text-black'
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                     className='text-black'

//                 />
//                 <button type="submit">Sign Up</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// }

export default function Signin() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSignUp = async (e: FormEvent) => {
                e.preventDefault();
                setError(null);
                try {
                    const user = await signUp(email, password);
                    console.log('User signed up:', user);
                    router.push('/dash');
        
                } catch (error) {
                    setError((error as Error).message);
                }
            };

    return (
        <div className='w-full'>
            <div className='flex justify-center font-bold text-2xl m-6'>
                SIGN UP
            </div>

            <form className="flex max-w-md flex-col gap-4 p-4"  onSubmit={handleSignUp}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" className='text-white' />
                    </div>
                    <TextInput 
                        id="email1" 
                        type="email" 
                        placeholder="name@email.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label 
                            htmlFor="password1" 
                            value="Your password" 
                            className='text-white'    
                        />
                    </div>
                    <TextInput 
                        id="password1" 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div> */}
                <Button type="submit">SignUp</Button>
            </form>
            <div className='mx-4'>
                Already have an account ? <Link href="/auth/signin" className='text-blue-500'>Sign In </Link> 
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}