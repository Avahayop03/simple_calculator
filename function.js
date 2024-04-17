function calculate() {
    var box = document.getElementById("box");
    var expression = box.innerHTML;

    try {
        if (operatorEntered) {
            expression = expression.slice(0, -1);
            operatorEntered = false;
        }

        var result = eval(expression);

        box.innerHTML = result;

        calculationHistory.push({ expression: expression, result: result });

        printHistory();

    } catch (error) {
        box.innerHTML = "Error";
    }
}

function handleButtonClick(value) {
    var box = document.getElementById("box");
    var currentValue = box.innerHTML;

    if (value.match(/[+\-*/]/)) {
        if (operatorEntered) {
            box.innerHTML = currentValue.slice(0, -1) + value;
        } else {
            box.innerHTML += value;
        }
        operatorEntered = true;
    } else {
        box.innerHTML += value;
        operatorEntered = false;
    }
}

function appendToDisplay(value) {
    var box = document.getElementById("box");
    if (box.innerHTML === "0" || box.innerHTML === "Error") {
        box.innerHTML = value;
    } else {
        box.innerHTML += value;
    }
}

function clearDisplay() {
    var box = document.getElementById("box");
    box.innerHTML = "0";
    
    calculationHistory = [];

    printHistory();
}

function backspace() {
    var box = document.getElementById("box");
    var value = box.innerHTML;
    value = value.slice(0, -1);
    if (value === "") {
        box.innerHTML = "0";
    } else {
        box.innerHTML = value;
    }
}

function printHistory() {
    var historyElement = document.getElementById("printHistory");
    historyElement.innerHTML = "";

    calculationHistory.forEach(function(entry) {
        var historyItem = document.createElement("div");
        historyItem.textContent = entry.expression + " = " + entry.result;
        historyElement.appendChild(historyItem);
    });
}

document.addEventListener("keydown", function(event) {
    var key = event.key;
    var validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "%", "Enter", "Backspace", "Delete"];

    if (validKeys.includes(key)) {
        event.preventDefault();
        
        switch (key) {
            case "Backspace":
                backspace();
                break;
            case "Delete":
                clearDisplay();
                break;
            case "Enter":
                calculate();
                break;
            default:
                appendToDisplay(key);
                break;
        }
    }
});

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "clear") {
            clearDisplay();
        } else if (this.id == "backspace") {
            backspace();
        } else {
            handleButtonClick(this.id);
        }
    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        handleButtonClick(this.id);
    });
}
