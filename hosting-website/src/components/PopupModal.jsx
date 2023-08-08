import React from "react";
import { Carousel } from "@material-tailwind/react";
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
            
             {/*body*/}
             <div >
             
    <Carousel className="rounded-xl">
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  
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