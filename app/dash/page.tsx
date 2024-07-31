"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchUserData } from '../lib/api';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { Progress, Modal, Spinner } from 'flowbite-react';

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
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const incrementAttendance = async (subjectName: string) => {
        setIsUpdating(true);
        try {
            await axios.put('/api/increase', {
                user: user?.email,
                subjectName
            })
            //@ts-ignore
            const result = await fetchUserData(user?.email);
            //@ts-ignore
            setData(result[0]);
        } catch (error) {
            console.error('Error updating subject:', error);
            alert('Failed to update subject');
        } finally {
            setIsUpdating(false);
        }
    };

    const absentAttendance = async (subjectName: string) => {
        setIsUpdating(true);
        try {
            await axios.put('/api/absent', {
                user: user?.email,
                subjectName
            });
            //@ts-ignore
            const result = await fetchUserData(user?.email);
            //@ts-ignore

            setData(result[0]);
        } catch (error) {
            console.error('Error updating subject:', error);
            alert('Failed to update subject');
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                //@ts-ignore
                const result = await fetchUserData(user?.email);
                //@ts-ignore
                setData(result[0]);
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
            <div className='flex justify-center items-center'>
                <Modal show={isUpdating} size="md" popup={true} onClose={() => setIsUpdating(false)}>
                    <Modal.Header />
                    <Modal.Body className='flex justify-center items-center'>
                        <div className="text-center">
                            <Spinner size="xl" />
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Updating...</h3>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <div>
                {data ? (
                    <div className='my-6'>
                        <div>
                            <Link href='/edit' className='px-4 py-2 bg-blue-500 rounded-lg m-4'> Edit </Link>
                        </div>
                    </div>
                ) : (
                    <div className='my-8'>
                        <Link href='/create' className="text-2xl mx-6 font-bold px-4 py-2 bg-slate-800 rounded-lg">
                            CREATE ATTENDANCE RECORD
                        </Link>
                    </div>
                )}
            </div>

            {data && (
                <div className='m-4 '>
                    <h3 className='text-3xl my-4 font-bold text-slate-300'>ATTENDANCE:</h3>
                    <ul>
                        {data.subjects?.map((subject, index) => (
                            <li key={index} className='border rounded m-2 p-4 border-slate-700'>
                                <strong>{subject.name}</strong>: {subject.attended} out of {subject.total} classes attended
                                <div className='my-2'>
                                    {/* //@ts-ignore */}
                                    <Progress progress={Number((subject.attended / subject.total * 100).toFixed(2))} textLabel="" size="lg" labelProgress labelText />
                                </div>
                                <button onClick={() => incrementAttendance(subject.name)} className="ml-2 my-1 px-2 py-1 bg-green-500 text-white rounded">
                                    present
                                </button>
                                <button onClick={() => absentAttendance(subject.name)} className="ml-2 my-1 px-2 py-1 bg-red-500 text-white rounded">
                                    absent
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomePage;
