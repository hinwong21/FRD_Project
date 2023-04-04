import React, { useState, useEffect } from 'react';

export function InternetStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  const handleNetworkChange = () => {
    setOnline(navigator.onLine);
  };

  return (
    <div>
      {online ? (
        <p>You are connected to the internet!</p>
      ) : (
        <p>You are not connected to the internet.</p>
      )}
    </div>
  );
}