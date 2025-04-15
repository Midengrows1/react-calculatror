import { useEffect, useRef, useState } from 'react';
import s from './App.module.scss';
function App() {
  const [inputValue, setInputValue] = useState<string>('0');
  const [resultShown, setResultShown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const numbArr: (string | number)[] = Array(10)
    .fill(0)
    .map((_, i) => i);

  const newArr = numbArr.concat(['+', '-']);

  console.log(newArr);

  if (inputValue[0] === '0' && (inputValue[1] === '0' || +inputValue[1] > 0)) {
    setInputValue(inputValue[0]);
  } else if (inputValue[0] === '-' && inputValue[1] === '0') {
    setInputValue(inputValue[0]);
  }

  if (inputValue[0] === '+') {
    setInputValue(inputValue.slice(1));
  }

  const inputArr: string[] = [...inputValue];

  inputArr.forEach((el, index) => {
    if (el === '+' || el == '-') {
      if (inputArr[index + 1] === '+' || inputArr[index + 1] === '-') {
        setInputValue(inputValue.slice(0, index + 1));
      }
    }
  });

  const calcExpression = () => {
    setResultShown(true);
    setInputValue(eval(inputValue).toString());
  };
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <div className={s.calculator}>
      <div className={s.calculatorInner}>
        <input
          className={resultShown ? s.calcResult : ''}
          type="text"
          value={inputValue}
          autoComplete="off"
          ref={inputRef}
        />
        <div className={s.calculator__btnsContainer}>
          {newArr.map((btn) => {
            return (
              <button
                key={btn}
                className={s.calculator__btns}
                onClick={() => {
                  setInputValue((prev) => {
                    if (prev === '0' && btn !== '+') {
                      return btn.toString();
                    }
                    return prev + btn;
                  });
                  setResultShown(false);
                }}
              >
                {btn}
              </button>
            );
          })}
          <button onClick={calcExpression}> = </button>
          <button
            onClick={() => {
              setInputValue('');
            }}
          >
            C{' '}
          </button>
          <button
            onClick={() => {
              setInputValue((prevValue) => prevValue.slice(0, -1));
            }}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
