import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";
import OperatorsProps from "../interfaces/OperatorsProps";
import { updateCalc } from "../redux/features/calcSlice";

const OperatorsWrapper = styled.div`
  height: 47px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 12px;
  background-color: white;
`;

const OperatorsButton = styled.button`
  height: 40px;
  width: 40px;

  border: 1px solid #e2e3e5;
  border-radius: 6px;
  background-color: inherit;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border: 2px solid #5d5fef;
  }
`;

const OperatorsDiv = styled.div`
  height: 40px;
  width: 40px;

  border: 1px solid #e2e3e5;
  border-radius: 6px;
  background-color: inherit;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: 500;
`;

const Operators = (props: OperatorsProps) => {
  const mode = useAppSelector((state) => state.calc.mode);
  const dispatch = useAppDispatch();

  const checkMode = () => {
    if (mode === "constructor") {
      return props.oprtsValues.flat().map((oprts, i) => {
        return <OperatorsDiv key={i}>{oprts}</OperatorsDiv>;
      });
    } else {
      return props.oprtsValues.flat().map((oprts, i) => {
        return (
          <OperatorsButton
            key={i}
            onClick={() => {
              dispatch(updateCalc(oprts.toString()));
            }}
          >
            {oprts}
          </OperatorsButton>
        );
      });
    }
  };
  return <OperatorsWrapper style={props.style}>{checkMode()}</OperatorsWrapper>;
};

export default Operators;
