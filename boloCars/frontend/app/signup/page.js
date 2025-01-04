
'use client';
import { useState } from 'react';
import { useAuth } from '../authContext';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsgs, setErrorMsgs] = useState([]);
    const { login } = useAuth();
    const router = useRouter();

    async function submitHandler(e) {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await fetch(`${apiUrl}/api/register/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessMsg('Registration successful!');
                setErrorMsgs([]);
                login(data);
                router.push('/dashboard');  // Redirect to dashboard or home page
            } else {
                setSuccessMsg(null);
                setErrorMsgs(Object.values(data).flat());
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setSuccessMsg(null);
            setErrorMsgs(['Registration failed. Please try again.']);
        }
    }

    return (
        <form className="mt-3" onSubmit={submitHandler}>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsgs.length > 0 && <div className="alert alert-danger">{errorMsgs.join(', ')}</div>}

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required name="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" required name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" required name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}