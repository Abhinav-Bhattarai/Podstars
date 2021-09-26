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

const Signup: NextPage<NextPageProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const Submit = () => {};

  const ChangeSignupCred = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = event.target.value;
    switch (type) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirm":
        setConfirm(value);
        break;
    }
  };

  return (
    <React.Fragment>
      <FormContainer>
        <FormHeader name="Signup" />
        <FormElement type="signup" Submit={Submit}>
          <FormInputLabel label="Username" html_for="signup_username" />
          <FormInput
            name="signup_username"
            type="text"
            formType="username"
            placeholder="Username"
            value={username}
            Change={(event) => ChangeSignupCred(event, "username")}
          />

          <FormInputLabel label="Password" html_for="signup_password" />
          <FormInput
            name="signup_password"
            type="password"
            formType="password"
            placeholder="Password"
            value={password}
            Change={(event) => ChangeSignupCred(event, "password")}
          />

          <FormInputLabel label="Confirm" html_for="signup_confirm" />
          <FormInput
            name="signup_confirm"
            type="password"
            formType="confirm"
            placeholder="Confirm"
            value={confirm}
            Change={(event) => ChangeSignupCred(event, "confirm")}
          />
          <FormSubmitButton name="Create Account" />
        </FormElement>
        <FormNavigationButton
          navigateTo="/l/login"
          name="Already have an account ?"
        />
      </FormContainer>
    </React.Fragment>
  );
};

export default Signup;
