import React, { createContext } from 'react'
import { LayoutStateInterface } from '../GlobalStates/LayoutState'
import { LoginStateInterface } from '../GlobalStates/LoginState'

export interface ContextoGlobalInterface {
  loginState: LoginStateInterface,
  setLoginState: React.Dispatch<React.SetStateAction<LoginStateInterface>>
  layoutState: LayoutStateInterface,
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutStateInterface>>
}

export const ContextoGlobal = createContext<ContextoGlobalInterface | null>(null)
