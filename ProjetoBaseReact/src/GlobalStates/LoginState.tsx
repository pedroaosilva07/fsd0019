import React, { useState } from 'react'

export interface LoginStateInterface {
  nome: string
  logado: boolean
  token: string
}

export default function useLoginState() {

  const [loginState, setLoginState] = useState<LoginStateInterface>({
    logado: false,
    nome: 'Nome Antes do Login',
    token: ''
  })

  return { loginState, setLoginState }

}