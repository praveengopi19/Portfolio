import { SKILLS } from '../../constants';

function SkillsContent() {
  return (
    <div style={{ listStyle: 'none' }}>
      {SKILLS.map((skill) => <li>{skill}</li>)}
    </div>
  );
}

export default SkillsContent;
