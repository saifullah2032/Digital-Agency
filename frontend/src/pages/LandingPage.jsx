import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import ProjectsSection from '../components/landing/ProjectsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;
