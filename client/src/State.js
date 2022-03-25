import React, { createContext, useState } from 'react';
const StateContext = createContext();

const State = (props) => {
  const [cartList, setCartList] = useState([]);
  return (
    <StateContext.Provider value={{ cartList, setCartList }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { State, StateContext };
