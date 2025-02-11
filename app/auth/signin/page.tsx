"use client"

import { useState, FormEvent } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Label, TextInput, Modal, Spinner } from "flowbite-react";
import Link from 'next/link';
import { auth } from '@/app/utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Signin() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [resetEmail, setResetEmail] = useState<string>('');
    const [resetError, setResetError] = useState<string | null>(null);
    const [resetMessage, setResetMessage] = useState<string | null>(null);
    const [showResetModal, setShowResetModal] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);

    const router = useRouter();

    async function signIn(email: string, password: string) {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        return credential.user;
    }

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const user = await signIn(email, password);
            console.log('User signed in:', user);
            router.push('/dash');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handlePasswordReset = async () => {
        setIsResetting(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetMessage('Password reset email sent successfully');
            setResetError(null);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setResetError('Failed to send password reset email');
            setResetMessage(null);
        } finally {
            setIsResetting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // console.log('User signed in with Google:', result.user);
            router.push('/dash');
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setError('Failed to sign in with Google');
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <div>
            <div className='flex justify-center font-bold text-2xl m-6'>
                SIGN IN
            </div>

            <form className="flex max-w-md flex-col gap-4 p-4" onSubmit={handleSignIn}>
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
                <Button type="submit">Sign In</Button>
            </form>

            <div className='flex justify-center mb-6'>
                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded shadow-sm hover:bg-gray-100 transition"
                >
                    <img
                        src="/googly.webp" // Place your Google logo in the public/images directory
                        alt="Google Logo"
                        className="h-5 w-5 mr-2"
                    />
                    Sign in with Google
                </button>
            </div>

            <div className='mx-4'>
                Don't have an account? <Link href="/auth/signup" className='text-blue-500'>Sign Up</Link>
            </div>
            <div className='mx-4 mt-2'>
                Forgot your password? <button onClick={() => setShowResetModal(true)} className='text-blue-500 underline'>Reset Password</button>
            </div>
            {error && <p className='text-red-500'>{error}</p>}

            <Modal show={showResetModal} size='md' popup={true} onClose={() => setShowResetModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        {resetMessage && <div className='text-green-500'>{resetMessage}</div>}
                        {resetError && <div className='text-red-500'>{resetError}</div>}
                        <h3 className='text-lg font-medium text-gray-900 mt-4'>Reset Password</h3>
                        <div className='mt-4'>
                            <input
                                type='email'
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className='px-2 py-1 border rounded text-black'
                                placeholder='Enter your email'
                            />
                        </div>
                        <button
                            onClick={handlePasswordReset}
                            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                        >
                            Send Reset Email
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowResetModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
}
