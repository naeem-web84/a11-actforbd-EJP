import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';
import Loading from '../pages/shared/Loading';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
 
    if(loading){
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/signIn" replace />;
    }

    return children;
};


export default PrivateRoutes;
