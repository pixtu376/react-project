import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';

import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import AllCoursesPage from './pages/AllCoursesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardHome from './pages/DashboardHome';
import DashboardMyCourses from './pages/DashboardMyCourses';
import DashboardSettings from './pages/DashboardSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/courses" element={<AllCoursesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="my-courses" element={<DashboardMyCourses />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;