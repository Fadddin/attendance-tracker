"use client"

import { useState, FormEvent } from 'react';
import { signIn } from '../../lib/auth';

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);



    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const user = await signIn(email, password);
            console.log('User signed in:', user);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
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
                <button type="submit">Sign In</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
