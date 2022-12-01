import React, { useRef } from 'react';

interface InputTextInterface {
  label: string,
  type: string,
  dados: { [key: string]: string | number | readonly string[] | undefined | any },
  field: string,
  setState: React.Dispatch<React.SetStateAction<any>>
}

export default function InputText<T>(
  { label, type, dados, field, setState }: InputTextInterface) {

  return (
    <>
      <label>{label}</label>
      <input type={type} value={dados[field]}
        onChange={(e) => setState({ ...dados, [field]: e.target.value })}
      />
    </>
  )
}
