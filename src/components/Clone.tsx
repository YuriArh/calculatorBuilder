import { ReactElement } from "react";
import { CSSProperties } from "react";
import styled from "styled-components";

const CloneWrapper = styled.div`
  ~ div {
    transform: none !important;
  }
  opacity: 50%;
`;

const Clone = (props: { children?: ReactElement; style?: CSSProperties }) => {
  return <CloneWrapper style={props.style}>{props.children}</CloneWrapper>;
};

export default Clone;
