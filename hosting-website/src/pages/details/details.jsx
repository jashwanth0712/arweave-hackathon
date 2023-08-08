import './details.css'
import Lottie from "react-lottie";
import animation from '../../assets/lottie/animation_ll17q9ak.json'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Details() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData : animation,
    rendererSettings: {
      preserveAspectRatio: "none",
    },
 };

    const [data, setData] = useState({});
    const location = useLocation();

    useEffect(() => {
        setData(location.state.data);
        console.log(location.state.data);
        console.log("this is title : ", location.state.data.data.title);
        console.log(data);
    }, [])

    function getTimeAgo(timestamp) {
        const now = new Date();
        const targetTime = new Date(timestamp);
        const timeDifference = now - targetTime;
    
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}hr ago`;
        } else if (minutes > 0) {
            return `${minutes}min ago`;
        } else {
            return `${seconds}sec ago`;
        }
    }

    return (
        <>
            <div className="bg-black h-96 w-full absolute top-0 left-0 right-0 -z-10"></div>
            
            <div className="mt-10 flex justify-between items-center">
                <p className="text-4xl font-bold text-white whitespace-nowrap">{location.state.data.data.title}</p>
                <div className="threebtn"> <button className='h-fit whitespace-nowrap'>Git Repository</button><button className='h-fit whitespace-nowrap'>Domains</button><button className='h-fit whitespace-nowrap'>Visit</button></div>
            </div>
              
           <div className='mb-[25px]'>
          
            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-32 max-w-5xl flex">
              
                
                <div className="border border-[var(--primary-dark)] rounded-md w-[450px] h-80">
                  <Lottie options={defaultOptions} height={320} width={450} />
                </div>

                <div className='mx-5'>

                  <div>
                <p>Deployment</p>
                <p className="text-0.5xl font-bold text-grey">{location.state.data.data.link}</p>
                </div>
                <div className='mt-10'>
                <p>Domains</p>
                <p className="text-0.5xl font-bold text-grey">{location.state.data.data.link}</p>
                </div>

                <div className='mt-10 flex'>
                
                 <div>
                <p>Status</p>
                <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-green-500'></div>
                    <p className="text-0.5xl font-bold text-grey">Ready</p>
                </div>
                </div>
                <div className='mx-10'>
                <p>Created</p>
                <p className="text-0.5xl font-bold text-grey">{getTimeAgo(location.state.data.data.lastUpdatedOn)}</p>
                </div>
                </div>


                </div>
            </div>

            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-10 max-w-5xlflex">
              <div>
                <p className='mb-[10px]'>Commits on 8th Aug</p>
            <div className="border border-[var(--primary-dark)] rounded-md w-[945px]">
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                     
                        <p className="text-white text-base font-medium">Debug <br /> USER ID<span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span> </p>
                        <button className="bg-transparent py-2 px-4 text-grey text-sm">46eyedg</button>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                     
                     <p className="text-white text-base font-medium">Debug <br /> USER ID<span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span> </p>
                     <button className="bg-transparent py-2 px-4 text-grey text-sm">46eyedg</button>
                 </div>
                 <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                     
                     <p className="text-white text-base font-medium">Debug <br /> USER ID<span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span> </p>
                     <button className="bg-transparent py-2 px-4 text-grey text-sm">46eyedg</button>
                 </div>
                   
                   
                </div>

               
            </div>
            <div className='mt-[20px]'>
                <p className='mb-[10px]'>Commits on 4th Aug</p>
            <div className="border border-[var(--primary-dark)] rounded-md w-[945px]">
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                     
                        <p className="text-white text-base font-medium">Debug <br /> USER ID<span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span> </p>
                        <button className="bg-transparent py-2 px-4 text-grey text-sm">46eyedg</button>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                     
                     <p className="text-white text-base font-medium">Debug <br /> USER ID<span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span> </p>
                     <button className="bg-transparent py-2 px-4 text-grey text-sm">46eyedg</button>
                 </div>
                 <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                     
                     <p className="text-white text-base font-medium">Debug <br /> USER ID<span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span> </p>
                     <button className="bg-transparent py-2 px-4 text-grey text-sm">46eyedg</button>
                 </div>
                   
                   
                </div>

               
            </div>
            </div>
            </div>   
        </>
    );
}