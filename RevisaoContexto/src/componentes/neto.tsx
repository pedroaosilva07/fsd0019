import React, { useContext } from 'react'
import { ContextoGlobal, ContextoInterface } from './LayOut'

export default function Neto() {

    const Contexto: ContextoInterface = (useContext(ContextoGlobal) as ContextoInterface)

    return (
        <>
            <div>O nome do Neto é: {Contexto.familia.nomeNeto} e sua idade é: {Contexto.familia.idadeNeto}</div>
            <div>{Contexto.familia.nomeNeto} é filha de {Contexto.familia.nomeFilho} que tem {Contexto.familia.idadeFilho} anos</div>
            <div>{Contexto.familia.nomeFilho} é filho de {Contexto.familia.nomePai} que tem {Contexto.familia.idadePai} anos</div>
        </>
    )
}