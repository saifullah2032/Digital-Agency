import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#1E40AF] via-blue-600 to-[#EA580C] text-white py-20 md:py-32"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Success Is Our Mission
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Transform your digital presence with our innovative solutions. We create stunning websites, 
            powerful applications, and memorable brand experiences that drive results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-white text-[#1E40AF] font-semibold rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              View Our Projects <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1E40AF] transition"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
