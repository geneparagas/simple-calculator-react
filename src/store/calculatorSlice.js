import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expression: "0",
};

const calculatorLogic = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addInput: (state, action) => {
      if (state.expression === "0") {
        state.expression = action.payload;
      } else {
        state.expression += action.payload;
      }
    },
    clearAll: (state) => {
      state.expression = "0";
    },
    deleteLast: (state) => {
      state.expression = state.expression.length > 1 ? state.expression.slice(0, -1) : "0";
    },
    toggleSign: (state) => {
      if (state.expression.startsWith("-")) {
        state.expression = state.expression.slice(1);
      } else {
        state.expression = `-${state.expression}`;
      }
    },
    evaluateExpression: (state) => {
      try {
        let expr = state.expression.replace(/(\d+)%/g, "($1 / 100)") // Convert '50%' to '(50 / 100)'
        .replace(/(\d+)\s*%\s*(\d+)/g, "($1 % $2)"); // Convert 'a % b' properly

        console.log('expr', expr)
        state.expression = Function(`'use strict'; return (${expr})`)().toString();
      } catch {
        state.expression = "Error";
      }
    },
  },
});

export const { addInput, clearAll, deleteLast, evaluateExpression, toggleSign } = calculatorLogic.actions;
export default calculatorLogic.reducer;
