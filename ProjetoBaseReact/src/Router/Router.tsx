import React from 'react'

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErroAplicacao from '../Layout/ErroAplicacao';
import ErroNavegacao from '../Layout/ErroNavegacao';
import Login from '../Login/Login';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErroAplicacao />,
    children: [{
      path: "/login",
      element: <Login />,
      errorElement: <ErroAplicacao />
    }]
  },
  {
    path: "*",
    element: <ErroNavegacao />
  }

  /*
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErroAplicacao />,
    children: [
      {
        path: "cadastrocliente/:idCliente",
        element: <CadastroCliente />,
        errorElement: <ErroAplicacao />
      },
      {
        path: "cadastrofornecedor",
        element: <CadastroFornecedor />,
        errorElement: <ErroAplicacao />
      }
    ],
  },
  {
    path: "*",
    element: <ErroNavegacao />
  }
  */
]);