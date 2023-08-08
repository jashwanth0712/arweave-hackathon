import React, { useEffect, useState } from 'react';
import './deployform.css';
import { useNavigate, useLocation } from 'react-router-dom';
import githubLogo from '../../assets/images/github.svg';
import LoadingSpinner from '../../components/LoadingSpinner';

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
      const workflow = await fetch('https://arweave-hackathon-jashwanth0712.vercel.app/addWorkflow', {
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
      {isLoading && <LoadingSpinner />}
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
