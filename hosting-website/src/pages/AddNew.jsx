import DeployForm from "./deployform/deployform";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";




export default function AddNewProject() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [seedPhrase, setseedPhrase] = useState('');

    useEffect(() => {
        setLoading(true);
        if(localStorage.getItem("accessToken") && localStorage.getItem("username")) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const repoData = await fetch('http://localhost:3000/all_repos', {
                method: 'GET',
                headers: {
                    username: localStorage.getItem("username"),
                    access_token: localStorage.getItem("accessToken"),
                }
            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log(data);
                return data;
            });
            console.log("my name is reponse data", repoData);
            setLoading(false);
            setData(repoData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const redirectToDeployForm = (repoName) => {
        navigate('/import', { 
            state: {
                repo: repoName
            }
        })
    }
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform your upload logic here
      console.log('Uploading:', selectedFile);
      // You can send the selectedFile to your server using API calls or other methods
    } else {
      console.log('No file selected.');
    }
  };

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
            {isLoading && <LoadingSpinner />}
            <div className="bg-black h-96 w-full absolute top-0 left-0 right-0 -z-10"></div>
            
            <div className="mt-10">
                <p className="text-4xl font-bold text-white">Never stop building.</p>
                <p className="text-base text-[var(--text-secondary)] mt-1">To deploy a new Project, import an existing Git Repository.</p>
            </div>
          <div className="flex justify-between mb-[20px] ">
            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-20 w-[550px]">
                <p className="text-2xl font-semibold mb-5">Import Git Repository</p>
                <div className="border border-[var(--primary-dark)] rounded-md h-96 overflow-y-scroll">

                    {
                        data.map((repo, index) => {
                            return (
                                <div key={index} className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                                    <p className="text-white text-base font-medium">{repo.name} <span className="font-normal text-[var(--text-secondary)] text-sm">• {getTimeAgo(repo.updated_at)}</span></p>
                                    <button onClick={() => redirectToDeployForm(repo.name)} className="bg-white py-2 px-4 text-black text-sm">Import</button>
                                </div>
                            );
                        })
                    }
                    
                </div>
            </div>
            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-20 ">
            <p className="text-2xl font-semibold text-center ">Login</p>
            <input type="text" id="seedPhrase" className='mt-[30px] text-md w-[100px] placeholder-[var(--primary-light)]' value={seedPhrase} placeholder='Enter Seed Phrase' onChange={(e) => setseedPhrase(e.target.value)} required />
             <div>
                
             </div>


            </div>
            </div>
        </>
    );
}