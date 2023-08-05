import React from "react";

export default function LoginButton() {

    const handleGitHubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    };

    return (
        <button onClick={handleGitHubLogin} className="px-4 py-2 text-sm bg-[var(--text)] text-[var(--primary)] border-[var(--text)]">Login with GitHub</button>
    );
}

{/* <button className="px-4 py-2 text-sm hover:bg-[var(--primary-light)]">Log In</button> */}