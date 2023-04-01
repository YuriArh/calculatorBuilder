import { useState } from "react";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { ItemInterface } from "./interfaces/Items";
import Numbers from "./components/Numbers";
import Operators from "./components/Operators";
import Screen from "./components/Screen";
import Equal from "./components/Equal";
import List from "./components/List";
import Header from "./components/Header";
import Clone from "./components/Clone";
import Skeleton from "./components/Skeleton";
import Wrapper from "./components/Wrapper";
import { useAppDispatch, useAppSelector } from "./hooks";
import { changeMode, setError } from "./redux/features/calcSlice";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

`;

const CustomApp = styled.div`
  max-width: 695px;
  margin: 0 auto;
`;

const AppContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const btnValues = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0, "."],
];

const ops = ["/", "*", "-", "+", "C"];

const items = [
  {
    children: (props?: any) => {
      return <Screen {...props} />;
    },
    id: uuid(),
    name: "Screen",
  },
  {
    children: (props?: any) => {
      return <Operators oprtsValues={ops} {...props} />;
    },
    id: uuid(),
    name: "Operators",
  },
  {
    children: (props?: any) => {
      return <Numbers btnValues={btnValues} {...props} />;
    },
    id: uuid(),
    name: "Numbers",
  },
  {
    children: (props?: any) => {
      return <Equal {...props} />;
    },
    id: uuid(),
    name: "Equal",
  },
];

function App() {
  const [secondItems, setSecondItems] = useState<ItemInterface[]>([]);
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.calc.mode);
  const error = useAppSelector((state) => state.calc.error);

  const rearangeArr = (
    arr: ItemInterface[],
    sourceIndex: number,
    destIndex: number
  ) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result: DropResult) => {
    dispatch(setError(""));
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      setSecondItems(rearangeArr(secondItems, source.index, destination.index));
      return;
    }

    const sourceClone = [...items];
    const destClone = Array.from(secondItems);
    const clone = sourceClone[source.index];

    if (destClone.find((item) => item.name === clone.name)) {
      return;
    } else {
      destClone.splice(destination.index, 0, { ...clone, id: uuid() });
      setSecondItems(destClone);
    }
  };

  const changeAppMode = (mode: "constructor" | "runtime") => {
    if (secondItems.length === items.length) {
      dispatch(setError(""));
      dispatch(changeMode(mode));
    } else {
      dispatch(setError("use all elements"));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CustomApp>
        <GlobalStyle />
        <Header changeAppMode={changeAppMode} />
        <AppContent>
          <Droppable droppableId={"column-1"} isDropDisabled={true}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {mode === "constructor" &&
                  items.map((item, i) => (
                    <Draggable
                      draggableId={item.id}
                      index={i}
                      key={i}
                      isDragDisabled={
                        secondItems.find((clone) => item.name === clone.name)
                          ? true
                          : false
                      }
                    >
                      {(provided, snapshot) => (
                        <>
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Wrapper>
                              {item.children(
                                secondItems.find(
                                  (clone) => item.name === clone.name
                                )
                                  ? { style: { opacity: "50%" } }
                                  : {}
                              )}
                            </Wrapper>
                          </div>
                          {snapshot.isDragging && (
                            <Clone>{item.children()}</Clone>
                          )}
                        </>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={"column-2"}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <List>
                  {secondItems.length ? (
                    secondItems.map((item, i) => (
                      <Draggable
                        draggableId={item.id}
                        index={i}
                        key={item.id}
                        isDragDisabled={mode === "runtime" ? true : false}
                      >
                        {(provided, snapshot) => (
                          <>
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {item.children()}
                            </div>
                          </>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <Skeleton active={snapshot.isDraggingOver} />
                  )}
                </List>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </AppContent>
        <div style={{ color: "red", textAlign: "center", marginTop: "15px" }}>
          {error}
        </div>
      </CustomApp>
    </DragDropContext>
  );
}

export default App;
