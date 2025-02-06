"use client"

import { useState, FormEvent } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Label, TextInput, Modal, Spinner } from "flowbite-react";
import Link from 'next/link';
import { auth } from '@/app/utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function signUp(email: string, password: string) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        return credential.user;
    }

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

    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User signed up with Google:', result.user);
            router.push('/dash');
        } catch (error) {
            console.error('Error signing up with Google:', error);
            setError('Failed to sign up with Google');
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <div>
            <div className='flex justify-center font-bold text-2xl m-6'>
                SIGN UP
            </div>

            <form className="flex max-w-md flex-col gap-4 p-4" onSubmit={handleSignUp}>
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                <Button type="submit">Sign Up</Button>
            </form>

            <div className='flex justify-center mb-6'>
                <button
                    onClick={handleGoogleSignUp}
                    className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded shadow-sm hover:bg-gray-100 transition"
                >
                    <img
                        src="/googly.webp" // Ensure the Google logo is in the public/images directory
                        alt="Google Logo"
                        className="h-5 w-5 mr-2"
                    />
                    Sign up with Google
                </button>
            </div>

            <div className='mx-4'>
                Already have an account? <Link href="/auth/signin" className='text-blue-500'>Sign In</Link>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
        </div>
    );
}
