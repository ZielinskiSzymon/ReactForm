import { useState, useEffect } from "react";
import {
  fetchQualifiedCount,
  fetchSubmissionCount,
} from "../../services/formularzService";

const CourseSidebar = ({
  kategorie,
  filteredCourses,
  selectedKategoria,
  selectedKurs,
  setSelectedKategoria,
  setSelectedKurs,
  loadSubmissions,
}) => {
  const top4Kategorie = kategorie.slice(0, 4);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let mounted = true;
    const loadCounts = async () => {
      try {
        const entries = await Promise.all(
          filteredCourses.map(async (k) => {
            const accepted = await fetchQualifiedCount(k.id);
            const total = await fetchSubmissionCount(k.id);
            return [k.id, { accepted: accepted || 0, total: total || 0 }];
          })
        );
        if (!mounted) return;
        setCounts(Object.fromEntries(entries));
      } catch (err) {
        console.warn("Błąd pobierania liczby uczestników:", err);
      }
    };

    if (filteredCourses && filteredCourses.length > 0) {
      loadCounts();
    } else {
      setCounts({});
    }

    return () => {
      mounted = false;
    };
  }, [filteredCourses]);

  
  useEffect(() => {
    const handler = (e) => {
      const { kursId, delta } = e.detail || {};
      if (!kursId || typeof delta !== "number") return;
      setCounts((prev) => {
        
        const prevObj = prev[kursId] || { accepted: 0, total: 0 };
        const nextAccepted = Math.max(0, (prevObj.accepted || 0) + delta);
        return { ...prev, [kursId]: { ...prevObj, accepted: nextAccepted } };
      });
    };

    window.addEventListener("participant-count-changed", handler);
    return () =>
      window.removeEventListener("participant-count-changed", handler);
  }, []);

  return (
    <div className="col-md-4">
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

      <div className="card border shadow-sm" style={{ borderColor: "#dee2e6" }}>
        <div className="card-header bg-white fw-bold text-secondary border-bottom">
          Dostępne Kursy
        </div>
        <div className="list-group list-group-flush">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((kurs) => {
              const data = counts[kurs.id] || { accepted: 0, total: 0 };
              const accepted = data.accepted || 0;
              const total = data.total || 0;
              const max = kurs.ilosc ?? "—";
              const percent = kurs.ilosc
                ? Math.min(100, Math.round((accepted / kurs.ilosc) * 100))
                : 0;

              return (
                <button
                  key={kurs.id}
                  type="button"
                  className={`list-group-item list-group-item-action py-3 ${
                    selectedKurs?.id === kurs.id
                      ? "active fw-bold"
                      : "text-dark"
                  }`}
                  onClick={() => {
                    setSelectedKurs(kurs);
                    loadSubmissions(kurs);
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="me-2 text-truncate"
                      style={{ maxWidth: "65%" }}
                    >
                      {kurs.nazwa}
                    </div>
                    <div className="text-end small text-muted">
                      <div
                        className="d-inline-flex align-items-center p-1 rounded"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        <span
                          className="badge bg-primary me-2"
                          style={{ minWidth: 28, textAlign: "center" }}
                          aria-label={`Liczba zgłoszeń: ${total}`}
                        >
                          {total}
                        </span>
                        <span
                          className="badge bg-light text-muted me-2"
                          aria-label={`Przyjęci / miejsca: ${accepted} na ${max}`}
                        >
                          {accepted} / {max}
                        </span>
                      </div>
                    </div>
                  </div>
                  {typeof kurs.ilosc === "number" && (
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${percent}%` }}
                        aria-valuenow={percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="p-3 text-muted small">
              Brak kursów w kategorii "{selectedKategoria}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
