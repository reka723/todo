import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import InputForm from "./InputForm";
import { todoActions } from "../store/todoSlice";

function App() {
  const list = useSelector((state) => state.todo.list);
  const [filter, setFilter] = useState("all");
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
  const handleFilter = (filter) => {
    setFilter(filter);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(todoActions.dragDrop(items));
  }
  const filteredItems =
    filter === "all" ? list : list.filter((item) => item.checked === filter);

  console.log(filteredItems);
  return (
    <>
      <h1>TODO</h1>
      <div className="drag-and-drop">
        <InputForm />
        {filteredItems.length > 0 && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredItems.map(({ id, title, checked }, index) => {
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
                  <div className="bottom-container">
                    <p>
                      {list.filter((item) => item.checked === false).length}
                      items left
                    </p>
                    <div className="filter-container">
                      <p
                        onClick={() => {
                          handleFilter("all");
                        }}
                      >
                        All
                      </p>
                      <p
                        onClick={() => {
                          handleFilter(false);
                        }}
                      >
                        Active
                      </p>
                      <p
                        onClick={() => {
                          handleFilter(true);
                        }}
                      >
                        Completed
                      </p>
                    </div>
                    <button onClick={() => handleClearCompleted()}>
                      Clear completed
                    </button>
                  </div>
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </>
  );
}

export default App;
