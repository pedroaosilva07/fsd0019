import React, { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { EscolaInterface } from '../../Interfaces/EscolaInterfaces';

import { URL_SERVIDOR } from '../../Config/Setup';

import InputText from '../../Componentes/InputText';

export default function Escola() {

  const globalContext = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  const [escola, setEscola] = useState<EscolaInterface>({
    cnpj: '',
    email: '',
    idEscola: 0,
    nome: ''
  })

  const btIncluir = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Incluindo Escola', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/escola'), {
        body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }).then(rs => {
        if (rs.status == 201) {
          setEscola({ nome: '', cnpj: '', email: '', idEscola: 0 })
          globalContext.setMensagemState({ exibir: true, mensagem: 'Escola Cadastrada com Sucesso', tipo: 'aviso' })
        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Incluir Escola!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível incluir Escola!!!', tipo: 'erro' })
      })
    }, 2000)

  }

  return (
    <>
      <h1>Cadastro de Escola</h1>

      <InputText label="Nome" type="text" dados={escola} field="nome" setState={setEscola} />
      <InputText label="CNPJ" type="text" dados={escola} field="cnpj" setState={setEscola} />
      <InputText label="e-mail" type="text" dados={escola} field="email" setState={setEscola} />

      <input type="button" onClick={btIncluir} value="Incluir" />

    </>
  );

}
