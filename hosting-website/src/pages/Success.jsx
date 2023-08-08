import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export default function Success() {
    const { width, height } = useWindowSize();
    const navigate = useNavigate();
  // Set a timer to navigate to /dashboard after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/dashboard');
    }, 4000); // 4000 milliseconds = 4 seconds

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
});
    return (
        <>
            <Confetti width={width} height={height} recycle={false} />

            <div className="bg-black h-96 w-full absolute top-0 left-0 right-0 -z-10"></div>
            
            <div className="mt-10">
                <p className="text-4xl font-bold text-white">Congratulations 🎉</p>
                <p className="text-base text-[var(--text-secondary)] mt-1">You just deployed a new projet on ardrive through arsync.</p>
            </div>

            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-2 mt-20 w-fit">
                <div className="border border-[var(--primary-dark)] rounded-md h-96 w-[700px] overflow-y-scroll">
                </div>
                {/* <p className="text-2xl font-semibold mb-5">Import Git Repository</p> */}
            </div>
        </>
    );
}