import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.currentUser) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }
