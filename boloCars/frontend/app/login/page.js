'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/authContext';
import '../styles/register.css';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/authuser/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login response data:', data);

            if (data.access) {
                localStorage.setItem('accessToken', data.access);
                console.log('Access token set:', data.access);
                
                login();
                alert('Login successful!');
                // Redirect to homepage
                setTimeout(() => {
                    router.push('/');
                }, 500);
            } else {
                alert('Login failed. No access token returned.');
            }
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container mt-5 auth-box">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="prado1-box p-4 text-white">
                        <h2 className="text-center">Login</h2>
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
                                    type="password" 
                                    placeholder="Password" 
                                    className="form-control" 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-light w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

