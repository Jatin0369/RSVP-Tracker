import React from 'react';
import { Navigate } from 'react-router-dom';

// Your logic to check authentication
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Replace with your actual check
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
