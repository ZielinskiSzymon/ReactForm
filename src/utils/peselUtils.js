export const peselToDate = (pesel) => {
	if (!/^\d{11}$/.test(pesel)) return null
	const yy = parseInt(pesel.slice(0, 2), 10)
	let mm = parseInt(pesel.slice(2, 4), 10)
	const dd = parseInt(pesel.slice(4, 6), 10)
	let fullYear

	if (mm >= 1 && mm <= 12) {
		fullYear = 1900 + yy
	} else if (mm >= 21 && mm <= 32) {
		fullYear = 2000 + yy
		mm -= 20
	} else if (mm >= 41 && mm <= 52) {
		fullYear = 2100 + yy
		mm -= 40
	} else if (mm >= 61 && mm <= 72) {
		fullYear = 2200 + yy
		mm -= 60
	} else if (mm >= 81 && mm <= 92) {
		fullYear = 1800 + yy
		mm -= 80
	} else {
		return null
	}

	const date = new Date(fullYear, mm - 1, dd)
	if (date.getFullYear() !== fullYear || date.getMonth() !== mm - 1 || date.getDate() !== dd) {
		return null
	}

	const m = String(mm).padStart(2, '0')
	const d = String(dd).padStart(2, '0')
	return `${fullYear}-${m}-${d}`
}
