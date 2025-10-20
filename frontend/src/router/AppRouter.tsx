import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import UploadPage from "../pages/File/UploadFile";
import ReportPage from "../pages/Report/ReportPage";
import Navbar from "../layouts/Navbar/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
