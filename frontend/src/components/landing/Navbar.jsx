import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleClientDashboard = () => {
    navigate('/client-dashboard');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary-200 dark:text-primary-300">Digital Agency</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300 transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300 transition"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300 transition"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300 transition"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300 transition"
          >
            Contact
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClientDashboard}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300 transition"
              >
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-8 h-8 rounded-full border-2 border-primary-200 dark:border-primary-300"
                />
                <span className="font-medium">{user.displayName?.split(' ')[0]}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-secondary-200 dark:hover:text-secondary-300 transition"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary-200 dark:bg-primary-300 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-400 transition flex items-center gap-2">
              <LogIn size={18} />
              Client Login
            </Link>
          )}
          
          <Link to="/admin" className="bg-secondary-200 dark:bg-secondary-300 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-secondary-300 dark:hover:bg-secondary-400 transition">
            Admin
          </Link>
        </div>

        {/* Dark Mode Toggle & Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex flex-col space-y-4 p-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300"
            >
              Contact
            </button>
            
            {user ? (
              <>
                <button
                  onClick={handleClientDashboard}
                  className="flex items-center gap-2 text-left text-gray-700 dark:text-gray-300 hover:text-primary-200 dark:hover:text-primary-300"
                >
                  <User size={18} />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary-200 dark:bg-primary-300 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-400 transition flex items-center justify-center gap-2">
                <LogIn size={18} />
                Client Login
              </Link>
            )}
            
            <Link to="/admin" className="bg-secondary-200 dark:bg-secondary-300 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-secondary-300 dark:hover:bg-secondary-400 transition block text-center">
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
