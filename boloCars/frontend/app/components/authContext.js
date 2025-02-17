'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            setIsLoggedIn(!!token); // Update state based on token presence

        }    
    }, []);

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            <div>
            {children}
           </div>
        </AuthContext.Provider>
    );
};
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);