import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface UserContextType {
    name: string | null;
    setName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState<string | null>(null);

    // Initialize user data on app load
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            console.log('Fetching user data with token:', token);

            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/me/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('User data fetched:', response.data);
                    setName(response.data.name);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    setName(null); // Clear name if fetching fails
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
