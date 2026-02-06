
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/Login';

// Lazy load pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Employees = lazy(() => import('./pages/Employees'));
const Attendance = lazy(() => import('./pages/Attendance'));
const Leaves = lazy(() => import('./pages/Leaves'));
const Payroll = lazy(() => import('./pages/Payroll'));
const Internships = lazy(() => import('./pages/Internships'));
const FacultyPage = lazy(() => import('./pages/Faculty'));
const Performance = lazy(() => import('./pages/Performance'));
const Profile = lazy(() => import('./pages/Profile'));

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Initializing...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'MANAGER']}><Employees /></ProtectedRoute>} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="payroll" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR']}><Payroll /></ProtectedRoute>} />
              <Route path="internships" element={<Internships />} />
              <Route path="faculty" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'TRAINER']}><FacultyPage /></ProtectedRoute>} />
              <Route path="performance" element={<Performance />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
