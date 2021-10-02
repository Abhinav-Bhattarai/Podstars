import React from "react";
import styles from "../../styles/maincontainer.module.css";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/dist/client/router";
import { IconContext } from "react-icons";

const IconContainer: React.FC<{}> = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        style: {
          fontSize: "35px",
          color: "#fefefe",
          marginLeft: "1%",
        },
      }}
    >
      {children}
    </IconContext.Provider>
  );
};

export const MainViewHeader: React.FC<{ source?: string; name: string }> = (
  props
) => {
  const { source, name } = props;
  const router = useRouter();

  const PushToProfileRoute = () => {
    router.push(`/profile/${localStorage.getItem('userID')}`);
  }

  return (
    <main id={styles.MainViewHeaderContainer} onClick={PushToProfileRoute}>
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

export const CardContainerNameType: React.FC<{ name: string }> = ({ name }) => {
  return (
    <main id={styles.CardContainerNameType}>
      <div
        style={{
          marginLeft: "1.5%",
        }}
      >
        {name}
      </div>
    </main>
  );
};

export const CardContainer: React.FC<{}> = ({ children }) => {
  return <main id={styles.CardContainer}>{children}</main>;
};

export const ScrollView: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.MainScrollView}>
      { children }
    </div>
  )
}

const MainContainer: React.FC<{}> = ({ children }) => {
  return <div className={styles.MainContainer}>{children}</div>;
};

export default MainContainer;