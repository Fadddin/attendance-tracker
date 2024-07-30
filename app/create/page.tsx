"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios';

const CreateUserPage: React.FC = () => {

    const [user] = useAuthState(auth);
    const email = user?.email;

    const [name, setName] = useState('');
    // const [user, setUser] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', attended: 0, total: 0 }]);
    const router = useRouter();

    const handleSubjectChange = (index: number, field: string, value: string | number) => {
        const newSubjects = [...subjects];
        newSubjects[index] = { ...newSubjects[index], [field]: value };
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { name: '', attended: 0, total: 0 }]);
    };

    const handleRemoveSubject = (index: number) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log(email, name, subjects)
        
        try {
            const res = await axios.post('http://localhost:3000/api/user', {
                name,
                user : email,
                subjects
            });

        
                router.push('/'); // Redirect to home or another page
            
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='text-black'
                    />
                </div>
                {/* <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={user}
                        // onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div> */}
                <div>
                    <h2>Subjects</h2>
                    {subjects.map((subject, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Subject Name"
                                value={subject.name}
                                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                required
                                className='text-black'

                            />
                            <input
                                type="number"
                                placeholder="Attended"
                                value={subject.attended}
                                onChange={(e) => handleSubjectChange(index, 'attended', parseInt(e.target.value))}
                                required
                                 className='text-black'

                            />
                            <input
                                type="number"
                                placeholder="Total"
                                value={subject.total}
                                onChange={(e) => handleSubjectChange(index, 'total', parseInt(e.target.value))}
                                required
                                className='text-black'

                            />
                            <button type="button" onClick={() => handleRemoveSubject(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSubject}>Add Subject</button>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUserPage;
