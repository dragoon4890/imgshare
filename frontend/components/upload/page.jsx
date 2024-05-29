"use client"
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
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8069/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert("success");
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
    <main className=" flex flex-col items-center justify-between p-2">
      <form  onSubmit={handleSubmit} className='flex flex-col items-center gap-8'>
        <input type='file' id='file' className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-sm file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100

' onChange={handleFileChange} />
        <button type="submit">Submit</button>
        
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </main>
  );
}
