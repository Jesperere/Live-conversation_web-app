import { FC, useState } from "react";
import { TextField } from "../input";
import "../css/signUpForm.css"
import { PasswordField } from "../input/PasswordField";
import { gql, useMutation } from "@apollo/client";

export interface ISignUpFormProps {
  onBackClick: () => void;
}

// Generated by https://quicktype.io

export interface RegisterOutput {
  registerUser: RegisterInput;
}

export interface RegisterInput {
  message: string;
  alias: string;
  email: string;
  password: string;
  color: string;
  confirmPassword: string;
}


export const SignUpForm: FC<ISignUpFormProps> = ({
  onBackClick,
}: ISignUpFormProps) => {
  const [registerUser] = useMutation<RegisterOutput>(gql` 
  mutation RegisterInput($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      message
    }
  }
  `);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [aliasValue, setAliasValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");




  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        registerUser();
      }}
      autoComplete="false"

    >
      <div className="sign-up-from">
        <h2>Sign up</h2>
        <TextField placeholder="email" onChange={(nv) => setEmailValue(nv)} />
        <TextField placeholder="alias" onChange={(nv) => setAliasValue(nv)} />
        <TextField placeholder="color" onChange={(nv) => setColorValue(nv)} />
        <PasswordField placeholder="password" onChange={(nv) => setPasswordValue(nv)} />
        <PasswordField placeholder="confirm password" onChange={(nv) => setConfirmValue(nv)} />

        <button type="submit"
          onClick={() => {
            registerUser({
              variables: {
                registerInput: {
                  email: emailValue,
                  alias: aliasValue,
                  password: passwordValue,
                  color: colorValue,
                  confirmPassword: confirmValue
                },
              },
            }).then(() => {
              //check if password and confirmPassword matches - if it doesnt, send error
              console.log("User registered");
              // if user is successfully registered, show sign in panel with msg "successfully registered"
              onBackClick()
            })
          }}

        >Sign up</button>
        <button type="button" onClick={() => onBackClick()}>
          Back
        </button>
      </div>
    </form>
  );
};
