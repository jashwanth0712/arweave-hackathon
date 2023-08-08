import image from '../assets/images/Asset-1.png';
import '../styles/StartingPage.css';
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animation from '../assets/lottie/animation_ll15mgrx.json'
import PopupModal from '../components/PopupModal';

function StartingPage() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData : animation,
    rendererSettings: {
      preserveAspectRatio: "none",
    },
 };

  return (
    <div className="App">
      <div className='arsync'><img className='image' src={image} alt='Asset-2'/>
      <h3 className='heading'>arsync</h3></div>
      <p className='vercel'>Vercel's frontend cloud gives developers the frameworks, 
        workflows, and infrastructure to build a faster, 
        more personalized Web</p>
      <div className='Buttons'>
        <Link to='/dashboard'>
          <button className='StartDeploying'>
            <p>Start Deploying</p>
          </button>
        </Link>

        {/* <button className='GetDemo'>Get Demo</button> */}
        <PopupModal/>
      </div>

      <p className='spacingLetters'>TRUSTED BY THE BEST FRONTEND TEAMS</p>
      <p className='spacingLetters'>EXPLORE THE VERCEL WAY</p>


      <div className='flex align-top gap-5 w-fit mx-auto mt-20'>
        <div className='mx-auto relative'>
          <div className="h-10 w-10 bg-[#603EAA] rounded-full grid place-content-center font-bold text-base text-[white]">1</div>
          <div className='h-40 w-[1px] bg-[#603EAA] mx-auto'></div>
          <div className='absolute left-14 top-0 w-max text-start max-w-xs'>
            <p className='text-3xl font-bold'>Create New Project</p>
            <p className='text-sm mt-1 text-[var(--text-primary)]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut culpa incidunt deleniti magni, fugiat corrupti dolorem sed alias voluptas consequuntur?</p>
          </div>
        </div>
      </div>

      <div className='flex align-top gap-5 w-fit mx-auto'>
        <div className='mx-auto relative'>
          <div className="h-10 w-10 bg-[#603EAA] rounded-full grid place-content-center font-bold text-base text-[white]">2</div>
          <div className='h-40 w-[1px] bg-[#603EAA] mx-auto'></div>
          <div className='absolute right-14 top-0 w-max text-start max-w-xs'>
            <p className='text-3xl font-bold'>Choose a framework</p>
            <p className='text-sm mt-1 text-[var(--text-primary)]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut culpa incidunt deleniti magni, fugiat corrupti dolorem sed alias voluptas consequuntur?</p>
          </div>
        </div>
      </div>
      
      <div className='flex align-top gap-5 w-fit mx-auto'>
        <div className='mx-auto relative'>
          <div className="h-10 w-10 bg-[#603EAA] rounded-full grid place-content-center font-bold text-base text-[white]">3</div>
          <div className='absolute left-14 top-0 w-max text-start max-w-xs'>
            <p className='text-3xl font-bold'>Deploy 🎉</p>
            <p className='text-sm mt-1 text-[var(--text-primary)]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut culpa incidunt deleniti magni, fugiat corrupti dolorem sed alias voluptas consequuntur?</p>
          </div>
        </div>
      </div>

      <div className='flex mt-[10rem]'>
        <div className='w-[650px] text-left'>hello</div>
        <div className=''>
          <Lottie options={defaultOptions} height={400} width={500} />
        </div>
      </div>

    </div>
  );
}

export default StartingPage;