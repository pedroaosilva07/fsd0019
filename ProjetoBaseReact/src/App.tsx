import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStateInterface } from './Interfaces/InterfacesGerais';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

export const globalContexto = React.createContext({})

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
      <globalContexto.Provider value={{
        globalSate: globalState,
        setGlobalState: setGlobalState
      }}>
        <Header globalState={globalState} />
        <p>Antes do Outlet</p>
        <Outlet />
        <p>Depois do Outlet</p>
        <Footer globalState={globalState} />
      </globalContexto.Provider>
    </>
  );

}
