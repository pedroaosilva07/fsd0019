import React, { useState } from 'react'

import './InputText.css'

export default function InputText(props: {
  id: string,
  tipo: string,
  placeholder: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  dados: any,
  campo: string,
  label: string
}) {

  const [validacao, setValidacao] = useState<string>('')

  const validarNaoVazio = (evento: any) => {
    if (evento.target.value.length == 0) {
      setValidacao('Campo Não Pode Ser Vazio!!!!')
    } else {
      setValidacao('')
    }
  }

  return (
    <>
      <label>{props.label}</label>
      <input type={props.tipo}
        id={props.id}
        placeholder={props.placeholder}
        onBlur={validarNaoVazio}
        onChange={(evento) => {
          props.setState({
            ...props.dados,
            [props.campo]: evento.target.value
          })
        }} />
      <span>{validacao}</span>
    </>
  )
}