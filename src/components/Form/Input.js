import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import styles from '../../styles/components/Form.module.css'

export default function Input({name,  autoComplete}) {
  const InputRef = useRef(null)
  const {fieldName, registerField, error} = useField(name)

  useEffect(()=> {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: "value"
    })
  }, [fieldName, registerField])

  return (
    <div className={styles.inputBox}>
      <input ref={InputRef} name={name} type={name === 'confirmpass' ? 'password' : name} autoComplete={autoComplete}/>
      {error && <span>{error}</span>}
    </div>
  )
}