import React from 'react'
import { useState } from "react";

function Nick() {
    const [inputValue, setInputValue] = useState('');
    const [modalOpen, setModalOpen] = useState(true);
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Add your logic for handling the form submission here
    };
  
    const handleCancel = () => {
      setModalOpen(false);
    };
  
    if (!modalOpen) {
      return null; // Don't render the modal if modalOpen is false
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-black w-full max-w-md mx-4 px-8 py-6 rounded-lg">
          <h2 className="text-2xl text-white mb-4">Modal Title</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                className="bg-gray-800 text-white py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter a value"
                value={inputValue}
                onChange={handleChange}
              />
              <div className="absolute inset-0 border-2 border-transparent rounded-lg animate-pulse pointer-events-none"></div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Nick;
