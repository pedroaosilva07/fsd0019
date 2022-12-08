import React, { useState } from 'react'

export interface FamiliaInterface {
    nomePai: string
    idadePai: number
    nomeFilho: string
    idadeFilho: number
    nomeNeto: string
    idadeNeto: number
}

export default function useFamilia() {
    const [familia, setFamilia] = useState<FamiliaInterface>({
        nomePai: 'Attilio',
        idadePai: 80,
        nomeFilho: 'Zanatta',
        idadeFilho: 48,
        nomeNeto: 'Gabriela',
        idadeNeto: 22
    })

    return { familia, setFamilia }
}