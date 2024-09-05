import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import {TasksPage} from './pages/TaskPage'
import PrivateRoute from './components/PrivateRoute'; 
import Navbar from './components/Navbar';


function App() {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
    );
}

export default App;
