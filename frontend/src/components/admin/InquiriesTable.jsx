import { useEffect, useState } from 'react';
import { contactAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const InquiriesTable = ({ refreshTrigger }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, [refreshTrigger]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setInquiries(response.data.data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await contactAPI.delete(id);
      toast.success('Inquiry deleted successfully');
      setInquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-gray-600">No inquiries yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1E40AF] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Mobile</th>
              <th className="px-6 py-4 text-left">City</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry, index) => (
              <tr
                key={inquiry._id}
                className={`border-t ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition`}
              >
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {inquiry.fullName}
                </td>
                <td className="px-6 py-4 text-gray-700">{inquiry.email}</td>
                <td className="px-6 py-4 text-gray-700">
                  {inquiry.mobileNumber}
                </td>
                <td className="px-6 py-4 text-gray-700">{inquiry.city}</td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(inquiry.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(inquiry._id)}
                    className="text-red-600 hover:text-red-800 transition inline-flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
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

export default InquiriesTable;
