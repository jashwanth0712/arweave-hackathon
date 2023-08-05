import image from '../assets/images/Asset-1.png';
import '../styles/StartingPage.css';

function StartingPage() {
  return (
    <div className="App">
      <div className='arsync'><img className='image' src={image} alt='Asset-2'/>
      <h3 className='heading'>arsync</h3></div>
      <p className='vercel'>Vercel's frontend cloud gives developers the frameworks, 
        workflows, and infrastructure to build a faster, 
        more personalized Web</p>
      <div className='Buttons'>
        <button className='StartDeploying' href= 'https://github.com/login/oauth/authorize?client_id={process.env.clientId}'>
          <p>Start Deploying</p>
        </button>
        <button className='GetDemo'>
          <p>Get Demo</p>
        </button>
      </div>

      <p className='spacingLetters'>TRUSTED BY THE BEST FRONTEND TEAMS</p>
      <p className='spacingLetters'>EXPLORE THE VERCEL WAY</p>

      <div className='step-1'>
        <div className='centre'>
          <div className='line'><p class="firstStep">Hi nice to meet step 1</p>
        <p class="firstStep">Hi nice to meet step 1</p></div>
          <div className='circle'><span className='number'>1</span></div>
        </div>
      </div>

      <div className='step-2'>
        <div className='centre'>
          <div className='line'><p class="firstStep">Hi nice to meet step 1</p>
        <p class="firstStep">Hi nice to meet step 1</p></div>
          <div className='circle'><span className='number'>2</span></div>
        </div>
      </div>

      <div className='step-3'>
        <div className='centre'>
          <div className='line'><p class="firstStep">Hi nice to meet step 1</p>
        <p class="firstStep">Hi nice to meet step 1</p></div>
          <div className='circle'><span className='number'>3</span></div>
        </div>
      </div>

    </div>
  );
}

export default StartingPage;
