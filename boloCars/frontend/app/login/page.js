'use client';
import { useState } from 'react';

export default function Login() {
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsgs, setErrorMsgs] = useState([]);

    async function submitHandler(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formData = {
            email: fd.get('email'), // Adjusted field to match your User model
            password: fd.get('password'),
        };

          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Send data to server
        const res = await fetch(`${apiUrl}/login/`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resData = await res.json();
        if (res.ok) {
            localStorage.setItem('user_token', resData.token); // Assuming your backend returns a token
            window.location.href = '/'; // Redirect to the homepage after successful login
        } else {
            const errorList = Object.values(resData).flatMap((errors) =>
                errors.map((error) => `${error}`)
            );
            const errorString = errorList.join('\n');
            setSuccessMsg(null);
            setErrorMsgs(errorString);
        }

        console.log(resData);
    }

    return (
        <form className="mt-3" onSubmit={submitHandler}>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsgs.length > 0 && <div className="alert alert-danger">{errorMsgs}</div>}

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