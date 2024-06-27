import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from '../pages/login';
import Chat from '../pages/chat';
import Homepage from '../pages/homePage';

function ProtectedRoutes() {

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     window.location.href = '/login';
  //   }
  // }, []);


  return (
    <BrowserRouter>
      <Routes>
         <Route path="/login" element={<Login/>} />
        
         <Route
          path="/chat"
          element={
            <AuthencateRoute>
              <Chat />
            </AuthencateRoute>
          }
        />

       {/* // default page */}
        <Route
          path="/en"
          element={
            <AuthencateRoute>
              <Homepage />
            </AuthencateRoute>
          }
        />
        
        <Route
          path="/"
          element={
            <AuthencateRoute>
              <Homepage />
            </AuthencateRoute>
          }
        />



      </Routes>
    </BrowserRouter>
  )
}




const AuthencateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};



export default ProtectedRoutes