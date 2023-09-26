import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import InputForm from "./InputForm";
import { todoActions } from "../store/todoSlice";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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
    <div className="container">
      <h1>TODO</h1>
      <div className="drag-and-drop">
        <InputForm />
        <div className="list-container">
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
                              <p className={checked ? "checked" : ""}>
                                {title}
                              </p>
                              <IconButton
                                style={{ color: "hsl(234, 11%, 52%)" }}
                                className="hide-delete"
                                onClick={() => handleDelete(id)}
                              >
                                <ClearIcon />
                              </IconButton>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
          <div className="bottom-container">
            <p>
              {list.filter((item) => item.checked === false).length}
              &nbsp;items left
            </p>
            <div className="filter-container">
              <p
                className={filter === "all" ? "active" : ""}
                onClick={() => {
                  handleFilter("all");
                }}
              >
                All
              </p>
              <p
                className={filter === false ? "active" : ""}
                onClick={() => {
                  handleFilter(false);
                }}
              >
                Active
              </p>
              <p
                className={filter === true ? "active" : ""}
                onClick={() => {
                  handleFilter(true);
                }}
              >
                Completed
              </p>
            </div>
            <p onClick={() => handleClearCompleted()}>Clear completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
