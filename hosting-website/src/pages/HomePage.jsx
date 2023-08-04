import DeployedProjectCard from "../components/DeployedProjectCard";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <div className='flex gap-2 mt-5'>
                <form className='w-full'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-3 pl-12 text-sm border ring-none focus:ring-none rounded-lg bg-[var(--primary-dark)] border-[var(--primary-light)] placeholder-gray-400 text-white focus:border-[var(--text-secondary)]" placeholder="Search..." required />
                    </div>
                </form>

                <Link to="/addNew">
                    <button className='text-base text-[var(--primary)] bg-[var(--text)] whitespace-nowrap'>Add New</button>
                </Link>
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
                <DeployedProjectCard data={{ title: "placementcell", link: "placement-cell.bay.vercel.app", latestCommit: "updated something", lastUpdatedOn: "7days ago" }} />
                <DeployedProjectCard data={{ title: "placementcell", link: "placement-cell.bay.vercel.app", latestCommit: "updated something", lastUpdatedOn: "7days ago" }} />
                <DeployedProjectCard data={{ title: "placementcell", link: "placement-cell.bay.vercel.app", latestCommit: "updated something", lastUpdatedOn: "7days ago" }} />
                <DeployedProjectCard data={{ title: "placementcell", link: "placement-cell.bay.vercel.app", latestCommit: "updated something", lastUpdatedOn: "7days ago" }} />
            </div>
        </>
    );
}