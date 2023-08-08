import React from "react";

export default function PopupModal() {
  const [showModal, setShowModal] = React.useState(false);
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
            {/*content*/}
            <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-transparent backdrop-filter backdrop-blur-md">
              {/*header*/}
              <div className="flex items-start justify-between p-5   rounded-t">
                <h3 className="text-3xl font-semibold">
                  Slide Show
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
                <p className="my-4 text-white-500 text-lg leading-relaxed">
                  I always felt like I could do anything. That’s the main
                  thing people are controlled by! Thoughts- their perception
                  of themselves! They're slowed down by their perception of
                  themselves. If you're taught you can’t do anything, you
                  won’t do anything. I was taught I could do everything.
                </p>
                <p className="my-4 text-white-500 text-lg leading-relaxed">
                  I always felt like I could do anything. That’s the main
                  thing people are controlled by! Thoughts- their perception
                  of themselves! They're slowed down by their perception of
                  themselves. If you're taught you can’t do anything, you
                  won’t do anything. I was taught I could do everything.
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 rounded-b">
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
