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
      <p className='vercel'>ARSync gives you the best user experience and fast deployment of websites with a single click.</p>
      <div className='Buttons'>
        <Link to='/dashboard'>
          <button className='StartDeploying'>
            <p>Start Deploying</p>
          </button>
        </Link>

        {/* <button className='GetDemo'>Get Demo</button> */}
        <PopupModal/>
      </div>

      <div className='flex align-top gap-5 w-fit mx-auto mt-20'>
        <div className='mx-auto relative'>
          <div className="h-10 w-10 bg-[#603EAA] rounded-full grid place-content-center font-bold text-base text-[white]">1</div>
          <div className='h-40 w-[1px] bg-[#603EAA] mx-auto'></div>
          <div className='absolute left-14 top-0 w-max text-start max-w-xs'>
            <p className='text-3xl font-bold'>Import project</p>
            <p className='text-sm mt-1 text-[var(--text-primary)] text-[19px]'>Login with your github account and import your project from your github repositories to start deploying your project.</p>
          </div>
        </div>
      </div>

      <div className='flex align-top gap-5 w-fit mx-auto'>
        <div className='mx-auto relative'>
          <div className="h-10 w-10 bg-[#603EAA] rounded-full grid place-content-center font-bold text-base text-[white]">2</div>
          <div className='h-40 w-[1px] bg-[#603EAA] mx-auto'></div>
          <div className='absolute right-14 top-0 w-max text-start max-w-xs'>
            <p className='text-3xl font-bold'>Connect with ardrive wallet</p>
            <p className='text-sm mt-1 text-[var(--text-primary)] text-[19px]'>Connect your ardrive wallet to finish deployment of your project.</p>
          </div>
        </div>
      </div>
      
      <div className='flex align-top gap-5 w-fit mx-auto'>
        <div className='mx-auto relative'>
          <div className="h-10 w-10 bg-[#603EAA] rounded-full grid place-content-center font-bold text-base text-[white]">3</div>
          <div className='absolute left-14 top-0 w-max text-start max-w-xs'>
            <p className='text-3xl font-bold'>Deploy 🎉</p>
            <p className='text-sm mt-1 text-[var(--text-primary)] text-[19px]'>Congrats, you have successfully deployed your website.</p>
          </div>
        </div>
      </div>

      <div className='flex mt-[10rem]'>
        <div className='w-[650px] text-left text-[19px]'>Welcome to arsync, your ultimate solution for effortless Continuous Integration and Continuous Deployment CI/CD of ardrive hosted websites🤯. We understand the challenges that developers face when it comes to maintaining seamless updates and deployments for their ardrive-hosted projects 🫂. With ARSync, we've revolutionized the process🤩, making it easier than ever to keep your websites up-to-date and running smoothly.😉</div>
        <div className=''>
          <Lottie options={defaultOptions} height={400} width={500} />
        </div>
      </div>

    </div>
  );
}

export default StartingPage;