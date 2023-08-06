import React, { useState } from 'react';
import './deployform.css';
const DeployForm = () => {
  const [projectName, setProjectName] = useState('');
  const [framework, setFramework] = useState('');
  const [rootDirectory, setRootDirectory] = useState('');
  const [buildSettings, setBuildSettings] = useState('option1');
  const [buildCommand, setBuildCommand] = useState('');
  const [outputDirectory, setOutputDirectory] = useState('');
  const [installCommand, setInstallCommand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., save data to a server
    // or perform other actions based on the form data.
    console.log('Form submitted!');
  };

  return (

    <div className='depcont'>
    <div style={{ background: 'black', color: 'white', fontFamily: 'Arial, sans-serif' }}>
    <h2>Configure Project</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectName">Project Name:</label>
      <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />

      <label htmlFor="framework">Framework:</label>
      <input type="text" id="framework" value={framework} onChange={(e) => setFramework(e.target.value)} required />

      <label htmlFor="rootDirectory">Root Directory:</label>
      <input type="text" id="rootDirectory" value={rootDirectory} onChange={(e) => setRootDirectory(e.target.value)} required />

      <label htmlFor="buildSettings">Build and Output Settings:</label>
      
    

      <label htmlFor="buildCommand">Build Command:</label>
      <input type="text" id="buildCommand" value={buildCommand} onChange={(e) => setBuildCommand(e.target.value)} required />

      <label htmlFor="outputDirectory">Output Directory:</label>
      <input type="text" id="outputDirectory" value={outputDirectory} onChange={(e) => setOutputDirectory(e.target.value)} required />

      <label htmlFor="installCommand">Install Command:</label>
      <input type="text" id="installCommand" value={installCommand} onChange={(e) => setInstallCommand(e.target.value)} required />

     <button type="submit" className='btn' style={{ backgroundColor: 'white', color: 'black', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}> Deploy </button> 
    </form>
  </div>
  </div>
  );
};

export default DeployForm;
