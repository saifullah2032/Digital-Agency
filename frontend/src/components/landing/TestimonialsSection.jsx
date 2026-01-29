import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { clientsAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const TestimonialsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsAPI.getAll();
      setClients(response.data.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container">
        <h2 className="section-title">Happy Clients</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client) => (
              <div
                key={client._id}
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={client.imageUrl}
                    alt={client.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.designation}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-[#EA580C] text-[#EA580C]"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">
                  "{client.description}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
