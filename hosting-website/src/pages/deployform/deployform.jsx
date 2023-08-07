import React, { useEffect, useState } from 'react';
import './deployform.css';
import { useNavigate, useLocation } from 'react-router-dom';
import githubLogo from '../../assets/images/github.svg';

const DeployForm = (props) => {
  const [projectName, setProjectName] = useState('');
  const [framework, setFramework] = useState('');
  const [rootDirectory, setRootDirectory] = useState('');
  const [buildSettings, setBuildSettings] = useState('option1');
  const [buildCommand, setBuildCommand] = useState('');
  const [outputDirectory, setOutputDirectory] = useState('');
  const [installCommand, setInstallCommand] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("This is prop: ", location);
    setProjectName(location.state.repo);
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., save data to a server
    // or perform other actions based on the form data.

    deployProject();
    console.log('Form submitted!');
  };

  const deployProject = async () => {
    setIsLoading(true);
    try {
      const workflow = await fetch('http://localhost:3000/addWorkflow', {
          method: 'GET',
          headers: {
              username: localStorage.getItem("username"),
              access_token: localStorage.getItem("accessToken"),
              repository: location.state.repo,
          }
      })
      setIsLoading(false);
      navigate('/success')
      // console.log("This is reponse data from addWorkflow", workflow);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 grid place-content-center h-screen w-screen z-20 bg-black bg-opacity-25 backdrop-blur-lg text-xl font-bold">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                {/* <span class="sr-only">Loading...</span> */}
            </div>
        </div>
      )}
      <div className="bg-black h-96 w-full absolute top-0 left-0 right-0 -z-10"></div>

      <div className='flex items-baseline justify-between'>
        <div className="mt-10">
            <p className="text-4xl font-bold text-white">You're almost done.</p>
            <p className="text-base text-[var(--text-secondary)] mt-1">Please follow the steps to configure your Project and deploy it.</p>
        </div>

        <div className='flex items-center gap-2 bg-[var(--primary-dark)] py-5 px-12 h-fit rounded-lg'>
          <img src={githubLogo} alt="" className='h-5' />
          <p className='text-base font-medium'>{location.state.repo}</p>
        </div>
      </div>

      <div className='bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-20 max-w-[700px]'>
        <p className="text-2xl font-semibold">Configure Project</p>
        <hr className='border-[var(--primary-dark)] my-5' />
        <form onSubmit={handleSubmit}>
            <label htmlFor="projectName" className='text-xs text-[var(--text-secondary)]'>Project Name</label>
            <input type="text" id="projectName" className='text-sm placeholder-[var(--primary-light)]' defaultValue={projectName} onChange={(e) => setProjectName(e.target.value)} required />
            
            <label htmlFor="framework" className='text-xs text-[var(--text-secondary)] mt-5'>Framework</label>
            <input type="text" id="framework" className='text-sm placeholder-[var(--primary-light)]' value={framework} placeholder='Other' onChange={(e) => setFramework(e.target.value)} required />

            <label htmlFor="rootDirectory" className='text-xs text-[var(--text-secondary)] mt-5'>Root Directory</label>
            <input type="text" id="rootDirectory" className='text-sm placeholder-[var(--primary-light)]' value={rootDirectory} placeholder='./' onChange={(e) => setRootDirectory(e.target.value)} required />


            <label htmlFor="buildSettings" className='text-base font-medium text-[var(--text-secondary)] mt-8'>Build and Output Settings</label>
            
            <label htmlFor="buildCommand" className='text-xs text-[var(--text-secondary)] mt-2'>Build Command</label>
            <input type="text" id="buildCommand" className='text-sm placeholder-[var(--primary-light)]' value={buildCommand} placeholder='`npm run build` or `npm run ar-build`' onChange={(e) => setBuildCommand(e.target.value)} required />

            <label htmlFor="outputDirectory" className='text-xs text-[var(--text-secondary)] mt-5'>Output Directory</label>
            <input type="text" id="outputDirectory" className='text-sm placeholder-[var(--primary-light)]' value={outputDirectory} placeholder='`public` if it exists, or `.`' onChange={(e) => setOutputDirectory(e.target.value)} required />

            <label htmlFor="installCommand" className='text-xs text-[var(--text-secondary)] mt-5'>Install Command</label>
            <input type="text" id="installCommand" className='text-sm placeholder-[var(--primary-light)]' value={installCommand} placeholder='`yarn install`, `pnpm install`, or `npm install`' onChange={(e) => setInstallCommand(e.target.value)} required />
            
            <button type="submit" className='btn hover:brightness-90 transition-all duration-150 ease-in-out' style={{ backgroundColor: 'white', color: 'black', padding: '9px 15px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}> Deploy </button> 
        </form>
      </div>
    </>
  );
};

export default DeployForm;
