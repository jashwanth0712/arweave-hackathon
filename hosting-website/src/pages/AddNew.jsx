import DeployForm from "./deployform/deployform";

export default function AddNewProject() {

    return (
        <>
            <div className="bg-black h-96 w-full absolute top-0 left-0 right-0 -z-10"></div>
            
            <div className="mt-10">
                <p className="text-4xl font-bold text-white">Never stop building.</p>
                <p className="text-base text-[var(--text-primary)] mt-1">To deploy a new Project, import an existing Git Repository.</p>
            </div>

            <div className="bg-black border border-[var(--primary-dark)] rounded-xl p-10 mt-20 max-w-2xl">
                <p className="text-2xl font-semibold mb-5">Import Git Repository</p>
                <div className="border border-[var(--primary-dark)] rounded-md">
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                        <p className="text-white text-base font-medium">arweave-hackathon <span className="font-normal text-[var(--text-secondary)] text-sm">• 5d ago</span></p>
                        <button className="bg-white py-2 px-4 text-black text-sm">Import</button>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                        <p className="text-white text-base font-medium">supabase-nextjs-todo-list <span className="font-normal text-[var(--text-secondary)] text-sm">• 7d ago</span></p>
                        <button className="bg-white py-2 px-4 text-black text-sm">Import</button>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                        <p className="text-white text-base font-medium">internal-affairs <span className="font-normal text-[var(--text-secondary)] text-sm">• 33d ago</span></p>
                        <button className="bg-white py-2 px-4 text-black text-sm">Import</button>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[var(--primary-dark)] p-4">
                        <p className="text-white text-base font-medium">malviyahimanshu <span className="font-normal text-[var(--text-secondary)] text-sm">• 269d ago</span></p>
                        <button className="bg-white py-2 px-4 text-black text-sm">Import</button>
                    </div>
                </div>
            </div>
        </>
    );
}