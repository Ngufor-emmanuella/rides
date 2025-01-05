'use client';
import { useEffect } from 'react';

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem('user_token');
        window.location.href = '/login'; // Redirect to login page
    }, []);

    return null; // No UI to render
}