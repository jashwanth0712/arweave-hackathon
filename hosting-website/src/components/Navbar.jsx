import LoginButton from "./LoginButton";

export default function Navbar() {

    return (
        <>
            <nav className="backdrop-blur-lg fixed top-0 left-0 right-0 border-b border-b-[var(--primary-light)]">
                <div className="max-w-5xl flex items-center justify-between py-4 mx-auto">
                    <h1 className="text-xl font-semibold">ARSync</h1>
                    <div className="flex items-center gap-2">
                        {/* <button className="px-4 py-2 text-sm hover:bg-[var(--primary-light)]">Log In</button> */}
                        <LoginButton />
                    </div>
                </div>
            </nav>
            <div className="h-20"></div>
        </>

    );
}