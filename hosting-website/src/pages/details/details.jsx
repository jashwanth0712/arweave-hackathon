import './details.css'
import Lottie from "react-lottie";
import animation from '../../assets/lottie/animation_ll17q9ak.json'

export default function Details() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData : animation,
    rendererSettings: {
      preserveAspectRatio: "none",
    },
 };

    return (
        <>
            <div className="bg-black h-56 w-full absolute top-0 left-0 right-0 -z-10"></div>
            
            <div className="mt-10 flex">
                <p className="text-4xl font-bold text-white">arweave-hackathon</p>
                <div className="threebtn"> <button>Git Repository</button><button>Domains</button><button>Visit</button></div>
                
            </div>
              
           <div className='mb-[25px]'>
          
            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-40 max-w-5xl flex">
              
                
                <div className="border border-[var(--primary-dark)] rounded-md w-[450px] h-80">
                  <Lottie options={defaultOptions} height={320} width={450} />
                </div>

                <div className='mx-5'>

                  <div>
                <p>Deployment</p>
                <p className="text-0.5xl font-bold text-grey">arweave-hackathon wdigwivw.app</p>
                </div>
                <div className='mt-10'>
                <p>Domains</p>
                <p className="text-0.5xl font-bold text-grey">arweave-hackathon wdigwivw.app</p>
                </div>

                <div className='mt-10 flex'>
                
                 <div>
                <p>Status</p>
                <p className="text-0.5xl font-bold text-grey">Ready</p>
                </div>
                <div className='mx-10'>
                <p>Created</p>
                <p className="text-0.5xl font-bold text-grey">14hrs ago by userid</p>
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