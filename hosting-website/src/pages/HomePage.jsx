import DeployedProjectCard from "../components/DeployedProjectCard";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react';
import { exampleNames } from "../utils/exampleNames";

export default function HomePage() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        setLoading(true);
        if(localStorage.getItem("accessToken") && localStorage.getItem("username")) {
            console.log("Fetching data");
            // getUserData();
            fetchData();
        }
    }, []);

    function getUserData() {
        const userData = localStorage.getItem("username");
    }

    const fetchData = async () => {
        try {
            const repoData = await fetch('http://localhost:3000/arsync_repos', {
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
            // Replace with your API endpoint URL
            console.log("my name is reponse data", repoData);
            setLoading(false);
            setData(repoData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // const firstElementName = dataArray.length > 0 ? dataArray[0].name : '';


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const codeParam = queryParams.get('code')
        // console.log("This is code param: ", codeParam);

        if (codeParam && (localStorage.getItem("accessToken") === null)) {
            async function getAccessToken() {
                await fetch('http://localhost:3000/getAccessToken?code=' + codeParam, {
                    method: 'GET',
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log(data);
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        window.location.href = "http://localhost:5173/dashboard";
                    }
                })
            }
            getAccessToken()
        }
    }, []);

    function getRandomProfile() {
        const randomName = exampleNames[Math.floor(Math.random() * exampleNames.length)];
        return randomName;
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
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div className='flex gap-2 mt-5'>
                {/* {data ? data[0].name : "Loading..."} */}

                <form className='w-full'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-2 bg-transparent pl-12 text-sm border ring-none focus:ring-none rounded-lg border-[var(--primary-light)] placeholder-gray-400 text-white focus:border-[var(--text-secondary)]" placeholder="Search..." required />
                    </div>
                </form>

                <Link to="/addNew">
                    <button className='text-sm text-[var(--primary)] bg-[var(--text)] whitespace-nowrap'>Add New</button>
                </Link>
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>

                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        {item ? (
                            <DeployedProjectCard
                                data={{
                                    profile: getRandomProfile(),
                                    title: item.name,
                                    link: "placement-cell.bay.vercel.app",
                                    latestCommit: item.commit_msg,
                                    lastUpdatedOn: item.updated_at
                                }}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </React.Fragment>
                ))}
                {/* {data[0] ? <DeployedProjectCard data={{ title: data[0].name, link: "placement-cell.bay.vercel.app", latestCommit: "updated something", lastUpdatedOn: "7days ago" }} /> : "Loading..."} */}
            </div>
        </>
    );
}