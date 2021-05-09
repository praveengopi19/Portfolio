import { projects } from './projectArray';


const ProjectInputContent = () => {
    return (
        <div style={{ listStyle: "none", flexShrink: 0 }}>
            {projects.map((project, i) => {
                return (<li key={"projects" + i}><div className="heading">{project.Title}</div>
                    <div >
                        <li><div className="projectdis">Description:</div> {project.Description}</li>
                        {project.Mycontribution ? <li><div className="projectdis">My contribution:</div> {project.Mycontribution}</li> : ""}
                        <li><div className="projectdis">Tags:</div> {project.Tags}</li>
                        {project.Repo === "#" ? "" : <li><div className="projectdis">Source Code:</div><a style={{ color: "white" }} href={project.Repo} target="_blank" rel="noopener noreferrer">{project.Repo}</a></li>}
                        {project.Demo === "#" ? "" : <li><div className="projectdis">Live Demo:</div><a style={{ color: "white" }} href={project.Demo} target="_blank" rel="noopener noreferrer">{project.Demo}</a></li>}

                    </div></li>)
            })}
        </div>);
}

export default ProjectInputContent;