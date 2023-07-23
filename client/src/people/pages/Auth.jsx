import React, { useState, useContext } from "react";

import { Authcontext } from "../../shared/context/auth-context";

import Card from "../../shared/components/Card";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";

const Auth = () => {
  const auth = useContext(Authcontext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
    console.log(formState.inputs);
  };

  return (
    <Card>
      <h1 className="font-bold text-xl">Login Required</h1>
      <form onSubmit={onSubmitHandler} className="w-full">
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          type="email"
          element="input"
          id="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        ></Input>
        <Input
          type="password"
          element="input"
          id="password"
          label="password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password(at least 5 characters long)."
          onInput={inputHandler}
        ></Input>
        <Button
          type="submit"
          inverse
          disabled={!formState.isValid}
          className="ml-2 mt-2"
        >
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
        <button
          onClick={switchModeHandler}
          className="text-right font-semibold text-gray-400 hover:underline text-sm hover:text-[#0040d3]"
        >
          Switch to {isLoginMode ? "Signup" : "Login"}
        </button>
      </form>
    </Card>
  );
};

export default Auth;
