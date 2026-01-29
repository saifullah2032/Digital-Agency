import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordPrompt, setPasswordPrompt] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
      setPasswordPrompt(false);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (password === 'admin123') {
      localStorage.setItem('adminToken', password);
      setIsAuthenticated(true);
      setPasswordPrompt(false);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
      e.target.reset();
    }
  };

  if (passwordPrompt && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E40AF] to-[#EA580C]">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Admin Panel</h1>
          <p className="text-center text-gray-600 mb-6">Enter admin password to continue</p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E40AF]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
