import { useEffect, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
const GetPics = () => {
  const [pics, setPics] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); 
  const [tooltipContent, setTooltipContent] = useState('');
  const baseURL = `${window.location.origin}`;

  useEffect(() => {
    getPics();
  }, []);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setTooltipContent(prev => ({ ...prev, [index]: 'Copied!' }));
      })
      .catch(() => {
        setTooltipContent(prev => ({ ...prev, [index]: 'Failed to copy!' }));
      });
  };
  function getPics() {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getAll`, {
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
    <div className='h-[100%]'>
      {loading ? (
        // Display loading animation
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className='flex flex-wrap m-2 items-center gap-9'>
            {pics.map((pic, index) => (
              <div key={index} className='flex flex-col items-center h-200 w-200 bg-white py-8 px-8 rounded-lg'>
                <img 
                  src={`data:image/jpeg;base64,${pic.image}`} 
                  alt={`Pic ${index}`} 
                  className='w-48 h-48 object-cover border border-gray-300 rounded-md ' 
                />
               <button 
                     data-tooltip-content="Hello world!"
                     data-tooltip-place="right"
                    data-tooltip-id={`tooltip-${index}`}
                    onClick={() => copyToClipboard(`${baseURL}${"/images/"}${pic.link}`, index)}
                    className='mt-2 text-center bg-black text-white py-1 px-3 rounded'
                  >
                    Share
                  </button>
                  <Tooltip 
                    id={`tooltip-${index}`} 
                    // place="top" 
                    effect="solid"
                    render={() => tooltipContent[index] || 'Click to copy'}
                    afterShow={() => setTimeout(() => setTooltipContent(prev => ({ ...prev, [index]: '' })), 399)}
                  />
                <button href={`${baseURL}${"/analytics/"}${pic.link}`} className="py-2 mt-3 px-1 h-50 bg-slate-200 text-black text-sm rounded-md hover:bg-black/[0.8] hover:shadow-lg"> See details</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetPics;
