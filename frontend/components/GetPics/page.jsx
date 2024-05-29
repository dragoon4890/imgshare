import { useEffect, useState } from 'react';

const GetPics = () => {
  const [pics, setPics] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const baseURL = `${window.location.origin}`;

  useEffect(() => {
    getPics();
  }, []);

  function getPics() {
    fetch(`${PORT}/getAll`, {
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
        setLoading(false); // Set loading to false once data is fetched
      } else {
        console.log("Fetching data failed, expected array but got:", data);
        setErrorMessage('Fetching data failed, received invalid data format');
        setLoading(false); // Set loading to false in case of error
      }
    })
    .catch(error => {
      console.error('Error occurred during fetching data:', error);
      setErrorMessage('Error occurred during fetching data');
      setLoading(false); // Set loading to false in case of error
    });
  }

  return (
    <div className='p-4'>
      {loading ? (
        // Display loading animation
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className='flex flex-wrap gap-9'>
            {pics.map((pic, index) => (
              <div key={index} className='flex flex-col items-center h-200 w-200 bg-white py-8 px-8'>
                <img 
                  src={`data:image/jpeg;base64,${pic.image}`} 
                  alt={`Pic ${index}`} 
                  className='w-48 h-48 object-cover border border-gray-300 rounded-md ' 
                />
                <a href={`${baseURL}${"/images/"}${pic.link}`} className='mt-2 text-center'>{`Copy and share "${baseURL}${"/images/"}${pic.link}`}</a>
                <a href={`${baseURL}${"/analytics/"}${pic.link}`} className='mt-2 text-center'> "See details"</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetPics;
