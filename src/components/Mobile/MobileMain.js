import './mobile.css';
import { Link } from 'react-router-dom';
import { ReactComponent as BannerImage } from '../../BannerImage.svg';
import { projects } from '../Desktop/Projects/projectArray';
import { ReactComponent as LinkedIn } from '../../assets/icons/linkedin.svg';
import { ReactComponent as GitHub } from '../../assets/icons/github.svg';
import { ReactComponent as Behance } from '../../assets/icons/behance.svg';
import { ReactComponent as FaceBook } from '../../assets/icons/facebook.svg';
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as Logo } from '../../assets/pk.svg';

function MobileMain({ mobile }) {
  return (
    <>
      <nav className="headermobile">
        <Link to="/" className="linksimplified">
          <Logo style={{
            height: '42px', width: '42px', paddingTop: '2px', fill: '#4169E1',
          }}
          />
        </Link>
      </nav>
      <div className="widthdecider">
        <header className="mobiletopbanner">
          <div className="bannerflex1">
            <div className="subheader">
              Hello World, I am
              {' '}
              <div className="color">Praveen Kumar</div>
            </div>
            <div className="topcontent">
              A Front-end Web developer
            </div>
            {mobile ? '' : (
              <div className="cmdanimate">
                <Link to="/cmd" className="cmdlink">
                  {' '}
                  Try command-line interface version of my portfolio&nbsp;
                  <span>
                    <svg style={{ transform: 'translateY(2px)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 19" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 12v2h6v-2h-6zm-3.586-3l-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12z" fill="rgba(65,105,225,1)" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}

          </div>
          <div className="bannerflex2">
            <BannerImage className="img" style={{ fill: '#4169E1' }} />
          </div>
        </header>
        <section>
          <div className="mediumHeader">
            Skills
          </div>
          <div className="skillli">
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>Bootstrap</li>
              <li>JavaScript</li>
              <li>PHP</li>
              <li>MySQL</li>
              <li>MongoDB</li>
              <li>React</li>
              <li>Redux</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>Java</li>
              <li>Figma</li>
              <li>Adobe XD</li>
            </ul>
          </div>
        </section>
        <section>
          <div className="mediumHeader">
            Projects
          </div>
          <div className="projectsli" style={{ fontWeight: 600 }}>
            <ul>
              {projects.map((project) => (
                <li key={project.index + project.Title}>
                  <div>
                    <div className="projecttitle">{project.Title}</div>
                    <div>
                      <div>{project.Description}</div>
                      {project.Mycontribution ? <div>{project.Mycontribution}</div> : ''}
                      <div className="demorepo">
                        <div>
                          {project.Repo === '#' ? '' : <a href={project.Repo} target="_blank" className="contactlink" rel="noopener noreferrer">Source Code</a>}
                        </div>
                        <div>
                          {project.Demo === '#' ? '' : <a href={project.Demo} target="_blank" className="contactlink" rel="noopener noreferrer">Live Demo</a>}
                        </div>
                      </div>
                      <ul className="tags">
                        {project.Tags.split(',').map((tag, i) => (
                          <li key={tag + i}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {mobile ? (
          <div className="visitDesktop">
            Visit this website in Desktop to try command-line interface version of my portfolio
          </div>
        ) : ''}

        <section>
          <div className="mediumHeader">
            Contact
          </div>

          <p>
            Interested in collaborating or working together, let's discuss via
            {' '}
            <a href="mailto:praveengopi16@gmail.com" className="contactlink" target="_blank" rel="noopener noreferrer">praveengopi16@gmail.com</a>
                        &nbsp; or Looking for a
            {' '}
            <a href="https://praveengopi19.github.io/Online-Resume" target="_blank" className="contactlink" rel="noopener noreferrer">Resume</a>
            .
          </p>

        </section>

        <section>
          <div className="skillli" style={{ justifyContent: 'center' }}>
            <ul>
              <li><a href="https://www.linkedin.com/in/praveengopi19/" target="_blank" rel="noopener noreferrer"><LinkedIn className="sociallinks linkedin" /></a></li>
              <li><a href="https://github.com/praveengopi19" target="_blank" rel="noopener noreferrer"><GitHub className="sociallinks github" /></a></li>
              <li><a href="https://www.behance.net/praveengopi19" target="_blank" rel="noopener noreferrer"><Behance className="sociallinks behance" /></a></li>
              <li><a href="https://www.facebook.com/praveengopi19/" target="_blank" rel="noopener noreferrer"><FaceBook className="sociallinks facebook" /></a></li>
              <li><a href="https://twitter.com/praveengopi_19" target="_blank" rel="noopener noreferrer"><Twitter className="sociallinks twitter" /></a></li>
            </ul>
          </div>
        </section>
        <footer className="footermobile">
          Made With ❤ By Praveen Kumar
          <br />
          © All Rights Reserved
        </footer>
      </div>
    </>
  );
}

export default MobileMain;
