import React, { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { EscolaInterface } from '../../Interfaces/EscolaInterfaces';

import { URL_SERVIDOR } from '../../Config/Setup';

import InputText from '../../Componentes/InputText';

import './Escola.css'

const TEMPO_REFRESH_TEMPORARIO = 1000

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

  const btExcluir = (idEscola: number) => {

  }

  const btEditar = (idEscola: number) => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Escola', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola/'.concat(idEscola.toString())), {
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
      }).then(rsEscola => {

        setEscola(rsEscola)
        setLocalState({ acao: 'editando' })

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Escola!!!', tipo: 'erro' })
      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btIncluir = () => {
    setLocalState({ acao: 'incluindo' })
  }

  const btCancelar = () => {
    setLocalState({ acao: 'pesquisando' })
  }

  const btConfirmarInclusao = () => {

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
    }, TEMPO_REFRESH_TEMPORARIO)

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

        // console.log(JSON.stringify(rsEscolas))
        setRsPesquisa(rsEscolas)

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Escola!!!', tipo: 'erro' })
      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }

  return (
    <>
      <h1>Cadastro de Escola</h1>

      {localState.acao == 'pesquisando' &&
        <>
          <InputText label="Pesquisa" type="text" dados={pesquisa} field="nome" setState={setPesquisa} />
          <input type="button" onClick={btPesquisar} value="Pesquisar" />
          <input type="button" onClick={btIncluir} value="Incluir" />
        </>
      }


      {localState.acao != 'pesquisando' &&
        <>
          <InputText label="Nome" type="text" dados={escola} field="nome" setState={setEscola} />
          <InputText label="CNPJ" type="text" dados={escola} field="cnpj" setState={setEscola} />
          <InputText label="e-mail" type="text" dados={escola} field="email" setState={setEscola} />
        </>

      }

      {localState.acao == 'incluindo' &&

        <input type="button" onClick={btConfirmarInclusao} value="Confirmar Inclusão" />

      }

      {localState.acao != 'pesquisando' &&

        <input type="button" onClick={btCancelar} value="Cancelar" />

      }

      {
        localState.acao == 'pesquisando' &&

        <table className='clsTableEscola'>
          <thead>
            <tr>
              <td>Nome</td>
              <td>CNPJ</td>
              <td>e-mail</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>

            {rsPesquisa.map((escola) =>
              <tr key={escola.idEscola}>
                <td>{escola.nome}</td>
                <td>{escola.cnpj}</td>
                <td>{escola.email}</td>
                <td>
                  <input type="button" value="Editar" onClick={() => btEditar(escola.idEscola)} />
                  <input type="button" value="Excluir" onClick={() => btExcluir(escola.idEscola)} />
                </td>
              </tr>
            )}

          </tbody>

        </table>

      }

    </>
  );

}
