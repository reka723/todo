import React from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import { useForm } from "react-hook-form";
import { todoActions } from "../store/todoSlice";

const InputForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleAdd = (data) => {
    console.log(data);
    dispatch(todoActions.add(data));
  };

  return (
    <form onSubmit={handleSubmit(handleAdd)}>
      <div className="input-container">
        <input type="checkbox" className="checkbox" {...register("checked")} />
        <input type="text" className="input" {...register("title")} />
        <input type="submit" hidden />
      </div>
    </form>
  );
};

export default InputForm;
