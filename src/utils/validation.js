import { validatePolish } from 'validate-polish'
import { peselToDate } from './peselUtils'

export const validateField = (name, value, allValues = {}) => {
	let error = ''

    peselToDate(value)


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

		default:
			break
	}

	return error
}
