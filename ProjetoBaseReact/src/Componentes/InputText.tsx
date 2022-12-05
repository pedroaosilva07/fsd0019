import { autocompleteClasses } from '@mui/material';
import React, { useEffect, useRef } from 'react';

interface InputTextInterface {
  autofocus?: boolean | undefined
  disabled?: boolean | undefined
  id?: string | undefined
  label: string,
  type: string,
  dados: { [key: string]: string | number | readonly string[] | undefined | any },
  field: string,
  setState: React.Dispatch<React.SetStateAction<any>>
}

export default function InputText<T>(
  { autofocus = false, disabled = false, label, type, dados, field, setState, id = undefined }: InputTextInterface) {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <label>{label}</label>
      <input type={type} value={dados[field]} id={id}
        ref={inputRef}
        disabled={disabled}
        onChange={(e) => setState({ ...dados, [field]: e.target.value })}
      />
    </>
  )
}
