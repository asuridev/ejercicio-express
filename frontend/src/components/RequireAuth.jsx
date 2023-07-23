import React from 'react'
import { useGlobalState } from '../hooks/useGlobalState'
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const { isLogin } = useGlobalState();
    if(isLogin){
      return children;
    }
    return <Navigate to="/login"/>
}
