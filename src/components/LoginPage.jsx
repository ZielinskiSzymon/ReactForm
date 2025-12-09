import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Wprowadź nazwę użytkownika i hasło.");
      return;
    }

    try {
      await signIn(username, password);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Błąd logowania. Sprawdź poprawność nazwy użytkownika i hasła.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card border shadow-sm p-4 p-md-5"
        style={{ maxWidth: "400px", width: "100%", borderColor: "#e9ecef" }}
      >
        <div className="text-center mb-4">
          <i className="bi bi-person-circle text-secondary display-4 mb-3"></i>
          <h2 className="h4 fw-bold text-dark">Panel Administracyjny</h2>
          <p className="text-muted small">Zaloguj się do systemu</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small rounded-1" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label small fw-bold text-secondary text-uppercase"
            >
              Nazwa Użytkownika
            </label>
            <input
              type="text"
              className="form-control bg-light border-light-subtle"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ padding: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label small fw-bold text-secondary text-uppercase"
            >
              Hasło
            </label>
            <input
              type="password"
              className="form-control bg-light border-light-subtle"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-medium"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
