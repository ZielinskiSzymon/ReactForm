# ReactForm

ReactForm to aplikacja formularza zbudowana w oparciu o **React** i
**Vite**, wykorzystująca niestandardowe hooki, walidację danych oraz
integrację z backendem. Projekt umożliwia dynamiczne pobieranie
kategorii kursów, wyświetlanie powiązanych danych oraz obsługę i
wysyłanie formularza.

## 🚀 Funkcje

-   Dynamiczne pobieranie danych -- kategorie i kursy ładowane z
    backendu.
-   Niestandardowe hooki React:
    -   useCourses -- pobieranie kategorii i kursów.
    -   useFormHandling -- zarządzanie stanem i walidacją formularza.
    -   useLocation -- pobieranie danych lokalizacyjnych (jeśli
        wykorzystywane).
    -   useSubmit -- wysyłanie formularza do API.
-   Walidacja danych -- obsługa reguł walidacyjnych (np. przez
    validate-polish).
-   Bootstrap UI -- responsywny i przejrzysty interfejs.
-   Vite -- ultraszybkie środowisko uruchomieniowe.

## 📦 Wymagania

-   Node.js ≥ 18
-   npm lub yarn

## 🔧 Instalacja

``` bash
git clone https://github.com/ZielinskiSzymon/ReactForm.git
cd ReactForm
npm install
npm run dev
```

## 📂 Struktura projektu

    src/
     ├─ components/
     ├─ hooks/
     ├─ services/
     ├─ pages/
     ├─ App.jsx
     └─ main.jsx

## 📘 Dokumentacja hooków

### useCourses

Pobiera listę kategorii oraz kursów.

``` jsx
import { useCourses } from './src/hooks/useCourses';

const MyComponent = () => {
  const { kategorie, kursy, loadingKategorie, loadingKursy } = useCourses();

  if (loadingKategorie) return <p>Ładowanie kategorii...</p>;
  if (loadingKursy) return <p>Ładowanie kursów...</p>;

  return <div>{/* Dane */}</div>;
};
```

## 🌐 Backend API

Przykładowe endpointy:

    GET /api/kategorie
    GET /api/kursy?kategoriaId=ID
    POST /api/formularz

## 🤝 Współpraca

1.  Fork repozytorium
2.  Utwórz nowy branch
3.  Wprowadź zmiany
4.  Wyślij Pull Request

## 📜 Licencja

MIT License
