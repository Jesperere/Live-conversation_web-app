import { gql, useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { useSessionStorage } from "../../hooks";
import "../css/Login.css";
import jwt_decode from "jwt-decode";
import { LoginIcon } from "../svgs";
import { SidePanel } from "./sidePanel";

export interface ILoginProps {
  email?: string;
  password?: string;
}

// Generated by https://quicktype.io

export interface LoginOutput {
  loginUser: LoginUser;
}

export interface LoginUser {
  message: string;
  token: string;
  __typename: string;
  email: string;
  password: string;
}

export const LoginField: FC<ILoginProps> = ({
  email,
  password,
}: ILoginProps) => {
  const [loginUser, { data, loading, error }] = useMutation<LoginOutput>(gql`
    mutation LoginUser($loginInput: LoginInput) {
      loginUser(loginInput: $loginInput) {
        message
        token
        email
        # password
      }
    }
  `);

  const [token, setToken] = useSessionStorage("token", "");

  const LoginState = () => {
    if (loading) {
      return <div>loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (!data) {
      return <div></div>;
    }

    return <div>{data.loginUser.message}</div>;
  };

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  if (token.length > 1) {
    const decodedToken = jwt_decode(token) as any;
    console.log(decodedToken);
    return <div>{decodedToken.email}</div>;
  }

  return (
    <div className="login-field-container">
      <div className="login-open-dialog" onClick={() => setSidePanelOpen(true)}>
        <LoginIcon />
      </div>
      <SidePanel
        isOpen={sidePanelOpen}
        onDismiss={() => setSidePanelOpen(false)}
      />
      <div hidden className="login-field">
        {/* <TextField label='email' onChange={(nv) => setEmailValue(nv)} /> */}
        <input
          type="text"
          id="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email..."
        />
        <input
          type="password"
          id="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Password..."
        />
        <button
          onClick={() => {
            loginUser({
              variables: {
                loginInput: {
                  email: emailValue,
                  password: passwordValue,
                },
              },
            }).then((data) => {
              setToken(data.data?.loginUser.token || "");
            });
          }}
        >
          Log In
        </button>
        {LoginState()}
      </div>
    </div>
  );
};