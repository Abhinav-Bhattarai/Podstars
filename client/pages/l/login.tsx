import axios from "axios";
import { NextPage } from "next";
import React, { useState } from "react";
import { NextPageProps } from "..";
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

const Login: NextPage<NextPageProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.length > 4 && password.length > 7) {
      const number_regex = /[0-9]/;
      if (number_regex.exec(password) !== null) {
        const config = {
          UserName: username,
          Password: password,
        };
        const EncryptedConfig = Encrypt(config);
        const { data } = await axios.post("http://localhost:8080/signup", {
          Enc: EncryptedConfig,
        });
      }
    }
  };

  const ChangeLoginCred = (
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
    }
  };

  return (
    <React.Fragment>
      <CredentialContainer>
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
      </CredentialContainer>
    </React.Fragment>
  );
};

export default Login;
