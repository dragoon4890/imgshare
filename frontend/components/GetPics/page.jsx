import { useEffect, useState } from 'react';

const GetPics = () => {
  const [pics, setPics] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const baseURL = `${window.location.origin}/images/`;

  useEffect(() => {
    getPics();
  }, []);

  function getPics() {
    fetch('http://localhost:8069/getAll', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data received from API:', data);  // Debugging line
      if (Array.isArray(data)) {
        const picsWithBase64 = data.map(pic => ({
          ...pic,
          image: Buffer.from(pic.image.data).toString('base64')
        }));
        setPics(picsWithBase64);
      } else {
        console.log("Fetching data failed, expected array but got:", data);
        setErrorMessage('Fetching data failed, received invalid data format');
      }
    })
    .catch(error => {
      console.error('Error occurred during fetching data:', error);
      setErrorMessage('Error occurred during fetching data');
    });
  }

  return (
    <div className='p-4'>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className='flex flex-wrap gap-4'>
        {pics.map((pic, index) => (
          <div key={index} className='flex flex-col items-center'>
            <img 
              src={`data:image/jpeg;base64,${pic.image}`} 
              alt={`Pic ${index}`} 
              className='w-48 h-48 object-cover border border-gray-300 rounded-md' 
            />
            <p className='mt-2 text-center'>{`${baseURL}${pic.link}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetPics;
