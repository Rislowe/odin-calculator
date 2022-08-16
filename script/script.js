//Global Variables
let numberSegment = "";     //number section to be parsed
let numberArray = [];       //holds the numbers
let operatorArray = [];     //holds the operators
let operatorCount = 0;
let operatorOff=false;

let textBox = document.querySelector('.text-box');
textBox.innerHTML = '';

/*number button listener: gets the button pressed by id and outputs
the innerHTML of the button to the number segment string*/

let initNum = () =>
{
    const numberBox = document.querySelector('.number-buttons');

    for(let i = 9; i >= 0; i--)
    {
        let button = document.createElement('button');
        button.id = "button" + i;
        button.classList.add('num-button');
        button.innerHTML = i;

        button.addEventListener('click', numberClicked);
        
        numberBox.appendChild(button);
    }

    let decimalButton = document.createElement('button');
    decimalButton.id='decimal-button';
    decimalButton.classList.add('num-button');
    decimalButton.innerHTML='.';

    numberBox.appendChild(decimalButton);

    decimalButton.addEventListener('click', ()=>
    {
        textBox.innerHTML += '.';
        numberSegment += '.';
        decimalButton.disabled = true;
    });

}

//initialize Operator buttons
let initOperator = ()=>
{
    const addButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const multiplyButton = document.getElementById('times');
    const divideButton = document.getElementById('divide');

    addButton.addEventListener('click', addClicked);
    minusButton.addEventListener('click', minusClicked);
    multiplyButton.addEventListener('click', multiplyClicked);
    divideButton.addEventListener('click', divideClicked);
}

//listener functions
function addClicked()
{
    textBox.innerHTML += '+';
    numberArray[operatorCount] = parseFloat(numberSegment);
    operatorArray[operatorCount] = '+';
    clearSegment();
}

function minusClicked()
{
    textBox.innerHTML += '-';
    numberArray[operatorCount] = parseFloat(numberSegment);
    operatorArray[operatorCount] = '-';
    clearSegment();
}

function multiplyClicked()
{
    textBox.innerHTML += '*';
    numberArray[operatorCount] = parseFloat(numberSegment);
    operatorArray[operatorCount] = '*';
    clearSegment();
}

function divideClicked()
{
    textBox.innerHTML += '/';
    numberArray[operatorCount] = parseFloat(numberSegment);
    operatorArray[operatorCount] = '/';
    clearSegment();
}

function toggleOperators()
{
    const operators = document.querySelectorAll('.operator-button');
    
    operators.forEach(button =>
        {
            button.disabled = !button.disabled;
        });

    operatorOff = !operatorOff;
}

function clearSegment()
{
    numberSegment = '';
    const decimalButton = document.getElementById('decimal-button');
    decimalButton.disabled = false;
    operatorCount++;
    toggleOperators();
}

function numberClicked() 
{
    textBox.innerHTML += this.innerHTML;
    numberSegment += this.innerHTML;
    if(operatorOff) toggleOperators();
}

function execute()
{
    let i = 0;
    numberArray[operatorCount] = parseFloat(numberSegment);
    operatorArray.forEach(operator =>
        {
            let result = 0;

            switch (operator){
                case '+':
                    result = numberArray[i] + numberArray[i+1];
                    break;
                case '-':
                    result = numberArray[i] - numberArray[i+1];
                    break;
                case '*':
                    result = numberArray[i] * numberArray[i+1];
                    break;
                case '/':
                    result = numberArray[i] / numberArray[i+1];
                    break;
                default:
                    result = 0;
            }

            i+=1;

            if(i==operatorCount)
            {
                reset(false); //resets Calculator with operators on
                textBox.innerHTML = "" + result;
                numberSegment = ""+result;
            }
            else
            {
                numberArray[i] = result;
            }
        })
}

function backspace()
{
    if(numberSegment.length > 0)
    {
        numberSegment = numberSegment.slice(0, -1);
        textBox.innerHTML = textBox.innerHTML.slice(0,-1);

        console.log(numberSegment + ' ' + numberSegment.length);
    }
    else
    {
        console.log("Empty Segment!!");
    }
}

function reset(opReset)
{
    textBox.innerHTML = '';
    numberSegment = '';
    numberArray = [];
    operatorArray = [];
    operatorCount=0;
    const decimalButton = document.getElementById('decimal-button');

    if(opReset)
    {
        decimalButton.disabled = false;
    }
    else{
        decimalButton.disabled = true;
    }

    if(operatorOff != opReset)
    {
        toggleOperators();
        operatorOff = opReset;
    }
}

//main functions

initNum();
initOperator();