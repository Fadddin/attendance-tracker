'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/utils/firebase';
import { Modal, Spinner } from 'flowbite-react';

interface HistoryRecord {
    _id: string;
    subjectName: string;
    date: string;
    time: string;
    status: string;
}

const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user] = useAuthState(auth);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`/api/history/${user?.email}`);
                setHistory(res.data);
            } catch (error) {
                console.error('Error fetching history:', error);
                setError('Failed to fetch history');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchHistory();
        }
    }, [user?.email]);

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            await axios.delete(`/api/deletehis/${id}`);
            setHistory(history.filter(record => record._id !== id));
        } catch (error) {
            console.error('Error deleting history record:', error);
            alert('Failed to delete history record');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className='text-2xl font-bold my-4 mx-2'>Attendance History</h1>
            <div className="flex justify-center items-center">
                <Modal show={isDeleting} size="md" popup={true} onClose={() => setIsDeleting(false)}>
                    <Modal.Header />
                    <Modal.Body className="flex justify-center items-center">
                        <div className="text-center">
                            <Spinner size="xl" />
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Deleting...</h3>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <ul className='m-4'>
                {history.map((record, index) => (
                    <li key={index} className='flex justify-between border rounded my-2 p-2'>
                        <div>
                            <strong>{record.subjectName}</strong>:
                            <br />
                            <strong>Marked : </strong>
                            <span
                                className={record.status === 'present' ? 'text-green-500' : 'text-red-500'}
                            >
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                            <br />
                            <strong>Date :</strong> {new Date(record.date).toLocaleDateString()}
                            <br />
                            <strong>Time :</strong> {record.time}
                            <br />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={() => handleDelete(record._id)}
                                className="my-2 h-8 px-2 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryPage;
