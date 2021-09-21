import React from "react";
import styles from "../../styles/about.module.css";

interface LandingPageContextViewProps {
  backgroundColor: string;
}

interface NavContainerProps {
  initialFlex: number;
  id: string;
}

export const NavigatorContainer: React.FC<NavContainerProps> = (props) => {
  const { initialFlex, id, children } = props;
  return (
    <div
      className={styles.NavigatorContainer}
      style={{ flex: initialFlex }}
      id={styles[id]}
    >
      {children}
    </div>
  );
};

export const Navbar: React.FC<{}> = ({ children }) => {
  return <main className={styles.navbarLP}>{children}</main>;
};

export const Title: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => {
  return (
    <div className={styles.TitleOverviewWords} style={{ color }}>
      {name}
    </div>
  );
};

export const FunctionsSection: React.FC<{}> = ({ children }) => {
  return <div className={styles.FunctionsSection}>{children}</div>;
};

export const TitleOverview: React.FC<{}> = ({ children }) => {
  return <div className={styles.TitleOverview}>{children}</div>;
};

export const LandingPageContextView: React.FC<LandingPageContextViewProps> = (
  props
) => {
  const { backgroundColor, children } = props;
  return (
    <React.Fragment>
      <main
        className={styles.LandingPageContextView}
        style={{ backgroundColor }}
      >
        {children}
      </main>
    </React.Fragment>
  );
};