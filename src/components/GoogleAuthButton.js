'use client';
import { useState } from 'react';

const GoogleAuthButton = () => {
  const [message, setMessage] = useState('');

  const handleAuthClick = async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        window.location.assign(result.url);
      } else {
        setMessage('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div>
      {/* <p>{message}</p> */}
      <button type="button" onClick={handleAuthClick}>
        Authenticate with Google
      </button>
    </div>
  );
};

export default GoogleAuthButton;
