import { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if demo mode is enabled
    const isDemoMode = localStorage.getItem('isDemoMode') === 'true';
    if (isDemoMode) {
      const demoUser = JSON.parse(localStorage.getItem('demoUser') || 'null');
      if (demoUser) {
        setUser(demoUser);
        setLoading(false);
        return;
      }
    }

    // Otherwise, use Firebase auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome, ${result.user.displayName}!`);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in with Google');
      throw error;
    }
  };

   const logout = async () => {
     try {
       // Clear demo mode if active
       if (localStorage.getItem('isDemoMode') === 'true') {
         localStorage.removeItem('isDemoMode');
         localStorage.removeItem('demoUser');
         setUser(null);
         toast.success('Logged out from demo mode');
         return;
       }

       // Otherwise sign out from Firebase
       await signOut(auth);
       toast.success('Logged out successfully');
     } catch (error) {
       console.error('Error signing out:', error);
       toast.error('Failed to sign out');
       throw error;
     }
   };

   const setDemoUser = (demoUserData) => {
     localStorage.setItem('demoUser', JSON.stringify(demoUserData));
     localStorage.setItem('isDemoMode', 'true');
     setUser(demoUserData);
   };

   const value = {
     user,
     loading,
     signInWithGoogle,
     logout,
     setDemoUser,
   };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
