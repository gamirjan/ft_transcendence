import React, { useEffect, useState } from 'react';

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      fetch('http://localhost:7000/images', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          console.log(data);
        })
        .catch(error => {
          // Handle any error that occurred
          console.error(error);
        });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  useEffect(()=>{
    console.log(isModalOpen);
    
  },[isModalOpen])
  return (
    <div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded p-8 max-w-md">
            <h2 className="text-2xl mb-4">Upload a File</h2>
            {selectedFile ? (
              <div className="mb-4">
                <h3 className="text-lg mb-2">Selected File:</h3>
                {previewUrl ? (
                  <img src={previewUrl} alt="Selected File" className="mb-2 max-h-60" />
                ) : null}
                <div className="p-4 border border-gray-300">
                  <span className="font-bold">{selectedFile.name}</span>
                  <span className="text-gray-500"> ({selectedFile.size} bytes)</span>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                <p className="text-gray-500">No file selected</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedFile}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadForm;
