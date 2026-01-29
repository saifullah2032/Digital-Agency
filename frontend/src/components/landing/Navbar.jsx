import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#1E40AF]">Digital Agency</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-gray-700 hover:text-[#1E40AF] transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-gray-700 hover:text-[#1E40AF] transition"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-gray-700 hover:text-[#1E40AF] transition"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="text-gray-700 hover:text-[#1E40AF] transition"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-gray-700 hover:text-[#1E40AF] transition"
          >
            Contact
          </button>
          <Link to="/admin" className="btn-primary">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-4 p-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left text-gray-700 hover:text-[#1E40AF]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-gray-700 hover:text-[#1E40AF]"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left text-gray-700 hover:text-[#1E40AF]"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left text-gray-700 hover:text-[#1E40AF]"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-gray-700 hover:text-[#1E40AF]"
            >
              Contact
            </button>
            <Link to="/admin" className="btn-primary block text-center">
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
