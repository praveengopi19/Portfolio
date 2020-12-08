import React, { Component } from 'react';

//main
import MainInput from './Main/MainInput';
import MainInputLs from './Main/MainInputLs';

//Projects
import ProjectsInput from './Projects/ProjectsInput';
import ProjectInputContent from './Projects/ProjectInputContent';

//About me
import AboutMeInput from './AboutMe/AboutMeInput';
import AboutMeContent from './AboutMe/AboutMeContent';

//Skills
import SkillsInput from './Skills/SkillsInput';
import SkillsContent from './Skills/SkillsContent';

//Links
import LinkInput from './Links/LinkInput';
import LinkContent from './Links/LinkContent';

//Contact
import ContactInput from './contact/ContactInput';
import ContactContent from './contact/ContactConent';

//Errors
import InAppropriate from './Error/InAppropriate';
import LsError from './Error/LsError';
import NoCommand from './Error/NoCommand';
import NoDirError from './Error/NoDirError';

import { connect } from 'react-redux';

class CommandLine extends Component {


    render() {



        const componentMap = {
            mainInput: MainInput,
            mainInputls: MainInputLs,
            projectInputContent: ProjectInputContent,
            projectInput: ProjectsInput,
            aboutInput: AboutMeInput,
            aboutInputContent: AboutMeContent,
            skillsInput: SkillsInput,
            skillsContent: SkillsContent,
            linkInput: LinkInput,
            linkInputContent: LinkContent,
            contactInput: ContactInput,
            contactInputContent: ContactContent,
            lserror: LsError,
            inappropriate: InAppropriate,
            nocommand: NoCommand,
            nodir: NoDirError
        };

        const menu = () => this.props.promp.map((comp) => {
            const ComponentFinder = componentMap[comp.name];
            // console.log(comp.name, comp.Date);
            return <ComponentFinder key={comp.Date} />;
        });


        //console.log(this.props.prompt.name);
        return (
            <div className="command">
                {menu()}

            </div>
        );
    }


}

function mapStateToPros(state) {
    //console.log(state.prompt);
    return ({ promp: state.prompt });
}



export default connect(mapStateToPros, null)(CommandLine);