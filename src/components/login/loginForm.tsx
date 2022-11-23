import { FC, useEffect, useState } from "react";
import { TextField } from "../input";
import "../css/loginForm.css";
import { PasswordField } from "../input/PasswordField";
import { useLoginService } from "../../hooks";

interface ILoginFormProps {
  onSignUpClick: () => void;
}

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

export const LoginForm: FC<ILoginFormProps> = ({
  onSignUpClick,
}: ILoginFormProps) => {
  const { token, payload, loading, error, login, logout, isAuthorized } = useLoginService()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => console.log("aaa", isAuthorized), [isAuthorized])

  if (isAuthorized) {
    return <div>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  }


  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        login(email, password);
      }}
      autoComplete="off"
    >
      <div className="login-form" >
        <h2>Login</h2>
        <TextField placeholder="email" onChange={(nv) => setEmail(nv)} />
        <PasswordField placeholder="password" onChange={(nv) => setPassword(nv)} />

        <button type="submit">Log in</button>
        <button type="button" onClick={() => onSignUpClick()}>
          Sign up
        </button>
      </div>
    </form>

  );
};
