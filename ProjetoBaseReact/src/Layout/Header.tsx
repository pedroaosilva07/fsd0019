import React, { useContext } from 'react';
import { ContextoGlobal } from '../Contextos/ContextoGlobal';
import useGlobalState from '../States/GlobalState';

export default function Header() {

  const globalContext = useContext(ContextoGlobal)

  // const { globalState, setGlobalState } = useGlobalState()

  return (
    <>
      <h1>Header.tsx - Campo Nome do LoginState {globalContext.globalState.loginState.nome}</h1>
    </>
  );

}
