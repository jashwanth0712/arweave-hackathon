import React from "react";

export default function LoginButton() {

    const handleGitHubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUri = encodeURIComponent('http://localhost:5173/callback');
        const scope = encodeURIComponent('user');

        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
        window.location.href = authUrl;
    };

    return (
        <button onClick={handleGitHubLogin} className="px-4 py-2 text-sm bg-[var(--text)] text-[var(--primary)] border-[var(--text)]">Login with GitHub</button>
    );
}