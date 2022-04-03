import { COMMAND_RENDER, CLEAR_TERMINAL } from './actionTypes';

const commandCheck = ['mainInput'];

export var history = [];

export const handleInput = (input) => {
  input = input.trim();
  // console.log(input);
  let input2 = '';
  switch (input) {
    case 'ls':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'mainInputls';
        input2 = 'mainInput';
        // console.log(input);
        // commandCheck.push(input2);
      } else {
        input = 'lserror';
        input2 = commandCheck[commandCheck.length - 1];
      }
      break;

    case 'cd aboutme':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'aboutInput';
        // console.log(input);
        commandCheck.push(input);
        return ({
          type: COMMAND_RENDER,
          payload: [{
            name: input,
            Date: Date.now(),
          }],
        });
      }

      input = 'nodir';
      input2 = commandCheck[commandCheck.length - 1];

      break;

    case 'cd projects':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'projectInput';
        // console.log(input);
        commandCheck.push(input);
        return ({
          type: COMMAND_RENDER,
          payload: [{
            name: input,
            Date: Date.now(),
          }],
        });
      }

      input = 'nodir';
      input2 = commandCheck[commandCheck.length - 1];

      break;

    case 'cd skills':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'skillsInput';
        // console.log(input);
        commandCheck.push(input);
        return ({
          type: COMMAND_RENDER,
          payload: [{
            name: input,
            Date: Date.now(),
          }],
        });
      }

      input = 'nodir';
      input2 = commandCheck[commandCheck.length - 1];

      break;

    case 'cd links':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'linkInput';
        // console.log(input);
        commandCheck.push(input);
        return ({
          type: COMMAND_RENDER,
          payload: [{
            name: input,
            Date: Date.now(),
          }],
        });
      }

      input = 'nodir';
      input2 = commandCheck[commandCheck.length - 1];

      break;

    case 'cd contact':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'contactInput';
        // console.log(input);
        commandCheck.push(input);
        return ({
          type: COMMAND_RENDER,
          payload: [{
            name: input,
            Date: Date.now(),
          }],
        });
      }

      input = 'nodir';
      input2 = commandCheck[commandCheck.length - 1];

      break;

    case 'cd ..':
    case 'cd':
    case 'cd ~':
      history.push(input);
      input = 'mainInput';
      // console.log(input);
      if (commandCheck[commandCheck.length - 1] !== 'mainInput') commandCheck.pop();
      return ({
        type: COMMAND_RENDER,
        payload: [{
          name: input,
          Date: Date.now(),
        }],
      });

    case 'display':
      history.push(input);
      if (commandCheck[commandCheck.length - 1] === 'mainInput') {
        input = 'inappropriate';
        input2 = 'mainInput';
        // console.log(input);
        // commandCheck.push(input2);
        // console.log(commandCheck);
      } else if (commandCheck[commandCheck.length - 1] === 'aboutInput') {
        input = 'aboutInputContent';
        input2 = commandCheck[commandCheck.length - 1];
      } else if (commandCheck[commandCheck.length - 1] === 'projectInput') {
        input = 'projectInputContent';
        input2 = commandCheck[commandCheck.length - 1];
      } else if (commandCheck[commandCheck.length - 1] === 'skillsInput') {
        input = 'skillsContent';
        input2 = commandCheck[commandCheck.length - 1];
      } else if (commandCheck[commandCheck.length - 1] === 'linkInput') {
        input = 'linkInputContent';
        input2 = commandCheck[commandCheck.length - 1];
      } else if (commandCheck[commandCheck.length - 1] === 'contactInput') {
        input = 'contactInputContent';
        input2 = commandCheck[commandCheck.length - 1];
      }

      break;

    case 'clear':
      history.push(input);
      return ({
        type: CLEAR_TERMINAL,
        payload: [{
          name: commandCheck[commandCheck.length - 1],
          Date: Date.now(),
        }],
      });
    case '':
      input = commandCheck[commandCheck.length - 1];
      // console.log(input);
      return ({
        type: COMMAND_RENDER,
        payload: [{
          name: input,
          Date: Date.now(),
        }],
      });

    default:
      history.push(input);
      input = 'nocommand';
      input2 = commandCheck[commandCheck.length - 1];
  }
  // console.log(input, input2);
  return ({
    type: COMMAND_RENDER,
    payload: [{
      name: input,
      Date: Date.now(),
    }, {
      name: input2,
      Date: Date.now() + 1,
    },
    ],
  });
};
