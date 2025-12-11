import { useState } from "react";
import { addCourse } from "../../services/formularzService";

const AddCourseForm = ({ existingCategories, onSuccess, onCancel }) => {
  const [nazwa, setNazwa] = useState("");
  const [ilosc, setIlosc] = useState(20);
  const [selectedCategoryMode, setSelectedCategoryMode] = useState("existing");
  const [selectedCategory, setSelectedCategory] = useState(
    existingCategories.length > 0 ? existingCategories[0] : ""
  );
  const [newCategoryName, setNewCategoryName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalCategory =
      selectedCategoryMode === "existing" ? selectedCategory : newCategoryName;

    if (!nazwa || !finalCategory || ilosc < 1) {
      setError(
        "Wypełnij nazwę kursu, wybierz kategorię oraz podaj poprawną liczbę miejsc (min. 1)."
      );
      return;
    }

    setLoading(true);
    try {
      await addCourse(nazwa, finalCategory, ilosc);
      setNazwa("");
      setNewCategoryName("");
      setIlosc(20);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Nie udało się dodać kursu. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card border shadow-sm mb-4"
      style={{ borderColor: "#dee2e6" }}
    >
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-bold text-dark">Dodaj Nowy Kurs</h6>
        <button
          onClick={onCancel}
          className="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <div className="card-body p-4">
        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
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

          <div className="mt-3 mb-4">
            <label className="form-label small fw-bold text-secondary text-uppercase">
              Kategoria
            </label>

            <div className="d-flex gap-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="catMode"
                  id="catExisting"
                  checked={selectedCategoryMode === "existing"}
                  onChange={() => setSelectedCategoryMode("existing")}
                  disabled={existingCategories.length === 0}
                />
                <label className="form-check-label small" htmlFor="catExisting">
                  Wybierz z listy
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="catMode"
                  id="catNew"
                  checked={selectedCategoryMode === "new"}
                  onChange={() => setSelectedCategoryMode("new")}
                />
                <label className="form-check-label small" htmlFor="catNew">
                  Nowa kategoria
                </label>
              </div>
            </div>

            {selectedCategoryMode === "existing" ? (
              <select
                className="form-select bg-light border-light-subtle"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={existingCategories.length === 0}
              >
                <option value="">-- Wybierz kategorię --</option>
                {existingCategories.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="form-control bg-light border-light-subtle"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Wpisz nazwę nowej kategorii..."
              />
            )}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline-secondary btn-sm"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm px-4"
              disabled={loading}
            >
              {loading ? "Dodawanie..." : "Dodaj Kurs"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
