import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { CSSProperties } from "react";
import { setResult } from "../redux/features/calcSlice";

const EqualWraper = styled.div`
  height: 60px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px;
  flex-shrink: 0;
  background-color: white;
  margin-bottom: 12px;
`;

const EqualButton = styled.button`
  height: 100%;
  width: 100%;
  background-color: #5d5fef;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;

const EqualDiv = styled.div`
  height: 100%;
  width: 100%;
  background-color: #5d5fef;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

const Equal = (props: { style: CSSProperties }) => {
  const mode = useAppSelector((state) => state.calc.mode);
  const dispatch = useAppDispatch();
  return (
    <EqualWraper style={props.style}>
      {mode === "constructor" ? (
        <EqualDiv>=</EqualDiv>
      ) : (
        <EqualButton onClick={() => dispatch(setResult())}>=</EqualButton>
      )}
    </EqualWraper>
  );
};

export default Equal;
