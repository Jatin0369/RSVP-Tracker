import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import CreateEventPage from './components/CreateEventPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ViewEventsPage from './components/ViewEvent';
import EventFormPage from './components/EventFormPage';
import EventResponsePage from './components/EventResponsesPage';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<WelcomePage />} />

      {/* Public Routes */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/event/:eventId" element={<EventFormPage />} />
      
      {/* Protected Routes with PrivateRoute */}
      <Route 
        path="/home" 
        element={<PrivateRoute element={<HomePage />} />} 
      />
      <Route 
        path="/create-event" 
        element={<PrivateRoute element={<CreateEventPage />} />} 
      />
      <Route 
        path="/view-event" 
        element={<PrivateRoute element={<ViewEventsPage />} />} 
      />
      <Route 
        path="/event/:eventId/responses" 
        element={<PrivateRoute element={<EventResponsePage />} />} 
      />
    </Routes>
  );
};

export default App;
