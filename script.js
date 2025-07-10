const output = document.getElementById("output");
const historyDisplay = document.getElementById("history");
const historyContent = document.getElementById("history-content");
const clearHistoryBtn = document.getElementById("clear-history");

clearHistoryBtn.addEventListener("click", () => {
  historyContent.querySelectorAll(".history-item").forEach(item => item.remove());
});

let input = "";
let operator = "";
let firstOperand = "";
let secondOperand = "";
let memory = 0;

function displayResult(result) {
  if (isNaN(result) || result === Infinity || result === -Infinity) {
    output.textContent = "0";
  } else {
    output.textContent = result;
  }
}

function evaluate() {
  let result;
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);

  if (isNaN(a) || isNaN(b)) return 0;

  switch (operator) {
    case "+": result = a + b; break;
    case "−": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = b === 0 ? 0 : a / b; break;
    default: result = b;
  }

  addToHistory(`${firstOperand} ${operator} ${secondOperand} =`, result);
  return result;
}

function addToHistory(equation, result) {
  const item = document.createElement("div");
  item.className = "history-item";
  item.innerHTML = `${equation} <span>${result}</span>`;
  historyContent.prepend(item);
}

document.querySelectorAll(".btn").forEach(button => {
  const value = button.textContent;

  button.addEventListener("click", () => {
    if (!isNaN(value) || value === ".") {
      input += value;
      displayResult(input);
    } else if (["+", "−", "×", "÷","%"].includes(value)) {
      if (input === "") return;
      firstOperand = input;
      operator = value;
      input = "";
      historyDisplay.textContent = `${firstOperand} ${operator}`;
    } else if (value === "=") {
      if (input === "" || firstOperand === "") return;
      secondOperand = input;
      const result = evaluate();
      displayResult(result);
      historyDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
      input = result.toString();
    } else if (value === "C") {
      input = "";
      firstOperand = "";
      secondOperand = "";
      operator = "";
      displayResult(0);
      historyDisplay.textContent = "";
    } else if (value === "⌫") {
      input = input.slice(0, -1);
      displayResult(input || "0");
    } else if (value === "CE") {
      input = "";
      displayResult(0);
    }
  });
});
