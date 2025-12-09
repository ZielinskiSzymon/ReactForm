import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchKursyKategorie,
  fetchAllCourses,
  fetchSubmissionsForCourse,
  updateKwalifikacja,
} from "../services/formularzService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AddCourseForm from "./AddCourseForm";

const SubmissionTable = ({ submissions, kursId, handleKwalifikacjaChange }) => {
  return (
    <div className="card border shadow-sm" style={{ borderColor: "#dee2e6" }}>
      <div className="card-header bg-white py-3 border-bottom">
        <h6 className="mb-0 fw-bold text-dark">Lista Zgłoszeń</h6>
      </div>
      <div className="card-body p-0">
        {submissions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 text-secondary small text-uppercase fw-bold border-bottom ps-3">
                    Imię i Nazwisko
                  </th>
                  <th className="py-3 text-secondary small text-uppercase fw-bold border-bottom">
                    PESEL
                  </th>
                  <th className="py-3 text-secondary small text-uppercase fw-bold border-bottom">
                    Email
                  </th>
                  <th
                    className="py-3 text-secondary small text-uppercase fw-bold border-bottom text-end pe-3"
                    style={{ width: "180px" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((osoba) => (
                  <tr key={osoba.id}>
                    <td className="ps-3 fw-medium text-dark">
                      {osoba.imie} {osoba.nazwisko}
                    </td>
                    <td className="text-muted">{osoba.pesel}</td>
                    <td className="text-muted">{osoba.adres_email}</td>
                    <td className="text-end pe-3">
                      <div className="form-check form-switch d-flex justify-content-end align-items-center gap-2">
                        <label
                          className="form-check-label small text-muted mb-0"
                          htmlFor={`kwalifikacja-${osoba.id}`}
                        >
                          {osoba.zakwalifikowano ? (
                            <span className="text-success fw-bold">TAK</span>
                          ) : (
                            "NIE"
                          )}
                        </label>
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          role="switch"
                          id={`kwalifikacja-${osoba.id}`}
                          checked={osoba.zakwalifikowano}
                          onChange={() =>
                            handleKwalifikacjaChange(
                              kursId,
                              osoba.id,
                              osoba.zakwalifikowano
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center text-muted">
            Brak zapisów na ten kurs.
          </div>
        )}
      </div>
    </div>
  );
};

function AdminPanel() {
  const [kategorie, setKategorie] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const [selectedKategoria, setSelectedKategoria] = useState(null);
  const [selectedKurs, setSelectedKurs] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { signOut } = useAuth();
  const navigate = useNavigate();

  const refreshData = async () => {
    try {
      const [kategorieData, coursesData] = await Promise.all([
        fetchKursyKategorie(),
        fetchAllCourses(),
      ]);
      setKategorie(kategorieData);
      setAllCourses(coursesData);

      if (!selectedKategoria && kategorieData.length > 0) {
        setSelectedKategoria(kategorieData[0]);
      }
    } catch (err) {
      console.error("Błąd odświeżania danych:", err);
      setError("Nie udało się załadować danych.");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await refreshData();
      setLoading(false);
    };
    init();
  }, []);

  const handleCourseAdded = async () => {
    setShowAddForm(false);
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  const loadSubmissions = useCallback(async (kursId, kursNazwa) => {
    setSubmissions([]);
    setSelectedKurs({ id: kursId, nazwa: kursNazwa });

    try {
      const data = await fetchSubmissionsForCourse(kursId);
      setSubmissions(data);
    } catch (err) {
      console.error(err);
      setError("Nie udało się załadować zgłoszeń.");
    }
  }, []);

  const handleKwalifikacjaChange = async (kursId, daneId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await updateKwalifikacja(daneId, newStatus);
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((osoba) =>
          osoba.id === daneId ? { ...osoba, zakwalifikowano: newStatus } : osoba
        )
      );
    } catch (err) {
      console.error(err);
      alert("Błąd aktualizacji.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter((kurs) => kurs.kategoria === selectedKategoria);
  }, [allCourses, selectedKategoria]);

  if (loading && !allCourses.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container py-5 alert alert-danger">{error}</div>;
  }

  const top4Kategorie = kategorie.slice(0, 4);

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <span className="navbar-brand fw-bold text-dark">Panel Kursów</span>
          <div className="d-flex gap-2">
            {!showAddForm && (
              <button
                className="btn btn-primary btn-sm px-3"
                onClick={() => setShowAddForm(true)}
              >
                <i className="bi bi-plus-lg me-2"></i>Dodaj Kurs
              </button>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-outline-secondary btn-sm"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {showAddForm && (
          <div className="animate-fade-in">
            <AddCourseForm
              existingCategories={kategorie}
              onSuccess={handleCourseAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="mb-4 pb-3 border-bottom">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="text-muted small fw-bold me-2 text-uppercase">
              Kategorie:
            </span>
            {top4Kategorie.map((kat) => (
              <button
                key={kat}
                className={`btn btn-sm ${
                  selectedKategoria === kat
                    ? "btn-primary"
                    : "btn-outline-secondary border-0 bg-white text-dark shadow-sm"
                }`}
                onClick={() => {
                  setSelectedKategoria(kat);
                  setSelectedKurs(null);
                  setSubmissions([]);
                }}
              >
                {kat}
              </button>
            ))}
            {top4Kategorie.length < kategorie.length && (
              <span className="text-muted small ms-2">...i inne</span>
            )}
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="card border shadow-sm"
              style={{ borderColor: "#dee2e6" }}
            >
              <div className="card-header bg-white fw-bold text-secondary border-bottom">
                Dostępne Kursy
              </div>
              <div className="list-group list-group-flush">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((kurs) => (
                    <button
                      key={kurs.id}
                      type="button"
                      className={`list-group-item list-group-item-action py-3 ${
                        selectedKurs?.id === kurs.id
                          ? "active fw-bold"
                          : "text-dark"
                      }`}
                      onClick={() => loadSubmissions(kurs.id, kurs.nazwa)}
                    >
                      {kurs.nazwa}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-muted small">
                    Brak kursów w kategorii "{selectedKategoria}".
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {selectedKurs ? (
              <>
                <h5 className="mb-3 text-dark">
                  Kurs:{" "}
                  <span className="text-primary">{selectedKurs.nazwa}</span>
                </h5>
                <SubmissionTable
                  submissions={submissions}
                  kursId={selectedKurs.id}
                  handleKwalifikacjaChange={handleKwalifikacjaChange}
                />
              </>
            ) : (
              <div className="card border-0 bg-transparent h-100 d-flex justify-content-center align-items-center text-center p-5">
                <div className="text-muted">
                  <i className="bi bi-arrow-left-circle fs-2 mb-2"></i>
                  <p>
                    Wybierz kurs z listy po lewej stronie, <br />
                    aby zobaczyć zgłoszenia.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
