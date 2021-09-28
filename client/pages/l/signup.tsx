import axios from "axios";
import { NextPage } from "next";
import React, { useState } from "react";
import {
  CredentialContainer,
  FormContainer,
  FormElement,
  FormHeader,
  FormInput,
  FormInputLabel,
  FormNavigationButton,
  FormSubmitButton,
} from "../../Components/LandingPage/reusables";
import { Encrypt } from "../../Cryptography/crypto";
import { PageProps } from "../../Interfaces/interface";

export interface CredData {
  authStatus: boolean;
  error: boolean;
  userID: string;
  UserName: string;
};

export const AddLocalStorageData = (userID: string, userName: string) => {
  localStorage.setItem('userID', userID);
  localStorage.setItem('userName', userName);
}

const Signup: NextPage<PageProps> = (props) => {
  const { ChangeAuthentication } = props;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const Submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.length > 4 && password.length > 7 && confirm === password) {
      const number_regex = /[0-9]/;
      if (number_regex.exec(password) !== null) {
        const config = {
          UserName: username,
          Password: password,
          Confirm: confirm,
        };
        const EncryptedConfig = Encrypt(config);
        const { data }: { data: CredData } = await axios.post(
          "http://localhost:8080/login",
          { Enc: EncryptedConfig }
        );
        if (data.error === false) {
          if (data.authStatus === true) {
            AddLocalStorageData(data.userID, data.UserName);
            ChangeAuthentication(true);
          }
        }
      }
    }
  };

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
      <CredentialContainer>
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
      </CredentialContainer>
    </React.Fragment>
  );
};

export default Signup;
