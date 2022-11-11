import React, { ReactElement, useContext } from 'react'

import './CadastroCliente.css'

interface PropsInterface {
  alterarNome: (nome: string) => void
  children: ReactElement<any, any>
  endereco: string
}

export default function CadastroCliente({ children, endereco, alterarNome }: PropsInterface) {

  // alterarNome()

  return (

    <div className="borda">
      Cadastro de Cliente
      <p>
        {endereco}
      </p>

      <p>Children de CadastroCliente</p>

      {children}

      <input type="button" value="Alterar Nome" onClick={() => alterarNome('Escola de Programação')} />

    </div>


  )
}