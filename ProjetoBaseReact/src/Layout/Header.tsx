import React, { useContext } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';

export default function Header() {

  const globalContext = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  return (
    <>
      <h1>Header.tsx - Campo Nome do LoginState {globalContext.loginState.nome}</h1>
    </>
  );

}
