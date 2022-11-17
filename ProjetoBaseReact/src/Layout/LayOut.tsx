import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ContextoGlobal } from '../Contextos/ContextoGlobal';
import useGlobalState from '../States/GlobalState';
import Footer from './Footer';
import Header from './Header';

export default function LayOut() {

  const { globalState, setGlobalState } = useGlobalState()

  return (
    <>
    <ContextoGlobal.Provider value={{
        globalState: globalState,
        setGlobalState: setGlobalState
      }}>

      <h1>LayOut.tsx</h1>
      <Header />
      <p>Antes do Outlet</p>
      <Outlet />
      <p>Depois do Outlet</p>
      <Footer />
      </ContextoGlobal.Provider>
    </>
  );

}
