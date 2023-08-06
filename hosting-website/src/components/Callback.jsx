// Callback.js

import React, { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
      const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
      
      fetch(`https://github.com/login/oauth/access_token`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirectUri,
        }),
      })
      .then(response => response.json())
      .then(data => {
        const accessToken = data.access_token;
        console.log('Access Token:', accessToken);

        // Now you can use the access token to make API requests on behalf of the user
      })
      .catch(error => {
        console.error('Error fetching access token:', error);
      });
    }
  }, []);

  return (
    <div>
      <p>Logging in...</p>
    </div>
  );
};

export default Callback;
