import React from 'react';
import CommandLine from './CommandLine';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/pk.svg';

function DesktopMain(props) {
    return (
        <React.Fragment>
            <div className="App-header" >
                <nav className="start" >
                    <Link to="/" className="linkdesktop"><Logo style={{ height: "42px", width: "42px", paddingTop: "5px", fill: "#fff" }} /></Link>
                </nav>
                <section className="commandLine">
                    <header className="header">
                        <div className="reddot">
                        </div>
                        <div className="yellowdot">
                        </div>
                        <div className="greendot">
                        </div>
                    </header>
                    <CommandLine />
                    <footer className="footer">
                        <div>ls - list menu </div>
                        <div className="footerspacing">cd [DirName] - get into directory </div>
                        <div className="footerspacing">cd .. - go back </div>
                        <div className="footerspacing">clear - clear terminal </div>
                        <div className="footerspacing">display - display content of the page </div>
                        <div >key up and key down - switch between command history </div>
                    </footer>
                </section>
                <footer className="end">
                    <p><Link to="/" className="link">Simplified version of my portfolio</Link></p>
                </footer>
            </div>

        </React.Fragment >);
}

export default DesktopMain;