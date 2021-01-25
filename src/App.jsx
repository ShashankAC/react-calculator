import React from 'react'
import styles from './App.module.css';

class App extends React.Component {
    
  state = {
    buttonList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "<-", "C",
    "+", "-", "X", "/",
    "CE", "(", ")", "="],
    expression: [],
    result: 0,
    error: '',
    intermediateResult: 0
  }

  handleKeyPress = (event) => {
    let code = event.key || event.which
    let exp = [...this.state.expression]
    switch(code) {
      case "1":
        exp.push(1)
        this.setState({expression: exp})
        break
      case "2":
        exp.push(2)
        this.setState({expression: exp})
        break
      case "3":
        exp.push(3)
        this.setState({expression: exp})
        break
      case "4":
        exp.push(4)
        this.setState({expression: exp})
        break
      case "5":
        exp.push(5)
        this.setState({expression: exp})
        break
      case "6":
        exp.push(6)
        this.setState({expression: exp})
        break
      case "7":
        exp.push(7)
        this.setState({expression: exp})
        break
      case "8":
        exp.push(8)
        this.setState({expression: exp})
        break
      case "9":
        exp.push(9)
        this.setState({expression: exp})
        break
      case "0":
        exp.push(0)
        this.setState({expression: exp})
        break
      case "+":
        exp.push("+")
        this.setState({expression: exp})
        break
      case "-":
        exp.push("-")
        this.setState({expression: exp})
        break
      case "*":
        exp.push("*")
        this.setState({expression: exp})
        break
      case "/":
        exp.push("/")
        this.setState({expression: exp})
        break
      case "Enter":
        this.evaluate(this.state.expression)
        break
      case "=":
        this.evaluate(this.state.expression)
        break
      case "(":
        exp.push("(")
        this.setState({expression: exp})
        break
      case ")":
        exp.push(")")
        this.setState({expression: exp})
        break
      default:
        break
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  handleClick = (event) => {
  
    switch(event.target.name) {
      case "=":
        this.evaluate(this.state.expression)
      break
      case "C":
        this.setState({result: 0})
        this.setState({error: ''})
      break
      case "CE":
        this.setState({expression: []})
        this.setState({result: 0})
        this.setState({error: ''})
      break
      case "<-":
        let currentExpression = [...this.state.expression]
        currentExpression.pop()
        this.setState({expression: currentExpression})
      break
      case "ANS":
        let res = this.state.result
        this.setState({expression: [res]})
      break
      default: 
        let newInput = event.target.value
        let latestExpression
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(newInput))) {
          latestExpression = [...this.state.expression, parseInt(newInput)]
        }
        else if(newInput === "sin" || newInput === "cos" || newInput === "tan") {
          latestExpression = [`${newInput}`, '(']
          latestExpression = [...latestExpression,...this.state.expression]
          latestExpression.push(")")
          this.setState({expression: latestExpression})
        }
        else {
          latestExpression = [...this.state.expression, newInput]
        }
        this.setState({expression: latestExpression})
      break
    }
  }
  
  evaluate = (expression) => {
    if(this.checkValidity(expression)) {
      let exp = [...expression]
      
      exp = this.joinNumbers(exp)
      // console.log(exp, "after joining numbers")
      let positionOfInnerOpenBracket = 0
      let positionOfInnerMostClosedBracket = 0
      if(exp[0] !== "(") {
        exp.unshift("(")
        exp.push(")")
      }
      for(let i = 0; i < exp.length; i++) {
        if(exp[i] === "(") {
          positionOfInnerOpenBracket = i
        }
      }
      for(let i = positionOfInnerOpenBracket; i < exp.length; i++) {
        if(exp[i] === ")") {
          positionOfInnerMostClosedBracket = i
          break
        }
      }

      let smallestExp = []
      for(let i = positionOfInnerOpenBracket+1; i < positionOfInnerMostClosedBracket; i++) {
        smallestExp.push(exp[i])
      }
      // console.log(smallestExp, "Input to calculate()")
      this.calculate(smallestExp, () => {
        let intResult = this.state.intermediateResult
        exp.splice(positionOfInnerOpenBracket, positionOfInnerMostClosedBracket-positionOfInnerOpenBracket+1, intResult)
        // exp.splice(positionOfInnerOpenBracket, 0, )
        if(exp.length !== 1) {
          this.evaluate(exp)
        }
        else {
          if( isNaN(exp[0])) {
            this.setState({error: "Invalid syntax"})
          }
          else {
            this.setState({result: exp[0]}, () => {
              return exp[0]
            })
          }
        }
      })
    }
  }

  joinNumbers = (exp) => {
    for(let i = 0; i < exp.length; i++) {
    	let numStart
			if(typeof exp[i] === "number" && typeof exp[i-1] !== "number") {
      	numStart = i
        let num = []
        let j = numStart
        let numEnd = numStart
       	while(typeof exp[j] === "number") {
        	num.push(exp[j])
          j++
          numEnd++
        }
        let number = this.createMultidigitNumber(num)
        exp.splice(numStart, numEnd - numStart, number)
        // console.log(exp)
      }		
    }
    return exp
  }

  createMultidigitNumber = (arr) => {
    let result = 0
    let j, k = 0
    for(j = arr.length-1; j >=0; j--) {
      result += arr[j]*Math.pow(10, k)
      k++
    }
    return result
  }

  calculate = (exp, cb) => {
    let currentExp = [...exp]
    let isSin = false, isCos = false, isTan = false
    if(currentExp[0] === "sin") {
      isSin = true
    } 
    else if(currentExp[0] === "cos") {
      isCos = true
    }
    else if(currentExp[0] === "tan") {
      isTan = true
    }
    let order = ["/", "X", "+", "-"]

    if(currentExp.length > 2) {
      for(let i = 0; i < order.length; i++) {
        for(let j = 0; j < currentExp.length; j++) {
          let result = 0
          if(currentExp[j] === order[i]) {
            result += this.doOp(currentExp[j-1],currentExp[j+1], order[i])
            currentExp.splice(j-1, 3, result)
          }
        }
      }
      this.calculate(currentExp, cb)
    }
    else if(currentExp.length === 2) {
      let result
      if(isSin) {
        result = Math.sin(currentExp[1])
      }
      else if(isCos) {
        result = Math.cos(currentExp[1])
      }
      else if(isTan) {
        result = Math.sin(currentExp[1])/Math.cos(currentExp[1])
      }
      currentExp = [result]
      this.calculate(currentExp, cb)
    }
    else {
      this.setState({intermediateResult: currentExp[0]}, function() {
        if(typeof cb === "function") {
          cb()
        }
      })
    }
  }

doOp = (a,b, op) => {

  switch (op) {
    case "/":
      return a/b
    case "X":
      return a*b
    case "+":
      return a+b
    case "-":
      return a-b
    // case "sin":
    //   return Math.sin(a)
    // case "cos":
    //   return Math.cos(a)
    default:
      break;
  }
}


  checkValidity = (expression) => {

    let openBracketsCount = 0, closeBracketsCount = 0
    let isValid = true
    for(let i = 0; i < expression.length; i++) {
      if(expression[i] === "(") {
        openBracketsCount++
        if(typeof expression[i-1] === "number") {
          isValid = false
          this.setState({error:"Invalid syntax"})
          return isValid
        }
      }
      if(expression[i] === ")") {
        closeBracketsCount++
        if(typeof expression[i+1] === "number" || expression[i+1] === "sin" ||
           expression[i+1] === "cos") {
          isValid = false
          this.setState({error:"Invalid syntax"})
          return isValid
        }
      }
    }
    if(openBracketsCount !== closeBracketsCount) {
      isValid = false
      this.setState({error:"Invalid syntax"})
      return isValid
    }

  return isValid
  }

  render() {

    return (
      <div className={styles.App}>
        <div className={styles.calculatorBody}>
          <div className={styles.calculatorDisplay}>
            <div className={styles.expression}>
              {this.state.expression}
            </div>
            <div className={styles.result}>
              {this.state.error || this.state.result}
            </div>
          </div>
          <div className={styles.specialButtons}>
            <button className={styles.btnSpecial} name="ANS" value="ANS" onClick={this.handleClick}>ANS</button>
            <button className={styles.btnSpecial} name="sin" value="sin" onClick={this.handleClick}>sin</button>
            <button className={styles.btnSpecial} name="cos" value="cos" onClick={this.handleClick}>cos</button> 
            <button className={styles.btnSpecial} name="tan" value="tan" onClick={this.handleClick}>tan</button> 

          </div>
          <div className={styles.calculatorButtons}>
            <div className={styles.numbers}>
              {this.state.buttonList.map((button, i) => (
                typeof(button) === "number" ?
                <button id={`${button}`}
                        key = {i} 
                        className={styles.btns} 
                        name={button} value={button} 
                        onClick={this.handleClick}
                        >{button}
                </button> : null
              ))}
              {this.state.buttonList.map((button, i) => (
                button === "(" || button === ")" ?
                <button id={`${button}`}
                        key = {i} 
                        className={styles.btns} 
                        name={button} value={button} 
                        onClick={this.handleClick}
                        >{button}</button> : null
              ))}
            </div>
            <div className={styles.operators}>
              {this.state.buttonList.map((button, i) => (
                  typeof(button) !== "number" && button !== "(" && button !== ")" ?
                  <button id={`${button}`}
                          key = {i} 
                          className={styles.btns} 
                          name={button} value={button} 
                          onClick={this.handleClick}>{button}</button> : null
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
