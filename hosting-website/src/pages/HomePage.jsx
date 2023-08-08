import DeployedProjectCard from "../components/DeployedProjectCard";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react';
import { exampleNames } from "../utils/exampleNames";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("accessToken") && localStorage.getItem("username")) {
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
            {isLoading && <LoadingSpinner />}
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
                                    link: item.url,
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