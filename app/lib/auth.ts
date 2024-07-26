// lib/auth.ts

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { auth } from '../utils/firebase';

export const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

export const signOutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log('User signed out');
    } catch (error) {
        throw error;
    }
};
