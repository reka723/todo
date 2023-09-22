import { createSlice } from "@reduxjs/toolkit";

const initialListState = {
  list: [
    { id: 1, title: "Dog walk", checked: true },
    { id: 2, title: "Clean", checked: false },
  ],
  counter: 2,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialListState,
  reducers: {
    add(state, action) {
      const newTodo = { ...action.payload, id: state.counter + 1 };
      state.list.push(newTodo);
      state.counter++;
    },
    check(state, action) {
      state.list[action.payload.id - 1].checked =
        !state.list[action.payload.id - 1].checked;
    },
    delete(state, action) {
      const idToDelete = action.payload;
      state.list = state.list.filter((item) => item.id !== idToDelete);
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
