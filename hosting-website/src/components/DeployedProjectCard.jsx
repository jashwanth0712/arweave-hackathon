export default function DeployedProjectCard(props) {
    console.log(props)
    return (
        <div className="border border-[var(--primary-light)] hover:border-[var(--text)] rounded-lg h-48">
            <div style={{ display: "flex", padding: "9px" }}>
                {props.data.title}
                {props.data.link}

            </div>
            {props.data.latestCommit}
            {props.data.lastUpdatedOn}
        </div>
    );
};