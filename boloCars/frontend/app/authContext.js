'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) {
            // You might want to validate the token with the backend here
            setUser({ token });
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user_token', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
