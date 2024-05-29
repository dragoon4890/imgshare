'use client';
import React, { useState, useEffect } from 'react';
const Page = () => {
  const [imageData, setImageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [link, setLink] = useState('');
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    getPic();
  }, []);

  function getPic() {
    fetch(`${process.env.PORT}${window.location.pathname}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const image = Buffer.from(data[0].image.data).toString('base64');
          setImageData(image);
          setLink(data[0].link);
          const visitedData = data[0].visited;
          if (Array.isArray(visitedData)) {
            const formattedVisited = visitedData.map(dateString => {
              const date = new Date(dateString);
              return date.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              });
            });
            setVisited(formattedVisited);
          } else {
            console.error('Unexpected format for visited data:', visitedData);
            setErrorMessage('Unexpected format for visited data');
          }
        }  else {
            console.log(data)
          setErrorMessage('No image data found');
        }
      })
      .catch(error => {
        console.error('Error occurred during fetching data:', error);
      });
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      {errorMessage && <p>{errorMessage}</p>}
      {imageData ? (
        <div className=' bg-white px-8 py-6 rounded-lg'>
          <img 
            src={`data:image/jpeg;base64,${imageData}`} 
            alt="Fetched from API" 
            className='w-48 h-48 object-cover border border-gray-300 rounded-md'
          />
          <p>Link: {window.location.href}</p>
          <p>Visited: {visited.join(', ')}</p>
          <p>Visited Count: {visited.length}</p>
        </div>
      ) : (
        !errorMessage && <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
