import { useState } from "react";
import { updateCourse, deleteCourse } from "../../services/formularzService";

const EditCourseModal = ({ kurs, onClose, onSuccess, onDelete }) => {
  const [nazwa, setNazwa] = useState(kurs.nazwa);
  const [ilosc, setIlosc] = useState(kurs.ilosc || 20);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const finalCategory = kurs.kategoria; 

    if (!nazwa || ilosc < 1) {
      setError(
        "Wypełnij nazwę kursu oraz podaj poprawną liczbę miejsc (min. 1)."
      );
      return;
    }

    setLoading(true);
    try {
      await updateCourse(kurs.id, nazwa, finalCategory, ilosc);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Nie udało się zaktualizować kursu. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Czy na pewno chcesz usunąć kurs "${kurs.nazwa}"? Spowoduje to usunięcie wszystkich zgłoszeń z nim związanych.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCourse(kurs.id);
      if (onDelete) onDelete();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Nie udało się usunąć kursu.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!kurs) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edycja Kursu: {kurs.nazwa}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading || isDeleting}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger py-2 small">{error}</div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="row g-3 mb-3">
                <div className="col-md-8">
                  <label className="form-label small fw-bold text-secondary text-uppercase">
                    Nazwa Kursu
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light border-light-subtle"
                    value={nazwa}
                    onChange={(e) => setNazwa(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary text-uppercase">
                    Max Uczestników
                  </label>
                  <input
                    type="number"
                    className="form-control bg-light border-light-subtle"
                    value={ilosc}
                    onChange={(e) => setIlosc(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
              </div>

              {}

              <div className="d-flex justify-content-between pt-3 border-top">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger btn-sm"
                  disabled={loading || isDeleting}
                >
                  {isDeleting ? "Usuwanie..." : "Usuń Kurs"}
                </button>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-outline-secondary btn-sm"
                    disabled={loading || isDeleting}
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm px-4"
                    disabled={loading || isDeleting}
                  >
                    {loading ? "Aktualizacja..." : "Zapisz Zmiany"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
