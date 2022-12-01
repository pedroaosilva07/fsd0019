import React, { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { EscolaInterface } from '../../Interfaces/EscolaInterfaces';

import { URL_SERVIDOR } from '../../Config/Setup';

import InputText from '../../Componentes/InputText';

interface LocalStateInterface {
  acao: 'incluindo' | 'excluindo' | 'pesquisando' | 'editando'
}

interface PesquisaInterface {
  nome: string
}

export default function Escola() {

  const [rsPesquisa, setRsPesquisa] = useState<Array<EscolaInterface>>([])

  const globalContext = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  const [localState, setLocalState] = useState({ acao: 'pesquisando' })

  const [escola, setEscola] = useState<EscolaInterface>({
    cnpj: '',
    email: '',
    idEscola: 0,
    nome: ''
  })

  const [pesquisa, setPesquisa] = useState<PesquisaInterface>({ nome: '' })

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

  const btPesquisar = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Escola', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola'), {
        // body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status == 200) {
          globalContext.setMensagemState({ exibir: false, mensagem: '', tipo: 'aviso' })

          // Envio somente os dados para o próximo Then....
          return rs.json()

        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Pesquisar Escola!!!', tipo: 'erro' })
        }
      }).then(rsEscolas => {

        setRsPesquisa(rsEscolas)

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Escola!!!', tipo: 'erro' })
      })

    }, 2000)

  }

  return (
    <>
      <h1>Cadastro de Escola</h1>

      <>
        <InputText label="Pesquisa" type="text" dados={pesquisa} field="nome" setState={setPesquisa} />
        <input type="button" onClick={btPesquisar} value="Pesquisar" />
      </>


      {localState.acao != 'pesquisando' &&
        <>
          <InputText label="Nome" type="text" dados={escola} field="nome" setState={setEscola} />
          <InputText label="CNPJ" type="text" dados={escola} field="cnpj" setState={setEscola} />
          <InputText label="e-mail" type="text" dados={escola} field="email" setState={setEscola} />
        </>
      }

      {localState.acao == 'incluindo' &&

        <input type="button" onClick={btIncluir} value="Incluir" />

      }

      {JSON.stringify(rsPesquisa)}

    </>
  );

}
