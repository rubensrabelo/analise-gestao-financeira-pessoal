import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import UploadPage from "../pages/Upload/UploadFile";
import styles from "./AppRouter.module.css";
import ReportPage from "../pages/Report/ReportPage";

function AppRouter() {
  return (
    <Router>
      <nav className={styles.navbar}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Upload CSV
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
