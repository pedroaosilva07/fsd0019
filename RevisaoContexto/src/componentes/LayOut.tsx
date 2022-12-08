import React, { useState, createContext } from 'react'

import Pai from './pai';
import Filho from './filho';
import Neto from './neto';
import useFamilia, { FamiliaInterface } from './familia';

export interface ContextoInterface {
    familia: FamiliaInterface
    setFamilia: React.Dispatch<React.SetStateAction<FamiliaInterface>>
}

export const ContextoGlobal = createContext<ContextoInterface | null>(null)

export default function LayOut() {

    // const { familia, setFamilia } = useFamilia()

    const [familia, setFamilia] = useState<FamiliaInterface>({
        nomePai: 'Attilio',
        idadePai: 80,
        nomeFilho: 'Zanatta',
        idadeFilho: 48,
        nomeNeto: 'Gabriela',
        idadeNeto: 22
    })

    return (
        <>
            <ContextoGlobal.Provider value={{ familia: familia, setFamilia: setFamilia }}>
                <Pai ></Pai>
                <Filho ></Filho>
                <Neto ></Neto>
            </ContextoGlobal.Provider>
        </>
    )

}