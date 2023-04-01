import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  mode: "constructor" | "runtime";
  num: string;

  error: string;
  res: string;
} = {
  mode: "constructor",

  num: "",
  res: "",
  error: "",
};

const calcSlice = createSlice({
  name: "calc",
  initialState,
  reducers: {
    changeMode(state, action: { payload: "constructor" | "runtime" }) {
      state.mode = action.payload;
    },
    setError(state, action: { payload: string }) {
      state.error = action.payload;
    },
    setResult(state) {
      state.num = eval(state.num).toString();
    },
    updateCalc(state, action: { payload: string }) {
      const ops = ["/", "*", "-", "+", ".", "C"];

      if (action.payload === "C") {
        state.num = "";
        return;
      }

      if (
        (ops.includes(action.payload) && state.num === "") ||
        (ops.includes(action.payload) && ops.includes(state.num.slice(-1)))
      ) {
        return;
      }

      state.num = state.num + action.payload;
    },
  },
});

export const { changeMode, setError, setResult, updateCalc } =
  calcSlice.actions;

export default calcSlice.reducer;
