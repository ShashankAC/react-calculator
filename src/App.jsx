import React from 'react'
import styles from './App.module.css'
import { evaluate } from 'mathjs'

class App extends React.Component {

  state = {
    result: 0,
    error: '',
    expression: [],
    history: [],
    historyPosition: 0
  }

  calculate = () => {
    this.setState({error: ''})
    let result = 0
    try {
      result = evaluate(this.state.expression.join(""))
      this.setState({result: result}, () => {
        let his = [...this.state.history]
        let pos = this.state.historyPosition
        if(this.state.history.length > 0) {
          pos = this.state.historyPosition + 1
        }
        let newRecord = {expression: this.state.expression, result: this.state.result}
        // console.log(newRecord, pos)
        his.push(newRecord)
        this.setState({history: his, historyPosition: pos}, () => {
          // console.log(this.state.history)
        })  
      })
    }
    catch (error) {
      this.setState({error: "Invalid syntax"})
    }
    if(!result && result !== 0) {
      // console.log(" ??? ", result)
      this.setState({error: "Invalid syntax"})
    }
  }

  handleKeyPress = (event) => {
    let code = event.key || event.which
    console.log(code)
    let exp = [...this.state.expression]
   
    switch(code) {
      case "1":
        exp.push("1")
        this.setState({expression: exp})
        break
      case "2":
        exp.push("2")
        this.setState({expression: exp})
        break
      case "3":
        exp.push("3")
        this.setState({expression: exp})
        break
      case "4":
        exp.push("4")
        this.setState({expression: exp})
        break
      case "5":
        exp.push("5")
        this.setState({expression: exp})
        break
      case "6":
        exp.push("6")
        this.setState({expression: exp})
        break
      case "7":
        exp.push("7")
        this.setState({expression: exp})
        break
      case "8":
        exp.push("8")
        this.setState({expression: exp})
        break
      case "9":
        exp.push("9")
        this.setState({expression: exp})
        break
      case "0":
        exp.push("0")
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
      case "^":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "Backspace":
        exp.pop()
        this.setState({expression: exp})
        break
      case "Enter":
        // console.log(this.state.expression, exp)
        this.calculate()
        break
      case "=":
        this.calculate()
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

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }
  
  handleClick = (event) => {
    let exp = [...this.state.expression]

    switch(event.target.name) {
      case "0":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "1":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "2":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "3":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "4":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "5":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "6":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "7":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "8":
        exp.push(event.target.value)
        this.setState({expression: exp})
      break
      case "9":
        exp.push(event.target.value)
        this.setState({expression: exp})
      break
      case "(":
        exp.push(event.target.value)
        this.setState({expression: exp})
      break
      case ")":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "+":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "-":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "*":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "/":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "<-":
        exp.pop()
        this.setState({expression: exp})
        break
      case ".":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "^":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "C":
        this.setState({result: 0, error: ''})
        break
      case "CE":
        this.setState({expression: [], result: 0, error: ''})
        break
      case "sin":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "cos":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "tan":
        exp.push(event.target.value)
        this.setState({expression: exp})
        break
      case "ANS":
        // copy to clip board
        var range = document.createRange();
        range.selectNode(document.getElementById("result"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges()
        break
      case "=":
        this.calculate()
        break
      case "back":
        if(this.state.historyPosition > 0) {
          let currentPosition = this.state.historyPosition - 1
          this.setState({historyPosition: currentPosition})
          this.setOutput(currentPosition)
        }
        break
      case "forward":
        if(this.state.history[this.state.historyPosition+1]) {
          let currentPosition = this.state.historyPosition + 1
          this.setState({historyPosition: currentPosition})
          this.setOutput(currentPosition)
        }
        break
      default:
        break
    }
  }

  setOutput = (hisPos) => {
    let current = this.state.history[hisPos]
    // console.log(current)
    let exp = current.expression
    let res = current.result
    this.setState({expression: exp, result: res})
  }

  render() {

    return (
      <div className={styles.App}>
        <div className={styles.calculatorBody}>
          <div className={styles.calculatorDisplay}>
            <div className={styles.expression}>
              {this.state.expression}
            </div>
            <div id="result" className={styles.result}>
              {this.state.error || this.state.result}
            </div>
          </div>
          <div className={styles.specialButtons}>
            <button className={styles.history} name="back" value="back" onClick={this.handleClick}>{"back"}</button>
            <button className={styles.history} name="forward" value="forward" onClick={this.handleClick}>{"forward"}</button>

          </div>
          <div className={styles.specialButtons}>
            <button className={styles.btnSpecial} name="ANS" value="ANS" onClick={this.handleClick}>copy</button>
            <button className={styles.btnSpecial} name="sin" value="sin" onClick={this.handleClick}>sin</button>
            <button className={styles.btnSpecial} name="cos" value="cos" onClick={this.handleClick}>cos</button> 
            <button className={styles.btnSpecial} name="tan" value="tan" onClick={this.handleClick}>tan</button> 
            <button className={styles.btnSpecial} name="<-" value="<-" onClick={this.handleClick}>{"<-"}</button>
            <button className={styles.btnSpecial} name="^" value="^" onClick={this.handleClick}>{"x^y"}</button>
          </div>
          <div className={styles.calculatorButtons}>
            <div className={styles.numbers}>
              <button id={"1"} className={styles.btns} name="1" value="1" onClick={this.handleClick}>1</button>
              <button id={"2"} className={styles.btns} name="2" value="2" onClick={this.handleClick}>2</button>
              <button id={"3"} className={styles.btns} name="3" value="3" onClick={this.handleClick}>3</button>
              <button id={"4"} className={styles.btns} name="4" value="4" onClick={this.handleClick}>4</button>
              <button id={"5"} className={styles.btns} name="5" value="5" onClick={this.handleClick}>5</button>
              <button id={"6"} className={styles.btns} name="6" value="6" onClick={this.handleClick}>6</button>
              <button id={"7"} className={styles.btns} name="7" value="7" onClick={this.handleClick}>7</button>
              <button id={"8"} className={styles.btns} name="8" value="8" onClick={this.handleClick}>8</button>
              <button id={"9"} className={styles.btns} name="9" value="9" onClick={this.handleClick}>9</button>
              <button id={"0"} className={styles.btns} name="0" value="0" onClick={this.handleClick}>0</button>
              <button id={"("} className={styles.btns} name="(" value="(" onClick={this.handleClick}>(</button>
              <button id={")"} className={styles.btns} name=")" value=")" onClick={this.handleClick}>)</button>
            </div>
            <div className={styles.operators}>
              <button id={"C"} className={styles.btns} name="C" value="C" onClick={this.handleClick}>C</button>
              <button id={"+"} className={styles.btns} name="+" value="+" onClick={this.handleClick}>{"+"}</button>
              <button id={"-"} className={styles.btns} name="-" value="-" onClick={this.handleClick}>{"-"}</button>
              <button id={"*"} className={styles.btns} name="*" value="*" onClick={this.handleClick}>{"*"}</button>
              <button id={"/"} className={styles.btns} name="/" value="/" onClick={this.handleClick}>{"/"}</button>
              <button id={"."} className={styles.btns} name="." value="." onClick={this.handleClick}>{"."}</button>
              <button id={"CE"} className={styles.btns} name="CE" value="CE" onClick={this.handleClick}>{"CE"}</button>
              <button id={"="} className={styles.btns} name="=" value="=" onClick={this.handleClick}>{"="}</button>
            </div>
          </div>
        </div>
      </div>
      );

  }
}

export default App;
