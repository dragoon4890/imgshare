"use client";
import React, { useState } from 'react';
import useAuth from '@/components/Auth/Auth';
export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  useAuth();
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
    
    const formData = new FormData();
    formData.append('file', file);


    fetch('http://localhost:8069/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert("sucess") // Redirect to a success page or handle as needed
        } else {
            alert('File upload failed');
            console.error(response);
        }
    })
    .catch(error => {
        console.error('Error occurred during file upload:', error);
    });
    
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
