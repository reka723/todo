import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import InputForm from "./InputForm";
import { todoActions } from "../store/todoSlice";

function App() {
  const list = useSelector((state) => state.todo.list);
  const counter = useSelector((state) => state.todo.counter);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(todoActions.delete(id));
  };
  const handleClearCompleted = () => {
    dispatch(todoActions.clearCompleted());
  };
  const handleChange = (id) => {
    dispatch(todoActions.check(id));
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  }

  return (
    <>
      <h1>TODO</h1>
      <div className="drag-and-drop">
        <InputForm />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map(({ id, title, checked }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          className="card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <input
                            type="checkbox"
                            className="checkbox"
                            defaultChecked={checked}
                            onChange={() => handleChange(id)}
                          ></input>
                          <p>{title}</p>
                          <button onClick={() => handleDelete(id)}>
                            delete
                          </button>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <button onClick={() => handleClearCompleted()}>
                  Clear completed
                </button>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
