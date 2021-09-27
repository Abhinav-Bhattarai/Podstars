import React from "react";
import styles from "../../styles/cred.module.scss";
import {
  FormElementProps,
  FormHeaderProps,
  FormInputLabelProps,
  FormInputProps,
  FormSubmitButtonProps,
} from "./interface";
import { useRouter } from "next/router";

export const FormContainer: React.FC<{}> = ({ children }) => {
  return <main id={styles["form-container"]}>{children}</main>;
};

export const FormHeader: React.FC<FormHeaderProps> = ({ name }) => {
  return <header id={styles["form-header"]}>{name}</header>;
};

export const FormElement: React.FC<FormElementProps> = ({
  children,
  Submit,
  type
}) => {
  return (
    <React.Fragment>
      <form id={styles["submit-form"]} onSubmit={(event) => Submit(event, type)}>
        {children}
      </form>
    </React.Fragment>
  );
};

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { name, Change, type, value, placeholder, formType } = props;
  return (
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      spellCheck="false"
      className={styles["form-input"]}
      onChange={(event) => Change(event, formType)}
      autoComplete="on"
    />
  );
};

export const FormInputLabel: React.FC<FormInputLabelProps> = (props) => {
  const { html_for, label } = props;
  return (
    <label htmlFor={html_for} id={styles["form-input-label"]}>
      {label}
    </label>
  );
};

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = (props) => {
  const { name } = props;
  return (
    <button id={styles["form-submit-btn"]} type="submit">
      {name}
    </button>
  );
};

export const FormNavigationButton: React.FC<{
  name: string;
  navigateTo: string;
}> = ({ name, navigateTo }) => {
  const router = useRouter();
  const ChangeUrl = () => router.push(navigateTo);
  return (
    <button id={styles["form-navigation-btn"]} onClick={ChangeUrl}>
      {name}
    </button>
  );
};

export const CredentialContainer: React.FC<{}> = ({ children }) => {
  return (
    <main id={styles['credential-container']}>
      { children }
    </main>
  )
}