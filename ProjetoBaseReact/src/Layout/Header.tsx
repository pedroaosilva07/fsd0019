import React from 'react';
import { GlobalStateInterface } from '../Interfaces/InterfacesGerais';

export default function Header(props: { globalState: GlobalStateInterface }) {

  return (
    <><h1>Conteúdo do Header: {props.globalState.layOut.tituloBarra}</h1></>
  );

}
