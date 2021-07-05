import { useCallback, useMemo, useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = useMemo(() => !valueIsValid && isTouched, [valueIsValid, isTouched]);
  const valueChangeHandler = useCallback((event) => setEnteredValue(event.target.value), [])
  const inputBlurHandler = useCallback((event) => setIsTouched(true), [])
  const setDefaultValue = useCallback((value) => setEnteredValue(value), [])
  const reset = useCallback(() => {
    setEnteredValue('');
    setIsTouched(false);
  }, []);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    setDefaultValue,
    reset
  };
};

export default useInput;