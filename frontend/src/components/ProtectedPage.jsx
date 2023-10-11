/* import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedPage = ({ children }) => {
    const { token } = useContext(AuthContext);
    
    if (!token) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

 */