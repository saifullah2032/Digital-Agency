import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ClientProtectedRoute from './components/auth/ClientProtectedRoute';

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/client-dashboard" 
              element={
                <ClientProtectedRoute>
                  <ClientDashboard />
                </ClientProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
