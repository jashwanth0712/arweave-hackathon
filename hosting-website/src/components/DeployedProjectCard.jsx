import './Deployed.css'

export default function DeployedProjectCard(props) {
    console.log(props)
    return (
        <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48 overflow:hidden" >

            <div className="content">
            <div className='title'>
                  <img src="" alt="" />

                {props.data.title}
                <br />
                {props.data.link}
            </div>
            
            <div className='lastcommit'>
            {props.data.latestCommit}
            </div>
            <div className="lastupdate">
            {props.data.lastUpdatedOn}
            </div>
            </div>
        </div>
    );
};