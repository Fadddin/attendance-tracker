"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';


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

const EditUserDataPage: React.FC = () => {
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newSubject, setNewSubject] = useState<Subject>({ name: '', attended: 0, total: 0 });
    const [user] = useAuthState(auth);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/user/${user?.email}`);
                setData(res.data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchData();
        }
    }, [user?.email]);

    const handleInputChange = (field: string, value: string | number) => {
        if (!data) return;
        setData({ ...data, [field]: value });
    };

    const handleSubjectChange = (index: number, field: string, value: string | number) => {
        if (!data) return;
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
        setData({ ...data, subjects: updatedSubjects });
    };

    const handleAddSubject = () => {
        if (!data) return;
        setData({ ...data, subjects: [...data.subjects, newSubject] });
        setNewSubject({ name: '', attended: 0, total: 0 });
    };

    const handleRemoveSubject = (index: number) => {
        if (!data) return;
        const updatedSubjects = data.subjects.filter((_, i) => i !== index);
        setData({ ...data, subjects: updatedSubjects });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await axios.put(`/api/user`, {
                name: data?.name,
                user: data?.user,
                subjects: data?.subjects,
            });
            alert('User data updated successfully');
            router.push('/dash')
        } catch (error) {
            console.error('Error updating user data:', error);
            setError('Failed to update user data');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Edit User Data</h1>
            <div className='m-8'>
                {data && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label>
                                Email:
                                <input
                                    type="text"
                                    value={data.user}
                                    onChange={(e) => handleInputChange('user', e.target.value)}
                                    readOnly
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                        </div>
                        <h3>Subjects:</h3>
                        {data.subjects.map((subject, index) => (
                            <div key={index} className="mb-4">
                                <label>
                                    Subject Name:
                                    <input
                                        type="text"
                                        value={subject.name}
                                        onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                        className="ml-2 px-2 py-1 border rounded text-black"
                                    />
                                </label>
                                <label className="ml-4">
                                    Attended:
                                    <input
                                        type="number"
                                        value={subject.attended}
                                        onChange={(e) => handleSubjectChange(index, 'attended', parseInt(e.target.value))}
                                        className="ml-2 px-2 py-1 border rounded text-black"
                                    />
                                </label>
                                <label className="ml-4">
                                    Total:
                                    <input
                                        type="number"
                                        value={subject.total}
                                        onChange={(e) => handleSubjectChange(index, 'total', parseInt(e.target.value))}
                                        className="ml-2 px-2 py-1 border rounded text-black"
                                    />
                                </label>
                                <button type="button" onClick={() => handleRemoveSubject(index)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="mb-4">
                            <h4>Add New Subject:</h4>
                            <label>
                                Subject Name:
                                <input
                                    type="text"
                                    value={newSubject.name}
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                            <label className="ml-4">
                                Attended:
                                <input
                                    type="number"
                                    value={newSubject.attended}
                                    onChange={(e) => setNewSubject({ ...newSubject, attended: parseInt(e.target.value) })}
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                            <label className="ml-4">
                                Total:
                                <input
                                    type="number"
                                    value={newSubject.total}
                                    onChange={(e) => setNewSubject({ ...newSubject, total: parseInt(e.target.value) })}
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                            <button type="button" onClick={handleAddSubject} className="ml-4 px-2 py-1 bg-green-500 text-white rounded">
                                Add Subject
                            </button>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditUserDataPage;
