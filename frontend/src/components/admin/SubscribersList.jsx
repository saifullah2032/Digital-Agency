import { useEffect, useState } from 'react';
import { subscriptionAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Trash2, Mail } from 'lucide-react';

const SubscribersList = ({ refreshTrigger }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, [refreshTrigger]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await subscriptionAPI.getAll();
      setSubscribers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to unsubscribe this email?')) return;

    try {
      await subscriptionAPI.unsubscribe(id);
      toast.success('Subscriber removed successfully');
      setSubscribers((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to remove subscriber');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-gray-600">No subscribers yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1E40AF] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Subscribed Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr
                key={subscriber._id}
                className={`border-t ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition`}
              >
                <td className="px-6 py-4 text-gray-900 flex items-center gap-2">
                  <Mail size={16} className="text-[#1E40AF]" />
                  {subscriber.email}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(subscriber._id)}
                    className="text-red-600 hover:text-red-800 transition inline-flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersList;
