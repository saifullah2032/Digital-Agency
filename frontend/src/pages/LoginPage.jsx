import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Chrome, TestTube } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { signInWithGoogle, setDemoUser } = useAuth();
  const navigate = useNavigate();
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/client-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleDemoLogin = () => {
    // Create a mock user object for demo purposes
    const demoUser = {
      uid: 'demo-user-123',
      email: 'client@example.com',
      displayName: 'Demo Client',
      photoURL: 'https://i.pravatar.cc/150?img=1'
    };
    
    // Use the setDemoUser function from AuthContext to update state AND localStorage
    setDemoUser(demoUser);
    
    toast.success('Demo mode activated! Welcome Demo Client');
    setIsDemoMode(true);
    
    // Navigate after state is updated
    navigate('/client-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E40AF] to-[#EA580C] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access your client dashboard
            </p>
          </div>

           {/* Google Sign In Button */}
           <button
             onClick={handleGoogleSignIn}
             className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 hover:border-[#1E40AF] transition-all duration-300 flex items-center justify-center gap-3 group"
           >
             <Chrome size={24} className="text-[#EA580C] group-hover:text-[#1E40AF] transition-colors" />
             Sign in with Google
           </button>

           {/* Demo Login Button */}
           <button
             onClick={handleDemoLogin}
             className="w-full mt-4 bg-gradient-to-r from-[#1E40AF] to-[#EA580C] text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3"
           >
             <TestTube size={24} />
             Demo Login (Test Data)
           </button>

          {/* Divider */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <a href="#" className="text-[#1E40AF] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#1E40AF] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-[#1E40AF] font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-white text-center">
          <p className="text-sm mb-4">Access to:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              📊 Project Progress
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              💬 Direct Messaging
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              📁 File Sharing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
