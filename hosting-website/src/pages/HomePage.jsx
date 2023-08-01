export default function HomePage() {
    return (
        <>
            <div className='flex gap-2 mt-5'>
                <form className='w-full'>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-3 pl-12 text-sm border ring-none focus:ring-none rounded-lg bg-[var(--primary-dark)] border-[var(--primary-light)] placeholder-gray-400 text-white focus:border-[var(--text-secondary)]" placeholder="Search..." required />
                </div>
                </form>

                <button className='text-base text-[var(--primary)] bg-[var(--text)] whitespace-nowrap'>Add New</button>
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
                <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48"></div>
                <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48"></div>
                <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48"></div>
                <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48"></div>
            </div>
        </>
    );
}