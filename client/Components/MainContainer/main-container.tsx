import React from "react";
import styles from "../../styles/maincontainer.module.css";
import Image from "next/image";
import { IconContainer } from "../Sidebar/sidebar";
import { AiOutlineUser } from "react-icons/ai";

export const MainViewHeader: React.FC<{ source?: string; name: string }> = (
  props
) => {
  const { source, name } = props;
  return (
    <main id={styles.MainViewHeaderContainer}>
      <div className={styles.profileHolder}>
        {source ? (
          <Image
            src={source}
            alt="Profile"
            width="35px"
            height="35px"
            className={styles.ProfileImage}
          />
        ) : (
          <IconContainer>
            <AiOutlineUser />
          </IconContainer>
        )}
        <div id={styles.ProfileName}>{name}</div>
      </div>
    </main>
  );
};

const MainContainer: React.FC<{}> = ({ children }) => {
  return <div className={styles.MainContainer}>{children}</div>;
};

export default MainContainer;
