import { useState } from "react";

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      if (newValue === null) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number | null => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        if (secondValue === 0) {
          return null; // Division by zero
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);

      if (newValue === null) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    if (display === "0" || display === "Error") return;

    if (display.charAt(0) === "-") {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  const applyPercentage = () => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      const percentage = value / 100;
      setDisplay(String(percentage));
    }
  };

  const getButtonStyle = () => {
    return "h-12 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105";
  };

  const getButtonInlineStyle = (btn: string) => {
    if (btn === "=") {
      return {
        background:
          "linear-gradient(135deg, var(--button-start), var(--button-end))",
        color: "white",
      };
    } else if (["+", "-", "*", "/"].includes(btn)) {
      return {
        background:
          "linear-gradient(135deg, var(--taskbar-hover), var(--window-bg))",
        color: "var(--color-orange-400)",
      };
    } else if (btn === "C") {
      return {
        background:
          "linear-gradient(135deg, var(--color-red-500), var(--color-red-600))",
        color: "white",
      };
    } else if (btn === "±" || btn === "%") {
      return {
        background:
          "linear-gradient(135deg, var(--taskbar-border), var(--taskbar-hover))",
        color: "var(--taskbar-text)",
      };
    } else {
      return {
        background:
          "linear-gradient(135deg, var(--window-bg), var(--taskbar-hover))",
        color: "var(--taskbar-text)",
      };
    }
  };

  const handleButtonClick = (btn: string) => {
    if (btn === "C") {
      clear();
    } else if (btn === "=") {
      performEquals();
    } else if (["+", "-", "*", "/"].includes(btn)) {
      performOperation(btn);
    } else if (btn === ".") {
      inputDecimal();
    } else if (btn === "±") {
      toggleSign();
    } else if (btn === "%") {
      applyPercentage();
    } else {
      inputNumber(btn);
    }
  };

  return (
    <div
      className="p-6 max-w-sm mx-auto"
      style={{ backgroundColor: "var(--window-bg)" }}
    >
      <div
        className="p-6 rounded-xl mb-6 text-right text-3xl font-mono shadow-inner"
        style={{
          background:
            "linear-gradient(135deg, var(--taskbar-hover), var(--window-bg))",
          border: "1px solid var(--window-border)",
          color: "var(--taskbar-text)",
        }}
      >
        <div className="min-h-10 flex items-center justify-end overflow-hidden">
          {display.length > 10 ? display.slice(0, 10) + "..." : display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          "C",
          "±",
          "%",
          "/",
          "7",
          "8",
          "9",
          "*",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "+",
        ].map((btn, index) => (
          <button
            key={`${btn}-${index}`}
            onClick={() => handleButtonClick(btn)}
            className={getButtonStyle()}
            style={getButtonInlineStyle(btn)}
          >
            {btn === "±" ? "±" : btn === "%" ? "%" : btn}
          </button>
        ))}

        {/* Bottom row with special layout */}
        <button
          key="0"
          onClick={() => handleButtonClick("0")}
          className={`${getButtonStyle()} col-span-2`}
          style={getButtonInlineStyle("0")}
        >
          0
        </button>
        <button
          key="."
          onClick={() => handleButtonClick(".")}
          className={getButtonStyle()}
          style={getButtonInlineStyle(".")}
        >
          .
        </button>
        <button
          key="="
          onClick={() => handleButtonClick("=")}
          className={getButtonStyle()}
          style={getButtonInlineStyle("=")}
        >
          =
        </button>
      </div>
    </div>
  );
}
