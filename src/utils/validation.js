import { validatePolish } from "validate-polish";
import { peselToGender, peselToDate } from "./peselUtils";

export const validateField = (name, value, allValues = {}) => {
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

    case "adresEmail":
      if (!value.trim()) {
        error = "Email jest wymagany";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Nieprawidłowy format email";
      }
      break;

    case "dataUrodzenia":
      if (!value) {
        error = "Data urodzenia jest wymagana";
      } else {
        const dataUrodzenia = new Date(value);
        const dzisiaj = new Date();
        const pelnoletni = new Date(
          dzisiaj.setFullYear(dzisiaj.getFullYear() - 18)
        );
        if (dataUrodzenia > pelnoletni) {
          error = "Musisz być pełnoletni (mieć ukończone 18 lat)";
        }
      }
      break;

    case "pesel":
      if (!value.trim()) {
        error = "PESEL jest wymagany";
      } else if (value.length !== 11) {
        error = "PESEL musi mieć 11 cyfr";
      } else if (!/^\d{11}$/.test(value)) {
        error = "PESEL musi składać się wyłącznie z cyfr";
      } else if (!validatePolish.pesel(value)) {
        error = "Nieprawidłowy numer PESEL";
      } else {
        const peselInfo = peselToDate(value);

        if (peselInfo) {
          if (peselInfo.date !== allValues.dataUrodzenia) {
            error = "Data urodzenia w PESELu nie zgadza się z podaną datą";
          } else if (
            allValues.plec &&
            peselToGender(value) !== allValues.plec
          ) {
            error = "Płeć w PESELu nie zgadza się z wybraną płcią";
          }
        } else {
          error = "Nieprawidłowy PESEL (błąd w dacie)";
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
      } else if (value.trim().length < 3) {
        error = "Obywatelstwo musi mieć co najmniej 3 znaki";
      }
      break;

    case "wybranaKategoria":
      if (!value) {
        error = "Kategoria kursu jest wymagana";
      }
      break;

    case "kurs_id":
      if (!value) {
        error = "Wybór kursu jest wymagany";
      }
      break;

    case "wojewodztwo":
      if (!value) {
        error = "Województwo jest wymagane";
      }
      break;

    case "powiat":
      if (!value) {
        error = "Powiat jest wymagany";
      }
      break;

    case "gmina":
      if (!value) {
        error = "Gmina jest wymagana";
      }
      break;

    case "miejscowosc":
      if (!value) {
        error = "Miejscowość jest wymagana";
      }
      break;

    case "ulica":
      if (!value.trim()) {
        error = "Ulica i numer domu/mieszkania są wymagane";
      } else if (value.trim().length < 3) {
        error = "Adres musi mieć co najmniej 3 znaki";
      } else if (!/^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s/.-]+$/.test(value.trim())) {
        error = "Adres zawiera nieprawidłowe znaki";
      }
      break;

    case "kodPocztowy":
      if (!value.trim()) {
        error = "Kod pocztowy jest wymagany";
      } else if (!/^\d{2}-\d{3}$/.test(value.trim())) {
        error = "Nieprawidłowy format kodu pocztowego (wymagany XX-XXX)";
      }
      break;

    case "poczta":
      if (!value.trim()) {
        error = "Poczta jest wymagana";
      } else if (value.trim().length < 3) {
        error = "Poczta musi mieć co najmniej 3 znaki";
      } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value.trim())) {
        error = "Poczta może zawierać tylko litery i spacje";
      }
      break;

    case "nrLokalu":
      if (!value.trim()) {
        error = "Numer lokalu jest wymagany";
      } else if (!/^[a-zA-Z0-9/.-]+$/.test(value.trim())) {
        error = "Numer lokalu zawiera nieprawidłowe znaki";
      }
      break;

    default:
      break;
  }

  return error;
};
