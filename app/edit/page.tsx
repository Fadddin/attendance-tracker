"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Modal, Spinner } from 'flowbite-react';

interface Subject {
    name: string;
    attended: number;
    total: number;
    days: string[];
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
    const [newSubject, setNewSubject] = useState<Subject>({ name: '', attended: 0, total: 0, days: [] });
    const [user] = useAuthState(auth);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const router = useRouter();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/user/${user?.email}`);
                console.log(res.data[0].subjects);
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

    const handleSubjectChange = (index: number, field: string, value: string | number | string[]) => {
        if (!data) return;
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
        setData({ ...data, subjects: updatedSubjects });
    };

    const handleDayChange = (index: number, day: string) => {
        if (!data) return;
        const updatedSubjects = [...data.subjects];
        const days = updatedSubjects[index].days.includes(day)
            ? updatedSubjects[index].days.filter(d => d !== day)
            : [...updatedSubjects[index].days, day];
        updatedSubjects[index] = { ...updatedSubjects[index], days };
        setData({ ...data, subjects: updatedSubjects });
    };

    const handleAddSubject = () => {
        if (!data) return;
        setData({ ...data, subjects: [...data.subjects, newSubject] });
        setNewSubject({ name: '', attended: 0, total: 0, days: [] });
    };

    const handleRemoveSubject = (index: number) => {
        if (!data) return;
        const updatedSubjects = data.subjects.filter((_, i) => i !== index);
        setData({ ...data, subjects: updatedSubjects });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSaving(true);

        try {
            await axios.put(`/api/user`, {
                name: data?.name,
                user: data?.user,
                subjects: data?.subjects,
            });
            alert('User data updated successfully');
            router.push('/dash');
        } catch (error) {
            console.error('Error updating user data:', error);
            setError('Failed to update user data');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Modal show={isSaving} size="md" popup={true} onClose={() => setIsSaving(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <Spinner size="xl" />
                        <h3 className="text-lg font-medium text-gray-900 mt-4">Saving...</h3>
                    </div>
                </Modal.Body>
            </Modal>

            <h1 className="text-2xl font-bold my-2 mx-2">Edit User Data</h1>
            <div className="m-8">
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
                            <div key={index} className="border border-slate-600 rounded mx-1 my-2 px-2 py-4">
                                <label>
                                    Subject Name:
                                    <input
                                        type="text"
                                        value={subject.name}
                                        onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                        className="ml-2 px-2 py-1 border rounded text-black"
                                    />
                                </label>
                                <br />
                                <label className="ml-4">
                                    Attended:
                                    <br />
                                    <input
                                        type="number"
                                        value={subject.attended}
                                        onChange={(e) => handleSubjectChange(index, 'attended', parseInt(e.target.value))}
                                        className="ml-2 px-2 py-1 border rounded text-black"
                                    />
                                </label>
                                <br />
                                <label className="ml-4">
                                    Total:
                                    <br />
                                    <input
                                        type="number"
                                        value={subject.total}
                                        onChange={(e) => handleSubjectChange(index, 'total', parseInt(e.target.value))}
                                        className="ml-2 px-2 py-1 border rounded text-black"
                                    />
                                </label>
                                <div className="ml-4">
                                    <label>Days:</label>
                                    <div className="flex flex-wrap">
                                        {daysOfWeek.map((day) => (
                                            <div key={day} className="mr-2 mt-2">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={subject.days.includes(day)}
                                                        onChange={() => handleDayChange(index, day)}
                                                        className="mr-1"
                                                    />
                                                    {day}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubject(index)}
                                    className="mt-2 ml-4 px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="border border-slate-600 rounded mx-1 my-2 px-2 py-4">
                            <label>
                                Subject Name:
                                <input
                                    type="text"
                                    value={newSubject.name}
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                            <br />
                            <label className="ml-4">
                                Attended:
                                <br />
                                <input
                                    type="number"
                                    value={newSubject.attended}
                                    onChange={(e) =>
                                        setNewSubject({ ...newSubject, attended: parseInt(e.target.value) })
                                    }
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                            <br />
                            <label className="ml-4">
                                Total:
                                <br />
                                <input
                                    type="number"
                                    value={newSubject.total}
                                    onChange={(e) => setNewSubject({ ...newSubject, total: parseInt(e.target.value) })}
                                    className="ml-2 px-2 py-1 border rounded text-black"
                                />
                            </label>
                            <div className="ml-4">
                                <label>Days:</label>
                                <div className="flex flex-wrap">
                                    {daysOfWeek.map((day) => (
                                        <div key={day} className="mr-2 mt-2">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={newSubject.days.includes(day)}
                                                    onChange={() => {
                                                        const newDays = newSubject.days.includes(day)
                                                            ? newSubject.days.filter((d) => d !== day)
                                                            : [...newSubject.days, day];
                                                        setNewSubject({ ...newSubject, days: newDays });
                                                    }}
                                                    className="mr-1"
                                                />
                                                {day}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddSubject}
                                className="mt-2 ml-4 px-2 py-1 bg-green-500 text-white rounded"
                            >
                                Add Subject
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditUserDataPage;
