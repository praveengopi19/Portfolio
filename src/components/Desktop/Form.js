import { useState } from 'react';
import { handleInput, history } from '../../Redux/Actions/actionCreator';

import { useDispatchContext } from '../contextHelper';

function Form({ direcotry }) {
  const [input, setInput] = useState('');
  const [section, setSection] = useState(false);
  const [indexofhistory, setIndexOfHistory] = useState(history.length);
  const [optionalInput, setOptionalInput] = useState('');

  const dispatch = useDispatchContext();

  const handleSubmit = (e) => {
    setSection(true);
    dispatch(handleInput(input));
    e.preventDefault();
  };

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    setOptionalInput(e.target.value);
  };

  const upkeyEvent = (e) => {
    if (e.keyCode == '38') /* eslint eqeqeq: 0 */ {
      // up arrow
      if (indexofhistory > 0 && history.length >= indexofhistory) {
        setInput(history[indexofhistory - 1]);
        setIndexOfHistory(indexofhistory - 1);
      }
    } else if (e.keyCode == '40') /* eslint eqeqeq: 0 */ {
      // down arrow
      if (indexofhistory < history.length - 1) {
        setInput(history[indexofhistory + 1]);
        setIndexOfHistory(indexofhistory + 1);
      } else if (optionalInput !== input) {
        setInput(optionalInput);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="listinput">
          <div className="parent">Praveen-Kumar-G</div>
          <div style={{ display: 'inline' }}>:</div>
          {direcotry ? (
            <div className="directory">
              ~/
              {direcotry}
            </div>
          ) : ''}
          <div style={{ display: 'inline' }}>$</div>
        </label>
        <input value={input} onChange={handleChangeInput} disabled={section} autoFocus spellCheck="false" onKeyDown={upkeyEvent} />

      </form>
    </div>

  );
}

export default Form;
