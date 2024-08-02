"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { Modal, Spinner } from 'flowbite-react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CreateUserPage: React.FC = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;

    const [name, setName] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', attended: 0, total: 0, days: [] as string[] }]);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const router = useRouter();

    const handleSubjectChange = (index: number, field: string, value: string | number | string[]) => {
        const newSubjects = [...subjects];
        newSubjects[index] = { ...newSubjects[index], [field]: value };
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { name: '', attended: 0, total: 0, days: [] }]);
    };

    const handleRemoveSubject = (index: number) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleDayChange = (index: number, day: string) => {
        const newSubjects = [...subjects];
        const days = newSubjects[index].days;
        if (days.includes(day)) {
            newSubjects[index].days = days.filter(d => d !== day);
        } else {
            newSubjects[index].days = [...days, day];
        }
        setSubjects(newSubjects);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsCreating(true);

        try {
            await axios.post('/api/user', {
                name,
                user: email,
                subjects
            });
            console.log(subjects)
            alert('Record Created Successfully');
            router.push('/dash'); // Redirect to home or another page
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <Modal show={isCreating} size="md" popup={true} onClose={() => setIsCreating(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <Spinner size="xl" />
                        <h3 className="text-lg font-medium text-gray-900 mt-4">Creating Record...</h3>
                    </div>
                </Modal.Body>
            </Modal>

            <h1 className='text-xl font-bold my-4 mx-2'>Create Record</h1>
            <form onSubmit={handleSubmit}>
                <div className='mx-2'>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='mx-2 text-black rounded'
                    />
                </div>
                <div>
                    <h2 className='mx-2 my-4 text-xl'>Subjects :</h2>
                    {subjects.map((subject, index) => (
                        <div key={index} className='border border-slate-600 rounded mx-1 my-2 px-2 py-4'>
                            <label htmlFor="name">Subject Name</label>
                            <input
                                type="text"
                                placeholder="Subject Name"
                                value={subject.name}
                                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                required
                                className='mx-2 my-1 text-black rounded'
                            />
                            <br />
                            <label htmlFor="attended">Attended</label>
                            <input
                                type="number"
                                placeholder="Attended"
                                value={subject.attended}
                                onChange={(e) => handleSubjectChange(index, 'attended', parseInt(e.target.value))}
                                required
                                className='mx-2 my-1 text-black rounded'
                            />
                            <br />
                            <label htmlFor="total">Total</label>
                            <input
                                type="number"
                                placeholder="Total"
                                value={subject.total}
                                onChange={(e) => handleSubjectChange(index, 'total', parseInt(e.target.value))}
                                required
                                className='mx-2 my-1 text-black rounded'
                            />
                            <br />
                            <div>
                                <h3>Days</h3>
                                {daysOfWeek.map(day => (
                                    <label key={day} className="inline-flex items-center mr-2">
                                        <input
                                            type="checkbox"
                                            checked={subject.days.includes(day)}
                                            onChange={() => handleDayChange(index, day)}
                                            className="form-checkbox text-indigo-600"
                                        />
                                        <span className="ml-2">{day}</span>
                                    </label>
                                ))}
                            </div>
                            <button type="button" className='bg-red-500 px-2 rounded mt-2' onClick={() => handleRemoveSubject(index)}>Remove</button>
                        </div>
                    ))}
                    <button className='my-4 mx-2 bg-green-500 rounded px-2' type="button" onClick={handleAddSubject}>Add Subject</button>
                </div>

                <div className='flex justify-center'>
                    <button className='bg-blue-500 rounded-lg px-4 py-2' type="submit">CREATE RECORD</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUserPage;
