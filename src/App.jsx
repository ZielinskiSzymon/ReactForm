import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Formularz from "./components/form/Formularz";
import AdminPanel from "./components/admin/AdminPanel";
import PrivateRoute from "./components/loginPage/PrivateRoute";
import LoginPage from "./components/loginPage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formularz />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
