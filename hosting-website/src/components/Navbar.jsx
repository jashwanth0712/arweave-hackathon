import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [userData, setUserData] = useState({});
    const [showLogout, setShowLogout] = useState(false);

    const handleShowLogout = () => {
        setShowLogout(!showLogout);
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "http://localhost:5173";
    }

    useEffect(() => {
        getUserData()
    }, []);

    async function getUserData() {
        await fetch('http://localhost:3000/getUserData', {
            method: 'GET',
            headers: {
                "Authorization": "token " + localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log(data);
            setUserData(data);
        })
    }

    return (
        <>
            <nav className="backdrop-blur-lg fixed top-0 left-0 right-0 border-b border-b-[var(--primary-light)]">
                <div className="max-w-5xl flex items-center justify-between py-4 mx-auto">
                    <h1 className="text-xl font-semibold">ARSync</h1>
                    
                    {localStorage.getItem("accessToken") ? (
                        <div onClick={handleShowLogout} className="flex items-center gap-3 relative">
                            <p className="text-sm text-[var(--text-primary)] font-medium">{userData.login}</p>
                            <div className="h-8 w-8 rounded-full bg-gray-400">
                                <img src={userData.avatar_url} alt="" className="h-8 pointer-events-none" />
                            </div>
                            {showLogout && (
                                <button onClick={handleLogout} className="absolute top-10 right-0 px-6 py-2 rounded-lg bg-[var(--primary-dark)] text-sm">
                                    Logout
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <LoginButton />
                        </div>
                    )}

                </div>
            </nav>
            <div className="h-20"></div>
        </>

    );
}