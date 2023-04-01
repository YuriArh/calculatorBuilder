import { ReactElement } from "react";
import styled from "styled-components";
const WrapperDiv = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  margin-bottom: 12px;
`;

const Wrapper = (props: { children: ReactElement }) => {
  return <WrapperDiv>{props.children}</WrapperDiv>;
};

export default Wrapper;
