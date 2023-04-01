import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { CSSProperties } from "react";
import { Textfit } from "react-textfit";

const ScreenWraper = styled.div`
  height: 60px;
  width: 240px;
  display: flex;
  justify-content: space-between;

  border-radius: 4px;
  padding: 4px;
  margin-bottom: 12px;
`;

const ScreenValue = styled(Textfit)`
  padding: 0 10px;

  height: 100%;
  width: 100%;
  background-color: #f3f4f6;
  display: flex;
  overflow: hidden;
  justify-content: end;
  align-items: center;
  border: none;
  border-radius: 6px;
  padding-right: 6px;
  font-weight: 800;
`;

const Text = styled.p`
  font-size: 36px; /* fallback */
  font-size: clamp(36px, 10vw, 54px);
`;

const Screen = (props: { style: CSSProperties }) => {
  const num = useAppSelector((state) => state.calc.num);
  const res = useAppSelector((state) => state.calc.res);
  return (
    <ScreenWraper style={props.style}>
      <ScreenValue mode="single" forceSingleModeWidth={false} max={70}>
        {num ? num : 0}
      </ScreenValue>
    </ScreenWraper>
  );
};

export default Screen;
