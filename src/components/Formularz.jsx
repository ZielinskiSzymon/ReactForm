import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { submitFormData, fetchKursyKategorie, fetchKursyByKategoria } from '../services/formularzService'
import { validateField } from '../utils/validation'
import { calculateAge } from '../utils/dateUtils'

function Formularz() {
	const [formData, setFormData] = useState({
		imie: '',
		nazwisko: '',
		adresEmail: '',
		dataUrodzenia: '',
		pesel: '',
		plec: '',
		obywatelstwo: '',
		kurs_id: '',
	})
	const [wiek, setWiek] = useState('')
	const [errors, setErrors] = useState({})
	const [touched, setTouched] = useState({})
	const [submitStatus, setSubmitStatus] = useState('idle')
	const [kategorie, setKategorie] = useState([])
	const [wybranaKategoria, setWybranaKategoria] = useState('')
	const [kursy, setKursy] = useState([])
	const [loadingKategorie, setLoadingKategorie] = useState(false)
	const [loadingKursy, setLoadingKursy] = useState(false)

	// Pobieranie kategorii przy montowaniu komponentu
	useEffect(() => {
		const loadKategorie = async () => {
			setLoadingKategorie(true)
			try {
				const data = await fetchKursyKategorie()
				setKategorie(data)
			} catch (error) {
				console.error('Błąd podczas pobierania kategorii:', error.message)
			} finally {
				setLoadingKategorie(false)
			}
		}
		loadKategorie()
	}, [])

	// Pobieranie kursów po wyborze kategorii
	useEffect(() => {
		if (wybranaKategoria) {
			const loadKursy = async () => {
				setLoadingKursy(true)
				try {
					const data = await fetchKursyByKategoria(wybranaKategoria)
					setKursy(data)
					// Resetowanie wybranego kursu przy zmianie kategorii
					setFormData((prev) => ({
						...prev,
						kurs_id: '',
					}))
				} catch (error) {
					console.error('Błąd podczas pobierania kursów:', error.message)
					// W przypadku błędu czyścimy listę kursów i zaznaczony kurs,
					// aby nie pozostawiać nieaktualnych opcji
					setKursy([])
					setFormData((prev) => ({
						...prev,
						kurs_id: '',
					}))
				} finally {
					setLoadingKursy(false)
				}
			}
			loadKursy()
		} else {
			setKursy([])
			setFormData((prev) => ({
				...prev,
				kurs_id: '',
			}))
		}
	}, [wybranaKategoria])

	// Ustalanie wieku osoby na podstawie daty urodzenia i powtórna weryfikacja peselu po zmianie daty urodzenia
	useEffect(() => {
		setWiek(calculateAge(formData.dataUrodzenia))

		if (formData.pesel) {
			const peselError = validateFieldWrapper('pesel', formData.pesel)
			setErrors((prev) => ({
				...prev,
				pesel: peselError,
			}))
		}
	}, [formData.dataUrodzenia, formData.pesel, errors.pesel])

	// Walidacja pól formularza
	const validateFieldWrapper = (name, value) => {
		let error = ''

		// przekazujemy całe formData jako trzeci argument, żeby walidacja PESel mogła porównać datę urodzenia
		error = validateField(name, value, formData)

		return error
	}

	// Obsługa zmiany kategorii
	const handleKategoriaChange = (e) => {
		const value = e.target.value
		setWybranaKategoria(value)
		setTouched((prev) => ({
			...prev,
			wybranaKategoria: true,
		}))
	}

	// Obsługa zmiany kursu
	const handleKursChange = (e) => {
		const { value } = e.target
		setFormData((prev) => ({
			...prev,
			kurs_id: value,
		}))
		setTouched((prev) => ({
			...prev,
			kurs_id: true,
		}))
	}

	// Obsługa zmiany wartości w polach formularza
	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		if (touched[name]) {
			const error = validateFieldWrapper(name, value)
			setErrors((prev) => ({
				...prev,
				[name]: error,
			}))
		}
	}

	// Obsługa opuszczenia pola
	const handleBlur = (e) => {
		const { name, value } = e.target
		setTouched((prev) => ({
			...prev,
			[name]: true,
		}))

		const error = validateFieldWrapper(name, value)
		setErrors((prev) => ({
			...prev,
			[name]: error,
		}))
	}

	// Obsługa wysyłania formularza
	const handleSubmit = async (e) => {
		e.preventDefault()

		const newErrors = {}
		Object.keys(formData).forEach((key) => {
			const error = validateFieldWrapper(key, formData[key])
			if (error) {
				newErrors[key] = error
			}
		})

		const allTouched = {}
		Object.keys(formData).forEach((key) => {
			allTouched[key] = true
		})
		setTouched(allTouched)

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			console.error('Błąd walidacji: Proszę poprawić błędy w formularzu')
			return
		}

		setSubmitStatus('submitting')

		try {
			await submitFormData({ ...formData, wiek })

			console.log('Formularz został pomyślnie wysłany!')
			setSubmitStatus('success')

			setTimeout(() => {
				handleReset()
				setSubmitStatus('idle')
			}, 1000)
		} catch (error) {
			console.error('Błąd podczas wysyłania do Supabase:', error.message)
			setSubmitStatus('error')
			setTimeout(() => {
				setSubmitStatus('idle')
			}, 2000)
		}
	}

	// Obsługa resetowania formularza
	const handleReset = () => {
		setFormData({
			imie: '',
			nazwisko: '',
			adresEmail: '',
			dataUrodzenia: '',
			pesel: '',
			plec: '',
			obywatelstwo: '',
			kurs_id: '',
		})
		setWiek('')
		setErrors({})
		setTouched({})
		setWybranaKategoria('')
	}

	// Pobieranie zawartości przycisku w zależności od statusu wysyłania
	const getButtonContent = () => {
		if (submitStatus === 'submitting') {
			return (
				<>
					<span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
					Wysyłanie...
				</>
			)
		}

		if (submitStatus === 'success') {
			return 'Wysłano!'
		}

		if (submitStatus === 'error') {
			return 'Błąd!'
		}

		return 'Wyślij'
	}

	return (
		<div className='container mt-4' style={{ maxWidth: '800px' }}>
			<div className='card shadow-sm'>
				<div className='card-body p-4'>
					<h2 className='card-title mb-4'>Formularz danych osobowych</h2>

					<div>
						<div className='row mb-3'>
							<div className='col-12 col-md-6 mb-3 mb-md-0'>
								{/* Imie */}

								<label htmlFor='imie' className='form-label'>
									Imię (imiona):
								</label>
								<input
									id='imie'
									name='imie'
									type='text'
									className={`form-control ${errors.imie && touched.imie ? 'is-invalid' : ''} ${
										!errors.imie && touched.imie && formData.imie ? 'is-valid' : ''
									}`}
									value={formData.imie}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								{errors.imie && touched.imie && <div className='invalid-feedback d-block'>{errors.imie}</div>}
							</div>
							<div className='col-12 col-md-6'>
								{/* Nazwisko */}

								<label htmlFor='nazwisko' className='form-label'>
									Nazwisko:
								</label>
								<input
									id='nazwisko'
									name='nazwisko'
									type='text'
									className={`form-control ${errors.nazwisko && touched.nazwisko ? 'is-invalid' : ''} ${
										!errors.nazwisko && touched.nazwisko && formData.nazwisko ? 'is-valid' : ''
									}`}
									value={formData.nazwisko}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								{errors.nazwisko && touched.nazwisko && (
									<div className='invalid-feedback d-block'>{errors.nazwisko}</div>
								)}
							</div>
						</div>

						<div className='row mb-3'>
							<div className='col-12'>
								{/* Adres email */}

								<label htmlFor='adresEmail' className='form-label'>
									Adres email:
								</label>
								<input
									id='adresEmail'
									name='adresEmail'
									type='text'
									className={`form-control ${errors.adresEmail && touched.adresEmail ? 'is-invalid' : ''} ${
										!errors.adresEmail && touched.adresEmail && formData.adresEmail ? 'is-valid' : ''
									}`}
									value={formData.adresEmail}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								{errors.adresEmail && touched.adresEmail && (
									<div className='invalid-feedback d-block'>{errors.adresEmail}</div>
								)}
							</div>
						</div>

						<div className='row mb-3'>
							<div className='col-12 col-md-9 mb-3 mb-md-0'>
								{/* Data urodzenia */}

								<label htmlFor='dataUrodzenia' className='form-label'>
									Data urodzenia:
								</label>
								<input
									id='dataUrodzenia'
									name='dataUrodzenia'
									type='date'
									className={`form-control ${errors.dataUrodzenia && touched.dataUrodzenia ? 'is-invalid' : ''} ${
										!errors.dataUrodzenia && touched.dataUrodzenia && formData.dataUrodzenia ? 'is-valid' : ''
									}`}
									value={formData.dataUrodzenia}
									onChange={handleChange}
									onBlur={handleBlur}
									max={new Date().toISOString().split('T')[0]}
									required
								/>
								{errors.dataUrodzenia && touched.dataUrodzenia && (
									<div className='invalid-feedback d-block'>{errors.dataUrodzenia}</div>
								)}
							</div>
							<div className='col-12 col-md-3'>
								<label htmlFor='wiek' className='form-label'>
									Wiek:
								</label>
								<input id='wiek' type='text' className='form-control bg-light' value={wiek} disabled readOnly />
							</div>
						</div>

						<div className='row mb-3'>
							<div className='col-12'>
								{/* Pesel */}

								<label htmlFor='pesel' className='form-label'>
									Pesel:
								</label>
								<input
									id='pesel'
									name='pesel'
									type='text'
									className={`form-control ${errors.pesel && touched.pesel ? 'is-invalid' : ''} ${
										!errors.pesel && touched.pesel && formData.pesel ? 'is-valid' : ''
									}`}
									value={formData.pesel}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								{errors.pesel && touched.pesel && <div className='invalid-feedback d-block'>{errors.pesel}</div>}
							</div>
						</div>

						<div className='row mb-3'>
							<div className='col-12'>
								{/* Płeć */}

								<label htmlFor='plec' className='form-label'>
									Płeć:
								</label>
								<select
									id='plec'
									name='plec'
									className={`form-select ${errors.plec && touched.plec ? 'is-invalid' : ''} ${
										!errors.plec && touched.plec && formData.plec ? 'is-valid' : ''
									}`}
									value={formData.plec}
									onChange={handleChange}
									onBlur={handleBlur}
									required>
									<option value=''>- Wybierz -</option>
									<option value='k'>Kobieta</option>
									<option value='m'>Mężczyzna</option>
									<option value='in'>Inna</option>
								</select>
								{errors.plec && touched.plec && <div className='invalid-feedback d-block'>{errors.plec}</div>}
							</div>
						</div>

						<div className='row mb-4'>
							<div className='col-12'>
								{/* Obywatelstwo */}

								<label htmlFor='obywatelstwo' className='form-label'>
									Obywatelstwo:
								</label>
								<input
									id='obywatelstwo'
									name='obywatelstwo'
									type='text'
									className={`form-control ${errors.obywatelstwo && touched.obywatelstwo ? 'is-invalid' : ''} ${
										!errors.obywatelstwo && touched.obywatelstwo && formData.obywatelstwo ? 'is-valid' : ''
									}`}
									value={formData.obywatelstwo}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								{errors.obywatelstwo && touched.obywatelstwo && (
									<div className='invalid-feedback d-block'>{errors.obywatelstwo}</div>
								)}
							</div>
						</div>


						<div className='row mb-3'>
							<div className='col-12'>
								{/* Kategoria kursu */}

								<label htmlFor='wybranaKategoria' className='form-label'>
									Kategoria kursu:
								</label>
								<select
									id='wybranaKategoria'
									className='form-select'
									value={wybranaKategoria}
									onChange={handleKategoriaChange}
									disabled={loadingKategorie}>
									<option value=''>- Wybierz kategorię -</option>
									{kategorie.map((kat) => (
										<option key={kat} value={kat}>
											{kat}
										</option>
									))}
								</select>
								{loadingKategorie && <small className='text-muted'>Ładowanie kategorii...</small>}
							</div>
						</div>

						<div className='row mb-4'>
							<div className='col-12'>
								{/* Kurs */}

								<label htmlFor='kurs_id' className='form-label'>
									Kurs:
								</label>
								<select
									id='kurs_id'
									className={`form-select ${!wybranaKategoria ? 'disabled' : ''}`}
									value={formData.kurs_id}
									onChange={handleKursChange}
									onBlur={() => setTouched((prev) => ({ ...prev, kurs_id: true }))}
									disabled={!wybranaKategoria || loadingKursy}>
									<option value=''>- Wybierz kurs -</option>
									{kursy.map((kurs) => (
										<option key={kurs.id} value={kurs.id}>
											{kurs.nazwa}
										</option>
									))}
								</select>
								{loadingKursy && <small className='text-muted'>Ładowanie kursów...</small>}
								{!wybranaKategoria && <small className='text-muted d-block'>Wybierz najpierw kategorię</small>}
								{errors.kurs_id && touched.kurs_id && <div className='invalid-feedback d-block'>{errors.kurs_id}</div>}
							</div>
						</div>

						<div className='row'>
							<div className='col-12 d-flex justify-content-end gap-2'>
								<button
									type='button'
									className='btn btn-secondary'
									onClick={handleReset}
									disabled={submitStatus === 'submitting'}>
									Wyczyść
								</button>
								<button
									type='button'
									className={`btn ${
										submitStatus === 'success' ? 'btn-success' : submitStatus === 'error' ? 'btn-danger' : 'btn-primary'
									}`}
									onClick={handleSubmit}
									disabled={submitStatus === 'submitting' || submitStatus === 'success'}>
									{getButtonContent()}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Formularz
