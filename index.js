const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const clearAllBtn = document.querySelector('[data-clear-all]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')
const currentOperandEl = document.querySelector('[data-current-operand]')
const previousOperandEl = document.querySelector('[data-previous-operand]')

const currentOperand = currentOperandEl.innerHTML
const previousOperand = previousOperandEl.innerHTML

class Calculator {
    constructor(currentOperand, previousOperand) {
        this.currentOperand = currentOperand
        this.previousOperand = previousOperand
    }

    setOperand(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        //console.log(number)
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        this.operation = operation
    }
    displayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        console.log(integerDigits, decimalDigits)
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    display() {
       currentOperandEl.innerHTML = this.displayNumber(this.currentOperand)
      // console.log(this.previousOperand)
       if (this.operation != null) {
        previousOperandEl.innerHTML = `${this.previousOperand} ${this.operation}`
       } else {
        previousOperandEl.innerHTML = ''
       }
    }

    compute() {
        let result;
        const current = Number(this.currentOperand)
        const previous = Number(this.previousOperand)
        console.log(`current: ${current}, previous: ${previous}`)
        if (isNaN(current) || isNaN(previous)) return
        switch (this.operation) {
            case '+' : 
                result = previous + current
                //console.log(result, this.operation, current, previous)
                break;
            case '-' :
                result = previous - current
                break
            case '*' :
                result = previous * current 
                break
            case '/' :
                result = previous / current
                break
            default:
                return
         }
         console.log(result)
         this.currentOperand = result
         this.previousOperand = ''
         this.operation = undefined
         this.display()

        }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.display()
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
        this.display()
    }
    }


const calculator = new Calculator(currentOperand, previousOperand)

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.setOperand(btn.innerText)
        //console.log(btn.innerHTML)
        calculator.display()
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.display()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute()
})

clearAllBtn.addEventListener('click', () => {
    calculator.clear()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
})

/* class Rectangle {
    constructor () {
        this.height = 1
        this.width = 1
    }
    setValues(height, width) {
        this.height = height
        this.width = width
        return {
            'height': height,
            "width": width 
        }
    }
    getArea() {
        const area = this.height * this.width
        return area
    }
}

const rectangle = new Rectangle()

console.log(rectangle.setValues(5,6))

console.log(rectangle.getArea())

 */