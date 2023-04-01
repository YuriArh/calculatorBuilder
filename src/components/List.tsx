import styled from "styled-components";
import { ReactElement } from "react";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 240px;
  height: 448px;
  flex-shrink: 0;
`;

const List = (props: { children: JSX.Element | JSX.Element[] | undefined }) => {
  return <ListWrapper>{props.children}</ListWrapper>;
};

export default List;
