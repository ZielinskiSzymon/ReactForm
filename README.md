# ReactForm

ReactForm to aplikacja formularza zbudowana w oparciu o **React** i
**Vite**, wykorzystująca niestandardowe hooki, walidację danych oraz
integrację z backendem. Projekt umożliwia dynamiczne pobieranie
kategorii kursów, wyświetlanie powiązanych danych oraz obsługę i
wysyłanie formularza.

## 🚀 Funkcje

- Dynamiczne pobieranie danych -- kategorie i kursy ładowane z
  backendu.
- Niestandardowe hooki React:
  - useCourses -- pobieranie kategorii i kursów.
  - useFormHandling -- zarządzanie stanem i walidacją formularza.
  - useLocation -- pobieranie danych lokalizacyjnych (jeśli
    wykorzystywane).
  - useSubmit -- wysyłanie formularza do API.
- Walidacja danych -- obsługa reguł walidacyjnych (np. przez
  validate-polish).
- Bootstrap UI -- responsywny i przejrzysty interfejs.
- Vite -- ultraszybkie środowisko uruchomieniowe.

## 📦 Wymagania

- Node.js ≥ 18
- npm lub yarn

## 🔧 Instalacja

```bash
git clone https://github.com/ZielinskiSzymon/ReactForm.git
cd ReactForm
npm install
npm run dev
```

## 🔐 Stwórz plik .env

```env
VITE_SUPABASE_URL = twój link do bazy
VITE_SUPABASE_ANON_KEY = twój klucz api
```

## 📜 Licencja

MIT License
