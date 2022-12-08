import React, { useContext } from 'react'
import { ContextoGlobal, ContextoInterface } from './LayOut'

export default function Pai() {

    const Contexto: ContextoInterface = (useContext(ContextoGlobal) as ContextoInterface)

    const btAlteraNomePai = () => {
        Contexto.setFamilia({ ...Contexto.familia, nomePai: 'ATTILIO ALBERTO ZANATTA NETTO' })
    }

    return (
        <>
            <div>O nome do Pai é: {Contexto.familia.nomePai} e sua idade: {Contexto.familia.idadePai}</div>
            <input type="button" onClick={() => btAlteraNomePai()} value="Alterar Nome do Pai" />
        </>
    )
}