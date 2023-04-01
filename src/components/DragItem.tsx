import { ReactElement } from "react";
import { CSSProperties } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { useRef } from "react";

const DragItem = (props: {
  children?: ReactElement;
  style?: CSSProperties;
  innerRef: (element: HTMLElement | null) => void;
  provided: DraggableProvided;
}) => {
  const { provided, innerRef } = props;
  return (
    <div
      style={props.style}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      {props.children}
    </div>
  );
};

export default DragItem;
