import React, { useState, useEffect} from 'react'
import styles from './App.module.css';

function App(props) {
  
  const [buttonList, setButtonList] = useState([])
  const [expression, setExpression] = useState([])
  const [result, setResult] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    setButtonList([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "<-", "C",
                   "+", "-", "X", "/", "sin", "cos", 
                   "CE", "(", ")", "="])
  }, [])

  const handleClick = (event) => {
  
    switch(event.target.name) {
      case "=":
        evaluate(expression)
      break
      case "C":
        setResult(0)
        setError('')
      break
      case "CE":
        setExpression([])
        setResult(0)
        setError('')
      break
      case "<-":
        let currentExpression = [...expression]
        currentExpression.pop()
        setExpression(currentExpression)
      break
      default: 
        let newInput = event.target.value
        let latestExpression
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(newInput))) {
          latestExpression = [...expression, parseInt(newInput)]
        }
        else {
          latestExpression = [...expression, newInput]
        }
        setExpression(latestExpression)
      break
    }
  }
  
  const evaluate = (expression) => {
    if(checkValidity(expression)) {
      
    }
  }

  const checkValidity = (expression) => {

    let openBracketsCount = 0, closeBracketsCount = 0
    let isValid = true
    for(let i = 0; i < expression.length; i++) {
      if(expression[i] === "(") {
        openBracketsCount++
        if(typeof expression[i-1] === "number") {
          isValid = false
          setError("Invalid expression")
          return isValid
        }
      }
      if(expression[i] === ")") {
        closeBracketsCount++
        if(typeof expression[i+1] === "number") {
          isValid = false
          setError("Invalid expression")
          return isValid
        }
      }
      if(expression[i] === "+" || expression[i] === "-" || expression[i] === "*"
        || expression[i] === "/") {
        if(typeof expression[i-1] !== "number" && typeof expression[i+1] !== "number") {
          isValid = false
          setError("Invalid expression")
          return isValid
        }
      }
    }
    if(openBracketsCount !== closeBracketsCount) {
      isValid = false
      setError("Invalid expression brackets mismatch")
      return isValid
    }

  return isValid
  }

  return (
    <div className={styles.App}>
      <div className={styles.calculatorBody}>
        <div className={styles.calculatorDisplay}>
          <div className={styles.expression}>
            <p>{expression}</p>
          </div>
          <div className={styles.result}>
            {error || result}
          </div>
        </div>
        <div className={styles.specialButtons}>
          <button className={styles.btnSpecial} name="UNDO" value="UNDO" onClick={handleClick}>UNDO</button>
        </div>
        <div className={styles.calculatorButtons}>
          <div className={styles.numbers}>
            {buttonList.map((button, i) => (
              typeof(button) === "number" ?
              <button key = {i} className={styles.btns} name={button} value={button} onClick={handleClick}>{button}</button> : null
            ))}
            {buttonList.map((button, i) => (
              button === "(" || button === ")" ?
              <button key = {i} className={styles.btns} name={button} value={button} onClick={handleClick}>{button}</button> : null
            ))}
          </div>
          <div className={styles.operators}>
            {buttonList.map((button, i) => (
                typeof(button) !== "number" && button !== "(" && button !== ")" ?
                <button key = {i} className={styles.btns} name={button} value={button} onClick={handleClick}>{button}</button> : null
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
