import React, { useState, useEffect } from "react";
import image1 from '../assets/images/image1.png'

const images = [image1, image2, image3];

export default function PopupModal() {
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (showModal) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [showModal]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

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
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-transparent backdrop-filter backdrop-blur-md">
                <div className="relative p-6 flex-auto">
                  <img
                    src={images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={prevSlide}
                  >
                    Previous
                  </button>
                  <button
                    className="text-white-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={nextSlide}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}




import React from "react";

export default function PopupModal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
    <button className='GetDemo' onClick={() => setShowModal(true)}>
        Get Demo
      </button>
      {showModal ? (
       <>
       <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
       <div
         className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md"
       >
         <div className="relative w-auto my-6 mx-auto max-w-3xl">
           {/*content*/}
           <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-transparent backdrop-filter backdrop-blur-md">
             {/*header*/}
             <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
               <h3 className="text-3xl font-semibold">
                 Modal Title
               </h3>
               <button
                 className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                 onClick={() => setShowModal(false)}
               >
                 <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                   ×
                 </span>
               </button>
             </div>
             {/*body*/}
             <div className="relative p-6 flex-auto">
              
             </div>
             {/*footer*/}
             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
               <button
                 className="text-white-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                 type="button"
                 onClick={() => setShowModal(false)}
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       </div>
     </>
     
      ) : null}
    </>
  );
}