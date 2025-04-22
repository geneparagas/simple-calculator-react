import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInput, clearAll, deleteLast, evaluateExpression, toggleSign } from "../store/calculatorSlice";
import styles from "../styles/Calculator.module.css";

const buttons = [
    ["ac", "special", clearAll],
    ["del", "special", deleteLast],
    ["+/-", "special", toggleSign],
    ["%", "operator", "%"],
    ["7", "number", "7"],
    ["8", "number", "8"],
    ["9", "number", "9"],
    ["/", "operator", "/"],
    ["4", "number", "4"],
    ["5", "number", "5"],
    ["6", "number", "6"],
    ["*", "operator", "*"],
    ["1", "number", "1"],
    ["2", "number", "2"],
    ["3", "number", "3"],
    ["-", "operator", "-"],
    ["0", "zero", "0"],
    [".", "decimal", "."],
    ["+", "operator", "+"],
];

const Calculator = () => {
    const dispatch = useDispatch();
    const expression = useSelector((state) => state.calculator.expression);
    const calculatorRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = (value, action) => {
        if (typeof action === "function") {
            dispatch(action());
        } else {
            dispatch(addInput(value));
        }
    };

    const handleKeyDown = (event) => {
        event.preventDefault(); // Prevent default browser actions

        const validKeys = "0123456789+-*/%.";
        if (validKeys.includes(event.key)) {
            dispatch(addInput(event.key));
        } else if (event.key === "Enter") {
            dispatch(evaluateExpression());
        } else if (event.key === "Backspace") {
            dispatch(deleteLast());
        } else if (event.key === "Escape") {
            dispatch(clearAll());
        }
    };

    useEffect(() => {
        const calculator = calculatorRef.current;
        if (calculator) {
            calculator.focus();
        }
    }, []);

    return (
        <div
            ref={calculatorRef}
            className={styles.calculator}
            tabIndex="0"
            role="application"
            aria-label="Calculator"
            onKeyDown={handleKeyDown}
        >
            <div className={styles.display} aria-live="polite">{expression}</div>
            <div className={styles.buttons}>
                {buttons.map(([label, className, action]) => (
                    <button
                        key={label}
                        className={styles[className]}
                        onClick={() => handleClick(label, action)}
                        aria-label={`Press ${label}`}
                    >
                        {label}
                    </button>
                ))}
                {isMobile && (
                    <button className={styles.equals} onClick={() => dispatch(evaluateExpression())} aria-label="Equals">
                        =
                    </button>
                )}
            </div>
        </div>
    );
};

export default Calculator;
