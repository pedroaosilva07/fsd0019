import React, { useState } from 'react'
import useLayoutState, { LayoutStateInterface } from './LayoutState'
import useLoginState, { LoginStateInterface } from './LoginState'

export interface GlobalStateInterface {
  loginState: LoginStateInterface
  setLoginState: React.Dispatch<React.SetStateAction<LoginStateInterface>>
  layoutState: LayoutStateInterface
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutStateInterface>>
}

export default function useGlobalState() {

  const { loginState, setLoginState } = useLoginState()
  const { layoutState, setLayoutState } = useLayoutState()

  const [globalState, setGlobalState] = useState<GlobalStateInterface>({
    loginState: loginState,
    setLoginState: setLoginState,
    layoutState: layoutState,
    setLayoutState: setLayoutState
  })

  return { globalState, setGlobalState }

}