import { COMMAND_RENDER, CLEAR_TERMINAL } from './actionTypes';

const commandCheck = ['mainInput'];

const history = [];

const cdDirecotryTagMap = {
  'cd aboutme': 'aboutInput',
  'cd projects': 'projectInput',
  'cd skills': 'skillsInput',
  'cd links': 'linkInput',
  'cd contact': 'contactInput',
};

const displayTagMap = {
  mainInput: 'inappropriate',
  aboutInput: 'aboutInputContent',
  projectInput: 'projectInputContent',
  skillsInput: 'skillsContent',
  linkInput: 'linkInputContent',
  contactInput: 'contactInputContent',
};

const isLastCommandMainInput = () => commandCheck.at(-1) === 'mainInput';

const getPayload = (...args) => args.map((input, i) => ({ name: input, Date: Date.now() + i }));

const getActionObject = (type, input = commandCheck.at(-1)) => ({
  type,
  payload: getPayload(...(Array.isArray(input) ? input : [input])),
});

const handleLs = () => {
  if (isLastCommandMainInput()) {
    return getActionObject(COMMAND_RENDER, ['mainInputls', 'mainInput']);
  }

  return getActionObject(COMMAND_RENDER, ['lserror', commandCheck.at(-1)]);
};

const handleCdDirectory = (input) => {
  const inputTag = cdDirecotryTagMap[input];

  if (isLastCommandMainInput()) {
    commandCheck.push(inputTag);
    return getActionObject(COMMAND_RENDER, inputTag);
  }

  return getActionObject(COMMAND_RENDER, ['nodir', commandCheck.at(-1)]);
};

const handleCd = () => {
  if (!isLastCommandMainInput()) {
    commandCheck.pop();
  }
  return getActionObject(COMMAND_RENDER, 'mainInput');
};

const handleClear = () => getActionObject(CLEAR_TERMINAL);
const handleNoInput = () => getActionObject(COMMAND_RENDER);
const handleInvalidCommand = () => getActionObject(COMMAND_RENDER, ['nocommand', commandCheck.at(-1)]);

const handleDisplay = () => {
  const content = displayTagMap[commandCheck.at(-1)];

  return getActionObject(COMMAND_RENDER, [content, commandCheck.at(-1)]);
};

const functionMap = {
  ls: handleLs,
  'cd aboutme': handleCdDirectory,
  'cd projects': handleCdDirectory,
  'cd skills': handleCdDirectory,
  'cd links': handleCdDirectory,
  'cd contact': handleCdDirectory,
  cd: handleCd,
  'cd ..': handleCd,
  'cd ~': handleCd,
  display: handleDisplay,
  clear: handleClear,
  '': handleNoInput,
};

const handleInput = (rawInput) => {
  const input = rawInput.trim();
  history.push(input);
  const utilFunction = functionMap[input];
  return utilFunction ? utilFunction(input) : handleInvalidCommand();
};

export { history, handleInput };
