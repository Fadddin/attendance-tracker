"use client"

import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../lib/api';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'


interface Subject {
    name: string;
    attended: number;
    total: number;
}

interface UserData {
    name: string;
    user: string;
    subjects: Subject[];
}

const HomePage: React.FC = () => {
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [user] = useAuthState(auth);


    useEffect(() => {
        const getData = async () => {
            try {
                // alert(user?.email)
                //@ts-ignore
                const result = await fetchUserData(user?.email);
                //@ts-ignore
                console.log(result[0])
                //@ts-ignore
                setData(result[0]);
                console.log("data is "+ data)
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [user?.email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>User Information</h1>
            {data && (
                <div>
                    <h2>Name: {data.name}</h2>
                    <h3>Username: {data.user}</h3>
                    <h3>Subjects:</h3>
                    <ul>
                        {data.subjects?.map((subject, index) => (
                            <li key={index}>
                                <strong>{subject.name}</strong>: {subject.attended} / {subject.total} classes attended
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomePage;
