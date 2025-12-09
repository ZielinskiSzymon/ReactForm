import { useState, useEffect } from "react";
import { validateField } from "../utils/validation";
import { calculateAge } from "../utils/dateUtils";

export const useFormHandling = () => {
  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    adresEmail: "",
    dataUrodzenia: "",
    pesel: "",
    plec: "",
    obywatelstwo: "",
    wybranaKategoria: "",
    kurs_id: "",
    wojewodztwo: "",
    powiat: "",
    gmina: "",
    miejscowosc: "",
    ulica: "",
    kodPocztowy: "",
    poczta: "",
    nrLokalu: "",
  });
  const [wiek, setWiek] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setWiek(calculateAge(formData.dataUrodzenia));

    if (formData.pesel) {
      const peselError = validateFieldWrapper("pesel", formData.pesel);
      setErrors((prev) => ({
        ...prev,
        pesel: peselError,
      }));
    }
  }, [formData.dataUrodzenia, formData.pesel, formData.plec]);

  const validateFieldWrapper = (name, value) => {
    return validateField(name, value, formData);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateFieldWrapper(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    if (name === "kodPocztowy") {
      const digitsOnly = value.replace(/[^\d]/g, "");

      digitsOnly.length > 2
        ? (value = digitsOnly.slice(0, 2) + "-" + digitsOnly.slice(2))
        : (value = digitsOnly);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateFieldWrapper(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleReset = () => {
    setFormData({
      imie: "",
      nazwisko: "",
      adresEmail: "",
      dataUrodzenia: "",
      pesel: "",
      plec: "",
      obywatelstwo: "",
      wybranaKategoria: "",
      kurs_id: "",
      wojewodztwo: "",
      powiat: "",
      gmina: "",
      miejscowosc: "",
      ulica: "",
      kodPocztowy: "",
      poczta: "",
      nrLokalu: "",
    });
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    setFormData,
    wiek,
    errors,
    setErrors,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    handleReset,
    validateFieldWrapper,
  };
};
