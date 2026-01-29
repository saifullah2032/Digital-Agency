import { useState } from 'react';
import { clientsAPI } from '../../services/api';
import ImageCropper from './ImageCropper';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const ClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = () => {
    setCropperOpen(true);
  };

  const handleCropComplete = (file) => {
    setCroppedImage(file);
    toast.success('Image cropped successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.designation ||
      !formData.description ||
      !croppedImage
    ) {
      toast.error('Please fill in all fields and select an image');
      return;
    }

    try {
      setLoading(true);
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('designation', formData.designation);
      formDataObj.append('description', formData.description);
      formDataObj.append('image', croppedImage);

      await clientsAPI.create(formDataObj);
      toast.success('Client added successfully');
      setFormData({ name: '', designation: '', description: '' });
      setCroppedImage(null);
      onClientAdded();
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error(error.response?.data?.message || 'Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Plus size={24} /> Add New Client
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Client Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E40AF]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Designation *
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g., CEO, Manager, Designer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E40AF]"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Testimonial *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write the client's testimonial..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E40AF]"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Client Image *
          </label>
          <div className="border-2 border-dashed border-[#1E40AF] rounded-lg p-6">
            {croppedImage ? (
              <div className="text-center">
                <p className="text-green-600 font-semibold mb-2">
                  ✓ Image selected (450x350)
                </p>
                <button
                  type="button"
                  onClick={handleImageSelect}
                  className="text-[#1E40AF] hover:text-[#EA580C] transition"
                >
                  Change image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleImageSelect}
                className="w-full text-center py-8"
              >
                <p className="text-gray-600 mb-2">Click to crop image</p>
                <p className="text-sm text-gray-500">
                  Image will be cropped to 450x350px
                </p>
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Adding Client...' : 'Add Client'}
        </button>
      </form>

      <ImageCropper
        isOpen={cropperOpen}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default ClientForm;
