import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import styles from "../../styles/components/Form.module.css";

export default function TextArea({
  children,
  name,
  autoComplete,
  getRef,
  ...rest
}) {
  const InputRef = useRef(null);
  if (getRef) getRef(InputRef);
  const { fieldName, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.inputBox}>
      <textarea
        onFocus={clearError}
        {...rest}
        ref={InputRef}
        name={name}
        autoComplete={autoComplete}
      />
      {error && <span>{error}</span>}
      {children}
    </div>
  );
}
