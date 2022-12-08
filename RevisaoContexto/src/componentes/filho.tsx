import React, { useContext } from 'react'
import { ContextoGlobal, ContextoInterface } from './LayOut'

export default function Filho() {

    const Contexto: ContextoInterface = (useContext(ContextoGlobal) as ContextoInterface)

    return (
        <>
            <div>O nome do Filho é: {Contexto.familia.nomeFilho} e sua idade é: {Contexto.familia.idadeFilho}</div>
        </>
    )
}