import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux';

function Nick() {
    const [inputValue, setInputValue] = useState('');
    const [modalOpen, setModalOpen] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
	const user = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch()

  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:7000/users/nickname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid:user.id,nickname: inputValue }),
        });
  
        if (response.ok) {
          dispatch(setUser(
            {...user,
              displayname:inputValue,
            },
          ))
          //console.log(data);

          setModalOpen(false);
        } else {
          setErrorMessage('The nickname is taken');
        }
      } catch (error) {
        console.error("================>",error);
        setErrorMessage('An error occurred');
      }
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
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
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