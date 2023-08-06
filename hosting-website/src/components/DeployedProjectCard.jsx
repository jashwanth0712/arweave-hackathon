import './Deployed.css'
import branchLogo from '../assets/images/branch.svg';

export default function DeployedProjectCard(props) {
    console.log(props)
    return (
        <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48 overflow:hidden p-5" >

            <div className='flex items-center gap-3'>
                <div className="h-10 w-10 rounded-full bg-[var(--primary-dark)]"></div>
                <div>
                    <p className='font-medium text-base'>{props.data.title}</p>
                    <p className='text-sm text-[var(--text-secondary)]'>{props.data.link}</p>
                </div>
            </div>

            <div className='text-sm text-[var(--text-primary)] mt-4'>
                <p>{props.data.latestCommit}</p>
                <div className='flex items-center gap-1'>
                    <img src={branchLogo} alt="" className='h-3' />
                    <p>From main</p>
                </div>
            </div>

            <div className='text-sm text-[var(--text-primary)] mt-8'>
                <p>{props.data.lastUpdatedOn}</p>
            </div>
        </div>
    );
};