function getActiveAddress() {
    return new Promise((resolve, reject) => {
      const message = {
        type: 'arweaveWallet.getActiveAddress',
      };
  
      window.addEventListener('message', (event) => {
        if (event.source === window && event.data.type === 'api_response') {
          if (event.data.callID === message.id) {
            if (event.data.success) {
              resolve(event.data.data);
            } else {
              reject(new Error(event.data.error));
            }
          }
        }
      });
  
      window.postMessage(message, window.location.origin);
    });
  }
  
  export default {
    getActiveAddress,
  };
  