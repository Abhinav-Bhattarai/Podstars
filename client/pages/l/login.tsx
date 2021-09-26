import { NextPage } from "next";
import React, { useState } from "react";
import { NextPageProps } from "..";
import {
  FormContainer,
  FormElement,
  FormHeader,
  FormInput,
  FormInputLabel,
  FormNavigationButton,
  FormSubmitButton,
} from "../../Components/LandingPage/reusables";

const Login: NextPage<NextPageProps> = (props) => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Submit = () => {

  };

  const ChangeLoginCred = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const value = event.target.value;
    switch (type) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  return (
    <React.Fragment>
      <FormContainer>
        <FormHeader name="Login" />
        <FormElement type="login" Submit={Submit}>
          <FormInputLabel label="Username" html_for="login_username" />
          <FormInput
            name="login_username"
            type="text"
            formType="username"
            placeholder="Username"
            value={username}
            Change={(event) => ChangeLoginCred(event, "username")}
          />

          <FormInputLabel label="Password" html_for="login_password" />
          <FormInput
            name="login_password"
            type="password"
            formType="password"
            placeholder="Password"
            value={password}
            Change={(event) => ChangeLoginCred(event, "password")}
          />
          <FormSubmitButton name="Login" />
        </FormElement>
        <FormNavigationButton
          navigateTo="/l/signup"
          name="Create new Account"
        />
      </FormContainer>
    </React.Fragment>
  );
};

export default Login;