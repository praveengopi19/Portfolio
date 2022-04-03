import { useReducer } from 'react';

// main
import MainInputLs from './Main/MainInputLs';

// Projects
import ProjectInputContent from './Projects/ProjectInputContent';

// About me
import AboutMeContent from './AboutMe/AboutMeContent';

// Skills
import SkillsContent from './Skills/SkillsContent';

// Links
import LinkContent from './Links/LinkContent';

// Contact
import ContactContent from './contact/ContactConent';

// Errors
import InAppropriate from './Error/InAppropriate';
import LsError from './Error/LsError';
import NoCommand from './Error/NoCommand';
import NoDirError from './Error/NoDirError';

import InputForm from './Form';

import { cmdReducer } from '../../useReducerUtils/Reducers/cmdPromptReducer';
import { DispatchContext } from '../contextHelper';

const inputFormKeywordMap = {
  mainInput: '',
  projectInput: 'projects',
  skillsInput: 'skills',
  linkInput: 'links',
  contactInput: 'contact',
  aboutInput: 'aboutme',
};

const componentMap = {
  mainInputls: MainInputLs,
  projectInputContent: ProjectInputContent,
  aboutInputContent: AboutMeContent,
  skillsContent: SkillsContent,
  linkInputContent: LinkContent,
  contactInputContent: ContactContent,
  lserror: LsError,
  inappropriate: InAppropriate,
  nocommand: NoCommand,
  nodir: NoDirError,
};

function CommandLine() {
  const [state, dispatch] = useReducer(cmdReducer, [{ name: 'mainInput', Date: Date.now() }]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <div className="command">
        { state.map((comp) => {
          const ComponentFinder = componentMap[comp.name];

          if (ComponentFinder) {
            return <ComponentFinder key={comp.Date} />;
          }

          return <InputForm key={comp.Date} direcotry={inputFormKeywordMap[comp.name]} />;
        })}
      </div>
    </DispatchContext.Provider>
  );
}

export default CommandLine;
