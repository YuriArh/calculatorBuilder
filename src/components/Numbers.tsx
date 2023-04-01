import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { updateCalc } from "../redux/features/calcSlice";

import NumberProps from "../interfaces/NumbersProp";

const NumbersWrapper = styled.div`
  width: 240px;
  height: 225px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 12px;
  background-color: white;
`;

const NumberButton = styled.button<{ big: boolean }>`
  height: 48px;
  //   width: ${(props) => (props.big ? "152px" : "72px")};
  grid-area: ${(props) => (props.big ? "4 / 1 / 5 / 3" : "")};
  border: 1px solid #e2e3e5;
  border-radius: 6px;
  background-color: inherit;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  &:hover {
    border: 2px solid #5d5fef;
  }
`;

const NumberDiv = styled.div<{ big: boolean }>`
  height: 48px;
  //   width: ${(props) => (props.big ? "152px" : "72px")};
  grid-area: ${(props) => (props.big ? "4 / 1 / 5 / 3" : "")};
  border: 1px solid #e2e3e5;
  border-radius: 6px;
  background-color: inherit;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  font-weight: 500;
  padding: 1px 6px;
`;

const Numbers = (props: NumberProps) => {
  const mode = useAppSelector((state) => state.calc.mode);
  const dispatch = useAppDispatch();

  const checkMode = () => {
    if (mode === "constructor") {
      return props.btnValues.flat().map((btn, i) => {
        return (
          <NumberDiv key={i} big={btn === 0 ? true : false}>
            {btn}
          </NumberDiv>
        );
      });
    } else {
      return props.btnValues.flat().map((btn, i) => {
        return (
          <NumberButton
            key={i}
            big={btn === 0 ? true : false}
            onClick={() => {
              dispatch(updateCalc(btn.toString()));
            }}
          >
            {btn}
          </NumberButton>
        );
      });
    }
  };
  return <NumbersWrapper style={props.style}>{checkMode()}</NumbersWrapper>;
};

export default Numbers;
