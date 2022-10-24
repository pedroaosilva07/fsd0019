import React, { useState } from 'react';
import InputText from './componentes/InputText';

export interface rsClienteInterface {
  nome: string
  endereco: string
  empresa: string
}

export default function App({ empresa, nome }: { empresa: string, nome: string }) {

  const [rsCliente, setCliente] = useState<rsClienteInterface>({
    nome: nome,
    endereco: '',
    empresa: empresa
  })

  return (
    <>
      <h1>Empresa {rsCliente.empresa}</h1>
      <h2>Nome {rsCliente.nome}</h2>
      <h2>Endereço {rsCliente.endereco}</h2>

      <InputText tipo="text"
        id="txtNome"
        placeholder="Nome"
        setState={setCliente}
        dados={rsCliente}
        campo="nome"
        label="Nome:" />

      <InputText tipo="text"
        id="txtEmpresa"
        placeholder="Empresa"
        setState={setCliente}
        dados={rsCliente}
        campo="empresa"
        label="Empresa:" />

      <InputText tipo="text"
        id="txtEndereco"
        placeholder="Endereco"
        setState={setCliente}
        dados={rsCliente}
        campo="endereco"
        label="Endereço:" />
    </>
  );
}
