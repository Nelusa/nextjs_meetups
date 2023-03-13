import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default Layout;
