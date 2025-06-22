import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { sendEnquiryEmail } from '../utils/enquireEmail'

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/items`);
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10 text-white">
      <h1 className="text-5xl font-bold mb-6 text-center text-black">📦 All Items</h1>

      {loading ? (
        <p className="text-center text-black">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-black text-4xl mt-20">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.coverImage}
                alt={item.name}
                className="h-48 w-full object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold truncate">{item.name}</h2>
              <p className="text-sm text-gray-400">{item.type}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-[#1f2937] max-w-xl w-full rounded-lg p-6 relative text-white max-h-[90vh] overflow-y-hidden shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-1 right-2 scale-125 cursor-pointer text-white text-2xl font-bold"
            >
              &times;
            </button>

            {/* Carousel */}
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              showStatus={false}
              className="rounded-md"
            >
              <div>
                <img
                  src={selectedItem.coverImage}
                  alt="Cover"
                  className="h-96 w-full object-fill rounded"
                />
              </div>
              {selectedItem.additionalImages?.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Additional ${index + 1}`}
                    className="h-96 w-full object-fill rounded"
                  />
                </div>
              ))}
            </Carousel>
            <button
              className="relative top-2 left-[89%] text-red-400 border border-red-500 px-3 py-1 text-sm rounded hover:bg-red-500 hover:text-white transition"
              onClick={async () => {
                const confirm = window.confirm(`Delete "${selectedItem.name}"?`);
                if (!confirm) return;
                try {
                  await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/items/${selectedItem._id}`);
                  setItems((prev) => prev.filter((i) => i._id !== selectedItem._id));
                  setSelectedItem(null);
                } catch (err) {
                  console.error("Delete failed:", err);
                  alert("Failed to delete item.");
                }
              }}
            >
              Delete
            </button>

            <div className="mt-6 space-y-2 px-1">
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
              <p className="text-sm text-gray-400">Type: {selectedItem.type}</p>
              <p className="text-sm">{selectedItem.description}</p>
            </div>

            <button
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition"
              onClick={async () => {
                try {
                  await sendEnquiryEmail(selectedItem);
                  alert(`Enquiry email sent for: ${selectedItem.name}`);
                } catch (err) {
                  console.error("Email sending failed:", err);
                  alert("Failed to send enquiry email.");
                }
              }}
            >
              Enquire
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewItems;
