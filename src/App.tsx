import React, { useEffect, useState } from 'react';
import ClientComponent from './components/ClientComponent';
import { fetchAccessToken } from 'hume';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the access token when the component mounts
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await fetchAccessToken({
          apiKey: String(process.env.REACT_APP_HUME_API_KEY), // React env variable prefix
          secretKey: String(process.env.REACT_APP_HUME_SECRET_KEY),
        });
        setAccessToken(token);
      } catch (err) {
        setError("Failed to fetch access token from Hume");
        console.error(err);
      }
    };

    getAccessToken();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!accessToken) {
    return <div>Loading...</div>;
  }

  // Pass the access token to the ClientComponent once it's fetched
  return <ClientComponent accessToken={accessToken} />;
};

export default App;

