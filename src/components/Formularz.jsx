import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import supabase from "./supabaseClient";

function Formularz() {
  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    dataUrodzenia: "",
    plec: "",
    obywatelstwo: "",
  });
  const [wiek, setWiek] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");


  // Ustalanie wieku osoby na podstawie daty urodzenia
  useEffect(() => {	
    if (formData.dataUrodzenia) {
      const dzisiaj = new Date();
      const urodziny = new Date(formData.dataUrodzenia);
      let obliczonyWiek = dzisiaj.getFullYear() - urodziny.getFullYear();
      const roznicaMiesiecy = dzisiaj.getMonth() - urodziny.getMonth();

      if (
        roznicaMiesiecy < 0 ||
        (roznicaMiesiecy === 0 && dzisiaj.getDate() < urodziny.getDate())
      ) {
        obliczonyWiek--;
      }

      setWiek(obliczonyWiek >= 0 ? obliczonyWiek : "");
    } else {
      setWiek("");
    }
  }, [formData.dataUrodzenia]);

  // Walidacja pól formularza
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "imie":
        if (!value.trim()) {
          error = "Imię jest wymagane";
        } else if (value.trim().length < 2) {
          error = "Imię musi mieć co najmniej 2 znaki";
        } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
          error = "Imię może zawierać tylko litery, spacje i myślniki";
        }
        break;

      case "nazwisko":
        if (!value.trim()) {
          error = "Nazwisko jest wymagane";
        } else if (value.trim().length < 2) {
          error = "Nazwisko musi mieć co najmniej 2 znaki";
        } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
          error = "Nazwisko może zawierać tylko litery, spacje i myślniki";
        }
        break;

      case "dataUrodzenia":
        if (!value) {
          error = "Data urodzenia jest wymagana";
        } else {
          const dzisiaj = new Date();
          const urodziny = new Date(value);
          const wiek = dzisiaj.getFullYear() - urodziny.getFullYear();

          if (urodziny > dzisiaj) {
            error = "Data urodzenia nie może być w przyszłości";
          } else if (wiek > 150) {
            error = "Podana data urodzenia jest nieprawidłowa";
          } else if (wiek < 0) {
            error = "Data urodzenia jest nieprawidłowa";
          }
        }
        break;

      case "plec":
        if (!value) {
          error = "Płeć jest wymagana";
        }
        break;

      case "obywatelstwo":
        if (!value.trim()) {
          error = "Obywatelstwo jest wymagane";
        } else if (value.trim().length < 2) {
          error = "Obywatelstwo musi mieć co najmniej 2 znaki";
        } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
          error = "Obywatelstwo może zawierać tylko litery, spacje i myślniki";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Obsługa zmiany wartości w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Obsługa opuszczenia pola
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Obsługa wysyłania formularzab 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.error("Błąd walidacji: Proszę poprawić błędy w formularzu");
      return;
    }

    setSubmitStatus("submitting");

    try {
      const dataToSubmit = {
        imie: formData.imie,
        nazwisko: formData.nazwisko,
        data_urodzenia: formData.dataUrodzenia,
        wiek: parseFloat(wiek) || 0,
        plec: formData.plec,
        obywatelstwo: formData.obywatelstwo,
      };

      const { error } = await supabase
        .from("dane_formularz")
        .insert([dataToSubmit]);

      if (error) {
        throw error;
      }

      console.log("Formularz został pomyślnie wysłany!");
      setSubmitStatus("success");

      setTimeout(() => {
        handleReset();
        setSubmitStatus("idle");
      }, 1000);
    } catch (error) {
      console.error("Błąd podczas wysyłania do Supabase:", error.message);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 2000);
    }
  };

  // Obsługa resetowania formularza
  const handleReset = () => {
    setFormData({
      imie: "",
      nazwisko: "",
      dataUrodzenia: "",
      plec: "",
      obywatelstwo: "",
    });
    setWiek("");
    setErrors({});
    setTouched({});
  };

  // Pobieranie zawartości przycisku w zależności od statusu wysyłania
  const getButtonContent = () => {
    if (submitStatus === "submitting") {
      return (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Wysyłanie...
        </>
      );
    }

    if (submitStatus === "success") {
      return "Wysłano!";
    }

    if (submitStatus === "error") {
      return "Błąd!";
    }

    return "Wyślij";
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="card-title mb-4">Formularz danych osobowych</h2>

          <div>
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <label htmlFor="imie" className="form-label">
                  Imię (imiona):
                </label>
                <input
                  id="imie"
                  name="imie"
                  type="text"
                  className={`form-control ${
                    errors.imie && touched.imie ? "is-invalid" : ""
                  } ${
                    !errors.imie && touched.imie && formData.imie
                      ? "is-valid"
                      : ""
                  }`}
                  value={formData.imie}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.imie && touched.imie && (
                  <div className="invalid-feedback d-block">{errors.imie}</div>
                )}
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="nazwisko" className="form-label">
                  Nazwisko:
                </label>
                <input
                  id="nazwisko"
                  name="nazwisko"
                  type="text"
                  className={`form-control ${
                    errors.nazwisko && touched.nazwisko ? "is-invalid" : ""
                  } ${
                    !errors.nazwisko && touched.nazwisko && formData.nazwisko
                      ? "is-valid"
                      : ""
                  }`}
                  value={formData.nazwisko}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.nazwisko && touched.nazwisko && (
                  <div className="invalid-feedback d-block">
                    {errors.nazwisko}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-9 mb-3 mb-md-0">
                <label htmlFor="dataUrodzenia" className="form-label">
                  Data urodzenia:
                </label>
                <input
                  id="dataUrodzenia"
                  name="dataUrodzenia"
                  type="date"
                  className={`form-control ${
                    errors.dataUrodzenia && touched.dataUrodzenia
                      ? "is-invalid"
                      : ""
                  } ${
                    !errors.dataUrodzenia &&
                    touched.dataUrodzenia &&
                    formData.dataUrodzenia
                      ? "is-valid"
                      : ""
                  }`}
                  value={formData.dataUrodzenia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
                {errors.dataUrodzenia && touched.dataUrodzenia && (
                  <div className="invalid-feedback d-block">
                    {errors.dataUrodzenia}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3">
                <label htmlFor="wiek" className="form-label">
                  Wiek:
                </label>
                <input
                  id="wiek"
                  type="text"
                  className="form-control bg-light"
                  value={wiek}
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="plec" className="form-label">
                  Płeć:
                </label>
                <select
                  id="plec"
                  name="plec"
                  className={`form-select ${
                    errors.plec && touched.plec ? "is-invalid" : ""
                  } ${
                    !errors.plec && touched.plec && formData.plec
                      ? "is-valid"
                      : ""
                  }`}
                  value={formData.plec}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">- Wybierz -</option>
                  <option value="k">Kobieta</option>
                  <option value="m">Mężczyzna</option>
                  <option value="in">Inna</option>
                </select>
                {errors.plec && touched.plec && (
                  <div className="invalid-feedback d-block">{errors.plec}</div>
                )}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="obywatelstwo" className="form-label">
                  Obywatelstwo:
                </label>
                <input
                  id="obywatelstwo"
                  name="obywatelstwo"
                  type="text"
                  className={`form-control ${
                    errors.obywatelstwo && touched.obywatelstwo
                      ? "is-invalid"
                      : ""
                  } ${
                    !errors.obywatelstwo &&
                    touched.obywatelstwo &&
                    formData.obywatelstwo
                      ? "is-valid"
                      : ""
                  }`}
                  value={formData.obywatelstwo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.obywatelstwo && touched.obywatelstwo && (
                  <div className="invalid-feedback d-block">
                    {errors.obywatelstwo}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                  disabled={submitStatus === "submitting"}
                >
                  Wyczyść
                </button>
                <button
                  type="button"
                  className={`btn ${
                    submitStatus === "success"
                      ? "btn-success"
                      : submitStatus === "error"
                      ? "btn-danger"
                      : "btn-primary"
                  }`}
                  onClick={handleSubmit}
                  disabled={
                    submitStatus === "submitting" || submitStatus === "success"
                  }
                >
                  {getButtonContent()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formularz;
