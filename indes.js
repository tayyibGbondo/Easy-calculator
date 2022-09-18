//*******DOM ELEMENTS*/
const calculator = document.querySelector('.container'),
calculatorButtonDiv = document.querySelector('.calculator__keys'),
calculator_Display = document.querySelector('.calculator__display');


//uses the event deligation pattern to listen to every calculator keys
calculatorButtonDiv.addEventListener('click', event => {
  const button = event.target //targeting each events for the buttons
  const {buttonType, key} = button.dataset; //There are five kinds of keys. We can identify them with the data-button-type custom attribute and the data-key
  const result = calculator_Display.textContent //initilizing the display for the result
  const { previousButtonType } = calculator.dataset //To reset the number back to zero we call this custom attribute data-previous-action.
  calculator.dataset.previousButtonType = buttonType

  //say if the buttonType name is equal to "number" and if the Display Result is equal to 0, the display result changes to the key of that button that was clicked!! eg "8"
  if(buttonType === "number"){
    if(result === "0"){
      calculator_Display.textContent = key
    }else{
      calculator_Display.textContent = result + key
    }

      //Here if the previousButtonType that was clicked is equal to the "Operator", we hide the first value that was click and then display the last value that was recently clicked after the "operator" sign eg(+,-,/,.)
    if (previousButtonType === 'operator') {
      calculator_Display.textContent = key
    }
  }

   //we check if the buttonType is Equal to the "decimal" Operator and if its true we display the result the dot (.)
  if(buttonType === "decimal"){
    calculator_Display.textContent = result + '.'
  }

  /*
  If Mary clicks a number key after an operator key
  Regardless of what the displayed number is, we need to reset the display to the new number. At the same time, we want to release the operator key from its pressed state.

  To release the pressed state, we remove is-pressed from each operator key.
*/

  const operatorsKey = [...calculatorButtonDiv.children].filter(button => button.dataset.buttonType === 'operator')
  operatorsKey.forEach(button => button.classList.remove('is-pressed'));

  if(buttonType === "operator"){
    button.classList.add('is-pressed')
    calculator.dataset.firstValue = result
    calculator.dataset.operator = button.dataset.key
  }

  /*
    The calculator should calculate a result that depends on three values:

  The first value (before we clicked the operator)
  The operator
  The second value (the one that’s currently displayed)
  To get the first value, we need to save results before we replace it with the second number. We can do this with a custom attribute called data-first-value.
*/

  if(buttonType === "equal"){
    const firstValue = parseFloat(calculator.dataset.firstValue)
    const operator = calculator.dataset.operator
    const secondValue = parseFloat(result)

    let newResult
    if (operator === 'plus') newResult = firstValue + secondValue
    if (operator === 'minus') newResult = firstValue - secondValue
    if (operator === 'times') newResult = firstValue * secondValue
    if (operator === 'divide') newResult = firstValue / secondValue

    calculator_Display.textContent = newResult
  }

  if (buttonType !== 'clear') {
    const clearButton = calculator.querySelector('[data-button-type=clear]')
    clearButton.textContent = 'CE'
  }

  if (buttonType === 'clear') {

    if (button.textContent === 'AC') {
      remove.calculator.dataset.firstValue
      remove.calculator.dataset.operator
    }
    
    calculator_Display.textContent = '0'
  }

})
