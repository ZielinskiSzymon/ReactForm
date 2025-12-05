import { validatePolish } from 'validate-polish'
import { peselToDate } from './peselUtils'

export const validateField = (name, value, allValues = {}) => {
	let error = ''

	switch (name) {
		case 'imie':
			if (!value.trim()) {
				error = 'Imię jest wymagane'
			} else if (value.trim().length < 2) {
				error = 'Imię musi mieć co najmniej 2 znaki'
			} else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
				error = 'Imię może zawierać tylko litery, spacje i myślniki'
			}
			break

		case 'nazwisko':
			if (!value.trim()) {
				error = 'Nazwisko jest wymagane'
			} else if (value.trim().length < 2) {
				error = 'Nazwisko musi mieć co najmniej 2 znaki'
			} else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
				error = 'Nazwisko może zawierać tylko litery, spacje i myślniki'
			}
			break

		case 'adresEmail':
			if (!value.trim()) {
				error = 'Email jest wymagany'
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				error = 'Nieprawidłowy format email'
			}
			break

		case 'pesel':
			if (!value.trim()) {
				error = 'PESEL jest wymagany'
			} else if (!/^\d{11}$/.test(value)) {
				error = 'PESEL musi składać się z 11 cyfr'
			} else if (!validatePolish.pesel(value)) {
				error = 'Nieprawidłowy numer PESEL'
			} else {
				const providedDate = allValues && allValues.dataUrodzenia ? allValues.dataUrodzenia : null
				const peselDate = peselToDate(value)
				if (providedDate && peselDate) {
					if (providedDate !== peselDate) {
						error = 'PESEL nie zgadza się z datą urodzenia'
					}
				}

				const providedPlec = allValues && allValues.plec ? allValues.plec : null
				if (!error && providedPlec) {
					const plecCyfra = parseInt(value.charAt(9), 10)
					const isMale = plecCyfra % 2 !== 0
					const isFemale = plecCyfra % 2 === 0

					if (providedPlec === 'Mężczyzna' && !isMale) {
						error = 'PESEL nie zgadza się z wybraną płcią'
					} else if (providedPlec === 'Kobieta' && !isFemale) {
						error = 'PESEL nie zgadza się z wybraną płcią'
					}
				}
			}
			break

		case 'dataUrodzenia':
			if (!value) {
				error = 'Data urodzenia jest wymagana'
			} else {
				const dzisiaj = new Date()
				const urodziny = new Date(value)
				const wiek = dzisiaj.getFullYear() - urodziny.getFullYear()

				if (urodziny > dzisiaj) {
					error = 'Data urodzenia nie może być w przyszłości'
				} else if (wiek > 150) {
					error = 'Podana data urodzenia jest nieprawidłowa'
				} else if (wiek < 0) {
					error = 'Data urodzenia jest nieprawidłowa'
				}
			}
			break

		case 'plec':
			if (!value) {
				error = 'Płeć jest wymagana'
			}
			break

		case 'obywatelstwo':
			if (!value.trim()) {
				error = 'Obywatelstwo jest wymagane'
			} else if (value.trim().length < 2) {
				error = 'Obywatelstwo musi mieć co najmniej 2 znaki'
			} else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
				error = 'Obywatelstwo może zawierać tylko litery, spacje i myślniki'
			}
			break

		case 'wybranaKategoria':
			if (!value) {
				error = 'Kategoria kursu jest wymagana'
			}
			break

		case 'kurs_id':
			if (!value) {
				error = 'Kurs jest wymagany'
			}
			break

		case 'wojewodztwo':
			if (!value) {
				error = 'Województwo jest wymagane'
			}
			break

		case 'powiat':
			if (!value) {
				error = 'Powiat jest wymagany'
			}
			break

		case 'gmina':
			if (!value) {
				error = 'Gmina jest wymagana'
			}
			break

		case 'miejscowosc':
			if (!value) {
				error = 'Miejscowość jest wymagana'
			}
			break

		case 'ulica':
			if (!value.trim()) {
				error = 'Ulica i numer domu/mieszkania są wymagane'
			} else if (value.trim().length < 3) {
				error = 'Adres musi mieć co najmniej 3 znaki'
			} else if (!/^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s/.-]+$/.test(value.trim())) {
				error = 'Adres zawiera nieprawidłowe znaki'
			}
			break

		case 'kodPocztowy':
			if (!value.trim()) {
				error = 'Kod pocztowy jest wymagany'
			} else if (!/^\d{2}-\d{3}$/.test(value.trim())) {
				error = 'Nieprawidłowy format kodu pocztowego (wymagany XX-XXX)'
			}
			break

		case 'poczta':
			if (!value.trim()) {
				error = 'Poczta jest wymagana'
			} else if (value.trim().length < 2) {
				error = 'Nazwa poczty musi mieć co najmniej 2 znaki'
			} else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value.trim())) {
				error = 'Nazwa poczty może zawierać tylko litery, spacje i myślniki'
			}
			break

		case 'nrLokalu':
			if (value.trim() && !/^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s/.-]+$/.test(value.trim())) {
				error = 'Numer lokalu zawiera nieprawidłowe znaki'
			}
			break

		default:
			break
	}

	return error
}
