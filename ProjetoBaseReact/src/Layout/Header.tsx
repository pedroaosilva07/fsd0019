import React from 'react';
import { GlobalStateInterface } from '../Interfaces/InterfacesGerais';

export default function Header(props: { globalState: GlobalStateInterface }) {

  return (
    <><h1>{props.globalState.layOut.tituloBarra}</h1></>
  );

}
