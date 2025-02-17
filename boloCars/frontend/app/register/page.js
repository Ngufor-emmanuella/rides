'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/authuser/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });

        if (response.ok) {
            alert('Registration successful!');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5 auth-box">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="prado1-box p-4 text-white">
                        <h2 className="text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    className="form-control" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    className="form-control" 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="form-control" 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-light w-100">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;