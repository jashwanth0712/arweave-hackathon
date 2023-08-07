import './Deployed.css'
import branchLogo from '../assets/images/branch.svg';
import jazzicon from '@metamask/jazzicon';
import Avatar from 'boring-avatars';

export default function DeployedProjectCard(props) {

    return (
        <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48 overflow:hidden p-5" >

            <div className='flex items-center gap-3'>
                <Avatar 
                    size={40}
                    name={props.data.profile}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />

                {/* <div className="h-10 w-10 rounded-full bg-[var(--primary-dark)] grid place-content-center text-xl bg-blue-900 uppercase">{props.data.title[0]}</div> */}
                <div>
                    <p className='font-medium text-base'>{props.data.title}</p>
                    <p className='text-sm text-[var(--text-secondary)]'>{props.data.link}</p>
                </div>
            </div>

            <div className='text-sm text-[var(--text-primary)] mt-4'>
                <p className='truncate'>{props.data.latestCommit}</p>
                <div className='flex items-center gap-1'>
                    <img src={branchLogo} alt="" className='h-3' />
                    <p>From <span className='font-mono'>main</span></p>
                </div>
            </div>

            <div className='text-sm text-[var(--text-primary)] mt-8'>
                <p>{props.data.lastUpdatedOn}</p>
            </div>
        </div>
    );
};