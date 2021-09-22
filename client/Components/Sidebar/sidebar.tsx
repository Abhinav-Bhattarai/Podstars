import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/sidebar.module.css";

export const IconContainer: React.FC<{}> = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        style: {
          fontSize: "26px",
          color: "#fefefe",
          marginLeft: '10%'
        },
      }}
    >
      {children}
    </IconContext.Provider>
  );
};

export const NavigatorContainer: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
    console.log(children);
  return (
    <nav className={styles.NavigatorContainer}>
      {children}
      <div id={styles.NavigatorName}>{name}</div>
    </nav>
  );
};

export const SidebarHeader: React.FC<{ name: string }> = ({ name }) => {
  return <div className={styles.SidebarHeader}>{name}</div>;
};

const SidebarContainer: React.FC<{}> = ({ children }) => {
  return <main className={styles.SidebarContainer}>{children}</main>;
};

export default SidebarContainer;
