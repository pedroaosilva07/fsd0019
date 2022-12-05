import React, { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { EscolaInterface } from '../../Interfaces/EscolaInterfaces';

import { URL_SERVIDOR } from '../../Config/Setup';

import InputText from '../../Componentes/InputText';

import './Escola.css'

const TEMPO_PADRAO_DELAY: number = 500

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

  const pesquisarEscola = (idEscola: number): Promise<EscolaInterface> => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Dados da Escola', tipo: 'processando' })

    return new Promise((resolve, _reject) => {

      setTimeout(() => {

        fetch(URL_SERVIDOR.concat('/escola/'.concat(idEscola.toString())))
          .then(resposta => {
            globalContext.clearMessage()
            resolve(resposta.json())
          })
      }, TEMPO_PADRAO_DELAY)

    })
  }

  const btNovaEscola = () => {
    setLocalState({ acao: 'incluindo' })
  }

  const btCancelar = () => {
    setLocalState({ acao: 'pesquisando' })
  }

  const btEditarExcluir = (idEscola: number, acao: string) => {

    pesquisarEscola(idEscola).then(rsEscola => {
      setEscola(rsEscola)
      setLocalState({ acao: acao })
    })
  }

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
    }, TEMPO_PADRAO_DELAY)

  }

  const btConfirmarEdicao = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Editando Escola', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/escola/'.concat(escola.idEscola.toString())), {
        body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH'
      }).then(rs => {
        if (rs.status == 200) {
          setEscola({ nome: '', cnpj: '', email: '', idEscola: 0 })
          globalContext.setMensagemState({ exibir: true, mensagem: 'Escola Editada com Sucesso', tipo: 'aviso' })
          aposAtualizarDados()
        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Editar Escola!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível Editar Escola!!!', tipo: 'erro' })
      })
    }, TEMPO_PADRAO_DELAY)

  }

  const btConfirmarExclusao = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Excluindo Escola', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/escola/'.concat(escola.idEscola.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(rs => {
        if (rs.status == 200) {
          setEscola({ nome: '', cnpj: '', email: '', idEscola: 0 })
          globalContext.setMensagemState({ exibir: true, mensagem: 'Escola Excluída com Sucesso', tipo: 'aviso' })
          aposAtualizarDados()
        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Excluir Escola!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível Excluir Escola!!!', tipo: 'erro' })
      })
    }, TEMPO_PADRAO_DELAY)

  }

  const aposAtualizarDados = () => {
    setLocalState({ acao: 'pesquisando' })
    btPesquisar()
  }

  const btPesquisar = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Escola', tipo: 'processando' })

    const urlPesquisa: string = URL_SERVIDOR.concat('/escola?nome_like=').concat(pesquisa.nome)

    setTimeout(() => {

      fetch(urlPesquisa, {
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
      }).then((rsEscolas: Array<EscolaInterface>) => {

        setRsPesquisa(rsEscolas)

      }).catch((e) => {
        console.log(e)
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Escola!!!', tipo: 'erro' })
      })

    }, TEMPO_PADRAO_DELAY)

  }

  const listRsPesquisa = !rsPesquisa ? <></> : rsPesquisa.map((escola) =>
    <tr key={escola.idEscola}>
      <td>{escola.nome}</td>
      <td>{escola.cnpj}</td>
      <td>{escola.email}</td>
      <td><input type="button" onClick={(e) => btEditarExcluir(escola.idEscola, 'editando')} value="Editar" /></td>
      <td><input type="button" onClick={(e) => btEditarExcluir(escola.idEscola, 'excluindo')} value="Excluir" /></td>
    </tr>
  )

  return (
    <>
      <h1>Cadastro de Escola</h1>

      {

        localState.acao == 'pesquisando' ?

          <>
            <p>
              <InputText autofocus id="txtPesquisa" label="Pesquisa" type="text" dados={pesquisa} field="nome" setState={setPesquisa} />
              <input type="button" onClick={btPesquisar} value="Pesquisar" />
            </p>

            <input type="button" onClick={btNovaEscola} value="+" />
          </>

          : null

      }

      {
        localState.acao != 'pesquisando' ?
          <>
            <InputText disabled={localState.acao == 'excluindo'} autofocus id="txtNome" label="Nome" type="text" dados={escola} field="nome" setState={setEscola} />
            <InputText disabled={localState.acao == 'excluindo'} id="txtCNPJ" label="CNPJ" type="text" dados={escola} field="cnpj" setState={setEscola} />
            <InputText disabled={localState.acao == 'excluindo'} id="txtEmail" label="e-mail" type="text" dados={escola} field="email" setState={setEscola} />
            <input type="button" onClick={btCancelar} value="Cancelar" />
          </>
          : null
      }

      {
        localState.acao == 'excluindo' ?

          <input type="button" onClick={btConfirmarExclusao} value="Confirmar Exclusao" />
          : null
      }

      {
        localState.acao == 'editando' ?

          <input type="button" onClick={btConfirmarEdicao} value="Confirmar Edição" />
          : null
      }

      {
        localState.acao == 'incluindo' ?

          <input type="button" onClick={btIncluir} value="Confirmar Inclusão" />
          : null
      }

      {
        localState.acao == 'pesquisando' ?

          <>
            <table>
              <thead>
                <tr>
                  <td>Nome</td>
                  <td>CNPJ</td>
                  <td>e-mail</td>
                  <td colSpan={2}>Ações</td>
                </tr>
              </thead>
              <tbody>
                {listRsPesquisa}
              </tbody>
            </table>
          </>

          : null
      }


    </>
  );

}
