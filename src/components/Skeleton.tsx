import styled from "styled-components";

import plusIcon from "../icons/plusIcon.svg";

const SkeletonWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  border: 2px dashed #c4c4c4;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.active ? "#F0F9FF" : "")};
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
  margin-bottom: 12px;
`;

const BigText = styled.p`
  color: #5d5fef;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin: 0;
  margin-bottom: 4px;
  text-align: center;
`;

const Text = styled.p`
  color: #6b7280;
  width: 106px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  margin: 0;
  text-align: center;
`;

const Skeleton = (props: { active: boolean }) => {
  return (
    <SkeletonWrapper active={props.active}>
      <Img src={plusIcon} alt="plusIcon" />
      <BigText>Перетащите сюда</BigText>
      <Text>Любой элемент из левой панели</Text>
    </SkeletonWrapper>
  );
};

export default Skeleton;
