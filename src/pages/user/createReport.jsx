import React, { useState } from 'react';
import axios from 'axios';

function CreateReport() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false); // เพิ่มสถานะการโหลด
  const [error, setError] = useState(null); // เพิ่มสถานะข้อผิดพลาด
  const [successMessage, setSuccessMessage] = useState(null); // เพิ่มข้อความสำเร็จ

  const token = localStorage.getItem('token'); // หรือดึงจาก context ถ้าคุณใช้ context

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_cloudinary_upload_preset'); // กำหนด upload preset จาก Cloudinary

      setLoading(true); // ตั้งค่าสถานะการโหลด
      setError(null); // เคลียร์ข้อผิดพลาดเมื่อเริ่มการอัพโหลด

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // ใส่ Cloud name ของคุณที่ Cloudinary
          formData
        );
        setImageUrl(response.data.secure_url); // ได้ URL หลังจากอัพโหลด
        setImageFile(file); // เก็บไฟล์ที่อัพโหลด
        setLoading(false); // ตั้งค่าสถานะการโหลดเสร็จ
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image. Please try again later.');
        setLoading(false); // ตั้งค่าสถานะการโหลดเสร็จ
      }
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    if (!imageUrl) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        'http://localhost:4000/user/createReport',
        {
          title,
          description,
          category,
          imageUrl, // ส่ง URL ของภาพที่อัพโหลด
          location_id: locationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // แนบ token ใน header
          },
        }
      );
      console.log('Report created:', response.data);
      setSuccessMessage('Report created successfully!');
      // เคลียร์ฟอร์มหลังจากส่งเสร็จ
      setTitle('');
      setDescription('');
      setCategory('');
      setLocationId('');
      setImageFile(null);
      setImageUrl('');
      setLoading(false);
    } catch (error) {
      console.error('Error creating report:', error.response?.data || error.message);
      setError('Failed to create report. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Create a New Report</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>} {/* แสดงข้อผิดพลาด */}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>} {/* แสดงข้อความสำเร็จ */}
      <form onSubmit={handleCreateReport} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-600">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter report title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-600">Description</label>
          <textarea
            id="description"
            placeholder="Enter detailed description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-600">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Enter category (e.g. Hardware, Software)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-600">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {loading && <div className="text-blue-600 mt-4">Uploading image...</div>} {/* แสดงสถานะการอัพโหลด */}
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Uploaded Preview" className="w-full h-auto rounded-lg" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="locationId" className="block text-lg font-medium text-gray-600">Location ID</label>
          <input
            id="locationId"
            type="text"
            placeholder="Enter location ID"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading} // ปิดปุ่มเมื่อกำลังโหลด
          >
            {loading ? 'Creating Report...' : 'Create Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReport;
