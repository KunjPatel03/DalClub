// @Author: Rahul Kherajani
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
const StateContext = createContext();

const State = (props) => {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('cartList') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  return (
    <StateContext.Provider value={{ cartList, setCartList }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { State, StateContext };
