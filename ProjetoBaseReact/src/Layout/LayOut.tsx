import React from 'react';
import { Outlet } from 'react-router-dom';
import { ContextoGlobal } from '../Contextos/ContextoGlobal';
import useLayoutState from '../GlobalStates/LayoutState';
import useLoginState from '../GlobalStates/LoginState';
import Footer from './Footer';
import Header from './Header';

export default function LayOut() {

  const { loginState, setLoginState } = useLoginState()
  const { layoutState, setLayoutState } = useLayoutState()

  return (
    <>
      <ContextoGlobal.Provider value={{
        loginState: loginState,
        setLoginState: setLoginState,
        layoutState: layoutState,
        setLayoutState: setLayoutState
      }}>
        <Header />
        <Outlet />
        <Footer />
      </ContextoGlobal.Provider>
    </>
  );

}
