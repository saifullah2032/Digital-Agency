import { useState, useRef } from 'react';
import ReactImageCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageCropper = ({ isOpen, onClose, onCropComplete }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please select a valid image (JPEG, PNG, or WebP)');
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSrc(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleCropConfirm = async () => {
    if (!completedCrop || !imgRef.current) {
      toast.error('Please crop the image first');
      return;
    }

    try {
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const canvas = document.createElement('canvas');
      canvas.width = 450;
      canvas.height = 350;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        450,
        350
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'cropped-image.webp', { type: 'image/webp' });
          onCropComplete(file);
          handleClose();
        }
      }, 'image/webp', 0.9);
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Failed to crop image');
    }
  };

  const handleClose = () => {
    setSrc(null);
    setCompletedCrop(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Image Cropper</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!src ? (
            <div className="text-center py-12">
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-[#1E40AF] rounded-lg p-12 hover:bg-blue-50 transition">
                  <p className="text-gray-600">
                    Click to select an image or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: JPEG, PNG, WebP
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  Crop to 450x350 (4:3.5 ratio)
                </p>
                <ReactImageCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={450 / 350}
                  minWidth={100}
                  minHeight={78}
                >
                  <img
                    ref={imgRef}
                    src={src}
                    alt="Crop target"
                    style={{ maxWidth: '100%' }}
                  />
                </ReactImageCrop>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSrc(null);
                    setCompletedCrop(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Change Image
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="flex-1 btn-primary"
                >
                  Confirm Crop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
