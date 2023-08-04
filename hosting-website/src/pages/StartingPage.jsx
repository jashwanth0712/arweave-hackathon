import '../styles/StartingPage.css';

function StartingPage() {
  return (
    <div className="App">
      <h3 className='heading'>AR SYNC</h3>
      <p className='text'>Vercel's frontend cloud gives developers the frameworks, 
        workflows, and infrastructure to build a faster, 
        more personalized Web</p>
      <div className='Buttons'>
        <button className='StartDeploying'>
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
          <div className='line'></div>
          <div className='circle'><span className='number'>1</span></div>
        </div>
      </div>

      <div className='step-2'>
        <div className='centre'>
          <div className='line'></div>
          <div className='circle'><span className='number'>2</span></div>
        </div>
      </div>

      <div className='step-3'>
        <div className='centre'>
          <div className='line'></div>
          <div className='circle'><span className='number'>3</span></div>
        </div>
      </div>

    </div>
  );
}

export default StartingPage;
