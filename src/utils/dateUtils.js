export const calculateAge = (dateString) => {
	if (!dateString) {
		return ''
	}

	const dzisiaj = new Date()
	const urodziny = new Date(dateString)
	let obliczonyWiek = dzisiaj.getFullYear() - urodziny.getFullYear()
	const roznicaMiesiecy = dzisiaj.getMonth() - urodziny.getMonth()

	if (roznicaMiesiecy < 0 || (roznicaMiesiecy === 0 && dzisiaj.getDate() < urodziny.getDate())) {
		obliczonyWiek--
	}

	return obliczonyWiek >= 0 ? obliczonyWiek : ''
}
