import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { isValid, value } = inputState;
  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      payload: event.target.value,
      validators: props.validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <div
      className={`flex flex-col justify-center p-2 ${
        !inputState.isValid && inputState.isTouched && "text-red-500 "
      }`}
    >
      <label htmlFor={props.id} className={`font-bold `}>
        {props.label}{" "}
      </label>
      {props.element === "input" ? (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          className={`border border-gray-500 rounded-sm focus:bg-gray-100 px-[3px] ${
            !inputState.isValid &&
            inputState.isTouched &&
            "border-2 border-red-500"
          }`}
          onBlur={touchHandler}
          onChange={changeHandler}
          value={inputState.value}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onBlur={touchHandler}
          onChange={changeHandler}
          value={inputState.value}
          className={`border border-gray-500 rounded-sm focus:bg-gray-100 px-[3px] ${
            !inputState.isValid &&
            inputState.isTouched &&
            "border-2 border-red-500"
          }`}
        />
      )}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};
export default Input;
