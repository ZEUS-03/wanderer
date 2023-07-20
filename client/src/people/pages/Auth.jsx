import React from "react";

import Card from "../../shared/components/Card";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";

const Auth = () => {
  const [formState, inputHandler] = useForm(
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card>
      <h1 className="font-bold text-xl">Login Required</h1>
      <form onSubmit={onSubmitHandler} className="w-full">
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
