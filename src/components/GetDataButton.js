'use client';

const GetDataButton = () => {
  const handleAuthClick = async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        setMessage('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
    }
  };

  return (
    <div>
      {/* <p>{message}</p> */}
      <button type="button" onClick={handleAuthClick}>
        get Data
      </button>
    </div>
  );
};

export default GetDataButton;
