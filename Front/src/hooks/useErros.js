import { useState, useCallback } from 'react';

export default function useErros() {
  const [erros, setErrors] = useState([]);
  const setError = useCallback(
    ({ field, message }) => {
      const errorAlreadyExists = erros.find((error) => error.field === field);
      if (errorAlreadyExists) {
        return;
      }
      setErrors((prevstate) => [...prevstate, { field, message }]);
    },
    [erros],
  );

  const removeError = useCallback((fildName) => {
    setErrors((prevstate) =>
      prevstate.filter((error) => error.field !== fildName),
    );
  }, []);
  const getErrorMessageByFieldName = useCallback(
    (fieldName) => erros.find((error) => error.field === fieldName)?.message,
    [erros],
  );
  return { setError, removeError, getErrorMessageByFieldName, erros };
}
