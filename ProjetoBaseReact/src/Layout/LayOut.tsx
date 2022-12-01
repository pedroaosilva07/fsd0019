import React from 'react';

import { Outlet } from 'react-router-dom';
import Mensagem from '../Componentes/Mensagem';

import { ContextoGlobal } from '../Contextos/ContextoGlobal';
import useLayoutState from '../GlobalStates/LayoutState';
import useLoginState from '../GlobalStates/LoginState';
import useMensagemState from '../GlobalStates/MensagemState';

import Login from '../Login/Login';
import Footer from './Footer';
import Header from './Header';

export default function LayOut() {

  const { loginState, setLoginState } = useLoginState()
  const { layoutState, setLayoutState } = useLayoutState()
  const { mensagemState, setMensagemState } = useMensagemState()

  return (
    <>
      <ContextoGlobal.Provider value={{
        loginState: loginState,
        setLoginState: setLoginState,
        layoutState: layoutState,
        setLayoutState: setLayoutState,
        mensagemState: mensagemState,
        setMensagemState: setMensagemState
      }}>
        <>
          {loginState.logado ?
            <>
              <Mensagem />
              <Header />
              <Outlet />
              <Footer />
            </> :
            <>
              <Login />
            </>
          }

        </>

      </ContextoGlobal.Provider>
    </>
  );

}
