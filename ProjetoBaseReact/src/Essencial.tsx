import React, { useState } from 'react'
import CadastroCliente from './CadastroCliente'

export default function Essencial() {

  let [nome, setNome] = useState('Fleek Cursos')

  // let nome: string = 'Fleek Cursos'

  const alterarNome = (qualNome: string) => {
    setNome(qualNome)
    console.log('Dentro de Alterar Nome....', nome)
  }

  return (
    <div>
      <b>Código HTML dentro de Essencial</b>
      <p>
        Variável Nome Fora de Children: {nome}
      </p>
      <CadastroCliente endereco="Av. 21 de Abril" alterarNome={alterarNome}>

        <>
          <p>
            Variável Nome dentro de Children: {nome}
          </p>
        </>

      </CadastroCliente>
    </div>
  )

}