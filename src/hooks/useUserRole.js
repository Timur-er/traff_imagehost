import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useUserRole = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('decoded token - ', decodedToken);
                setUserRole(decodedToken);
            } catch (error) {
                console.error('Error decoding the JWT:', error);
            }
        }
    }, []);

    return userRole;
};

export default useUserRole;
