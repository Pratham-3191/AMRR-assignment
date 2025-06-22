import React, { useState } from 'react';
import axios from 'axios'

function AddItem({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: [],
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setFormData({ ...formData, coverImage: files[0] });
    } else if (name === 'additionalImages') {
      setFormData({ ...formData, additionalImages: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const coverBase64 = await toBase64(formData.coverImage);
    const additionalBase64 = await Promise.all(
      formData.additionalImages.map((img) => toBase64(img))
    );

    const itemData = {
      name: formData.name,
      type: formData.type,
      description: formData.description,
      coverImage: coverBase64,
      additionalImages: additionalBase64,
    };

    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/items`, itemData);

    if (res.status === 201) {
      setSuccessMsg('Item successfully added!');
      onAddItem(res.data); // Optional: if parent needs the new item
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: [],
      });
    }
  } catch (error) {
    console.error('Error adding item:', error);
    alert('Failed to add item. Please try again.');
  }
};

  return (
   <div className="max-w-3xl mx-auto mt-4 bg-[#1f2937] shadow-lg rounded-2xl p-8 text-white">
  <h1 className="text-4xl font-bold mb-8 text-center">🛍️ Add New Item</h1>

  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
    <div>
      <label className="block mb-1 text-sm font-medium">Item Name</label>
      <input
        type="text"
        name="name"
        placeholder="e.g. Nike Sneakers"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg text-white focus:outline-none border-2
         border-blue-400"
        required
      />
    </div>

  <div>
  <label className="block mb-1 text-sm font-medium">Item Type</label>
  <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="w-full px-4 py-2 rounded-lg border-2 border-blue-400 bg-gray-800 text-white focus:outline-none"
    required
  >
    <option value="">Select Item Type</option>
    <option value="Shirt">Shirt</option>
    <option value="Pant">Pant</option>
    <option value="Shoes">Shoes</option>
    <option value="Sports Gear">Sports Gear</option>
  </select>
</div>



    <div>
      <label className="block mb-1 text-sm font-medium">Item Description</label>
      <textarea
        name="description"
        placeholder="Enter a short description..."
        value={formData.description}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 rounded-lg text-white focus:outline-none border-2
         border-blue-400"
        required
      ></textarea>
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium">Cover Image</label>
      <input
        type="file"
        name="coverImage"
        onChange={handleChange}
        accept="image/*"
        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        required
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium">Additional Images</label>
      <input
        type="file"
        name="additionalImages"
        onChange={handleChange}
        multiple
        accept="image/*"
        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
      />
    </div>

    <button
      type="submit"
      className="mt-4 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
    >
      ➕ Add Item
    </button>

    {successMsg && (
      <div className="mt-4 text-green-400 font-semibold text-center">
        {successMsg}
      </div>
    )}
  </form>
</div>

  );
}

export default AddItem;
