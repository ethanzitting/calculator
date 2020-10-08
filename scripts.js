// Provides functionality to the clear button.
const clearBtn = document.querySelector('#clear-btn');
const screen = document.querySelector('#calculator-screen');

clearBtn.addEventListener('click', () => {
	screen.textContent = "";
})

// Makes number buttons show up on calc screen.
const numberButtons = document.querySelectorAll('.number-btn');

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (calcScreenOutput) {
			screen.textContent = "";
			calcScreenOutput = false;
		}
		screen.textContent += +button.textContent;
	})
})

// Makes operator buttons show up on calc screen.
const operatorButtons = document.querySelectorAll('.operator-btn');

operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		screen.textContent += ` ${button.textContent} `;
	})
})

// TODO Make equals sign calculate current screen equation.
const equalsBtn = document.querySelector('#equalsBtn');

let calcScreenOutput = false;

equalsBtn.addEventListener('click', () => {
	// TODO Turn screen string into array of numbers and operators
	let screenOutput = screen.textContent;
	screenOutput = screenOutput.replace(/[\s]/g, "");
	let formulaArray = [];
	for (let i = 0; i < screenOutput.length; i++) {
		formulaArray[i] = screenOutput[i];
	}

	// Join muliple digits into one number, uses the counter m
	let joinedArray = [];
	m = 0;

	// Loop through Array, counter i
	for (let i = 0; i < formulaArray.length; i++) {
		// Start process at found number
		if (!isNaN(formulaArray[i])) {
			// Loops through consecutive numbers, counter j
			let numberDigits = 0;
			let j = 0;
			let number = [];
			
			for (j = i; j < formulaArray.length; j++) {
				if (!isNaN(formulaArray[j])) {
					numberDigits++;
					
					// Catches number in a separate array
					number[j - i] = formulaArray[j];
				} else {
					break;
				}
			}
			
			// Turns caught number array into a single number, counter k
			let groupedNumber = 0;
			for (let k = 0; k < number.length; k++) {
				groupedNumber += number[k] * Math.pow(10, number.length - k - 1);
			}

			// Puts groupedNumber in joinedArray
			joinedArray[m] = groupedNumber;
			m++;

			// Catches i up to j
			i = j - 1;
		} else {
			joinedArray[m] = formulaArray[i];
			m++;
		}
	}

	function sliceArray(array, i) {
		let firstHalf = array.slice(0, i)
		let secondHalf = array.slice(i + 2, array.length);
		array = firstHalf.concat(secondHalf);
		return array;
	}

	let len = joinedArray.length;

	// High priority loop to conduct all multiplication and division.
	for (let i = 0; i < len; i++) {
		if (joinedArray[i] === "*") {
			// Conducts multiplication
			joinedArray[i - 1] = joinedArray[i - 1] * joinedArray [i + 1];

			// Slices and rejoins array with multiplication added
			joinedArray = sliceArray(joinedArray, i);

			// maintenances for loop
			i--;
			len = joinedArray.length;
		} else if (joinedArray[i] ==="/") {
			// Conducts Division
			joinedArray[i - 1] = joinedArray[i - 1] / joinedArray[i + 1];
			
			joinedArray = sliceArray(joinedArray, i);

			i--;
			len = joinedArray.length;
		}
	}

	// Low priority loop to conduct all addition and subtraction.
	for (let i = 0; i < len; i++) {
		if (joinedArray[i] === "+") {
			// Conducts addition
			joinedArray[i - 1] = joinedArray[i - 1] + joinedArray [i + 1];

			// Slices and rejoins array with multiplication added
			joinedArray = sliceArray(joinedArray, i);

			// maintenances for loop
			i--;
			len = joinedArray.length;
		} else if (joinedArray[i] ==="-") {
			// Conducts Subtraction
			joinedArray[i - 1] = joinedArray[i - 1] - joinedArray[i + 1];
			
			joinedArray = sliceArray(joinedArray, i);

			i--;
			len = joinedArray.length;
		}
	}

	// Round numbers to 2 decimal places
	let result = joinedArray[0];
	result *= 100;
	result = Math.round(result);
	result /= 100;

	// Prints number to calculator screen
	screen.textContent = result;

	// Tells the program that the textContent is not user input and needs cleared.
	calcScreenOutput = true;
})
