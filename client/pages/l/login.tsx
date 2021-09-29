import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import LoadingPage from "../../Components/UI/loadingPage";
import { Encrypt } from "../../Cryptography/crypto";
import { PageProps } from "../../Interfaces/interface";
import { AddLocalStorageData, CredData } from "./signup";

const Login: NextPage<PageProps> = (props) => {
  const { ChangeAuthentication, authStatus } = props;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

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
        const { data }: { data: CredData } = await axios.post(
          "http://localhost:8080/signup",
          {
            Enc: EncryptedConfig,
          },
          { withCredentials: true }
        );
        if (data.error === false) {
          if (data.authStatus) {
            AddLocalStorageData(data.userID, data.UserName);
            ChangeAuthentication(true);
          }
        }
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

  useEffect(() => {
    console.log("router changed");
    if (authStatus === true) {
      router.replace("/home");
    }
  }, [authStatus, router]);

  if (authStatus === true) {
    return (
      <React.Fragment>
        <LoadingPage />
      </React.Fragment>
    );
  }

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
