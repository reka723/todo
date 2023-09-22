import todoReducer from "./todoSlice";
import authReducer from "./authSlice";

const { configureStore } = require("@reduxjs/toolkit");

// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       counter: state.counter + (action.value ? action.value : 1),
//       showCounter: state.showCounter,
//     };
//   } else if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   } else if (action.type === "toggle") {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }
//   return state;
// };

const store = configureStore({
  reducer: { todo: todoReducer, theme: authReducer },
});

export default store;
