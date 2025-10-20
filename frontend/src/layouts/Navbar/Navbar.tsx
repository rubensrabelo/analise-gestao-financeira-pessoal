import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <NavLink to="/" className={styles.brand}>
            MyFinance
          </NavLink>
        </div>

        <div className={styles.navRight}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.uploadLink} ${styles.active}` : styles.uploadLink
            }
            end
          >
            Upload CSV
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
