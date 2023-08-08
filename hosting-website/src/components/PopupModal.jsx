import React, { useState, useEffect } from "react";

const imageLinks = [
  "https://imgs.search.brave.com/gZSPHKpSrfrpTkAUsGXiZo-i3WLr8IKrDmL4Ia2KHOw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbG9jZWFu/LmNvbS9fbmV4dC9z/dGF0aWMvbWVkaWEv/aW50cm8tdG8tY2xv/dWQuZDQ5YmM1Zjcu/anBlZw",
  "https://imgs.search.brave.com/_RtpHldsu_U1uPCUT-8j93uhPyK3zl0Gf1aDnFzYjdA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSo3SWFDTnVl/WjRxcjRHTXFVdGNW/WVdRLnBuZw",

  // Add more image links as needed
];

export default function PopupModal() {
  const [showModal, setShowModal] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let imageInterval;

    if (showModal) {
      imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
      }, 2000);
    } else {
      clearInterval(imageInterval);
    }

    return () => {
      clearInterval(imageInterval);
    };
  }, [showModal]);

  useEffect(() => {
    let closeTimeout;
  
    if (showModal) {
      closeTimeout = setTimeout(() => {
        setShowModal(false);
      }, 6000);
    } else {
      clearTimeout(closeTimeout);
    }
  
    return () => {
      clearTimeout(closeTimeout);
    };
  }, [showModal]);
  
  return (
    <>
      <button className="GetDemo" onClick={() => setShowModal(true)}>
        Get Demo
      </button>
      {showModal ? (
        <>
        <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/* {/content/} */}
            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-transparent backdrop-filter backdrop-blur-md">
              {/* {/header/} */}
              <div className="flex items-start justify-between p-0 rounded-t">
          
              </div>
              {/* {/body/} */}
              <div className="relative p-6 flex-auto ">
                  <img
                    src={imageLinks[currentImageIndex]}
                    alt={`Slide ${currentImageIndex}`}
                    className="w-full rounded-lg"
                  />
              </div>
  
              <button
                  className="flex text-white-500 background-transparent font-bold uppercase px-6 py-2 w-fit justify-center text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Skip
              </button>
            </div>
          </div>
        </div>
      </>
      
      ) : null}
    </>
  );
}