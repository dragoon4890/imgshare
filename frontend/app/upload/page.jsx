"use client";
import React, { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select an image file.');
        event.target.value = ''; 
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setErrorMessage('');
      console.log('File selected:', file);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }

    // Here you can handle the file upload or any other form submission logic
    console.log('Submitting file:', selectedFile);

    // Clear the selected file after submission if needed
    setSelectedFile(null);
    setErrorMessage('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <input type='file' id='file' onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </main>
  );
}
