import { useState } from "react";

import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { useAppSelector } from "../hooks";
import { changeMode } from "../redux/features/calcSlice";
import { ReactComponent as EyeDisable } from "../icons/eyeDisable.svg";
import { ReactComponent as SelectorDisable } from "../icons/selectorDisable.svg";
import { ReactComponent as EyeActive } from "../icons/eyeActive.svg";
import { ReactComponent as SelectorActive } from "../icons/selectorActive.svg";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 30px 0;
`;

const HeaderInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1px;

  width: 243px;
  height: 38px;

  background: #f3f4f6;
  border-radius: 6px;
`;

const RuntimeButton = styled.button<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 10px;

  width: 108px;
  height: 36px;

  background-color: ${(props) => (props.active ? "#ffffff" : "inherit")};
  border: ${(props) => (props.active ? "1px solid #e2e3e5" : "none")};
  border-radius: 5px;
  font-family: Inter;
  cursor: pointer;
`;

const ConstructorButton = styled.button<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 10px;

  width: 133px;
  height: 36px;

  background-color: ${(props) => (props.active ? "#ffffff" : "inherit")};
  border: ${(props) => (props.active ? "1px solid #e2e3e5" : "none")};

  border-radius: 5px;
  font-family: Inter;
  cursor: pointer;
`;

const Header = (props: {
  changeAppMode: (mode: "constructor" | "runtime") => void;
}) => {
  const mode = useAppSelector((state) => state.calc.mode);

  return (
    <HeaderWrapper>
      <HeaderInner>
        <RuntimeButton
          value={"Runtime"}
          active={mode === "runtime" ? true : false}
          onClick={() => props.changeAppMode("runtime")}
        >
          {mode === "runtime" ? <EyeActive /> : <EyeDisable />}
          Runtime
        </RuntimeButton>
        <ConstructorButton
          value={"Constructor"}
          active={mode === "constructor" ? true : false}
          onClick={() => props.changeAppMode("constructor")}
        >
          {mode === "constructor" ? <SelectorActive /> : <SelectorDisable />}
          Constructor
        </ConstructorButton>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;
