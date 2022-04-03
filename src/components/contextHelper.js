const { createContext, useContext } = require('react');

const DispatchContext = createContext();

const useDispatchContext = () => useContext(DispatchContext);

export { DispatchContext, useDispatchContext };
