'use client'
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [imageData, setImageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPic();
  }, []);

  function getPic() {
    fetch(`${process.env.PORT}${window.location.pathname.replace('/images/','')}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          console.log(data)
          const image = Buffer.from(data.data).toString('base64');
          setImageData(image)
        } else {
          console.log(data)
          setErrorMessage('No image data found');
        }
      })
      .catch(error => {
        console.log()
        console.error('Error occurred during fetching data:', error);
        setErrorMessage('Error occurred during fetching data');
      });
  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {imageData ? (
        <img 
          src={`data:image/jpeg;base64,${imageData}`} 
          alt="Fetched from API" 
          className='px-3 py-3 bg-white'
        />
      ) : (
        !errorMessage && <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
