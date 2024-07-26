"use client"

import { useState, FormEvent } from 'react';
import { signUp } from '../../lib/auth';

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const user = await signUp(email, password);
            console.log('User signed up:', user);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className='text-black'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className='text-black'

                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
