import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStateInterface } from './Interfaces/InterfacesGerais';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

export default function App() {

  const [globalState, setGlobalState] = useState<GlobalStateInterface>({
    logado: false,
    token: '',

    layOut: {
      tituloBarra: ''
    },

    usuario: {
      nome: '',
    }

  })

  return (
    <>
      <Header globalState={globalState} />
      <Outlet />
      <Footer />
    </>
  );

}
