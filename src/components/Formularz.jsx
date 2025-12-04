import { useFormHandling } from '../hooks/useFormHandling'
import { useCourses } from '../hooks/useCourses'
import { useLocation } from '../hooks/useLocation'
import { useSubmit } from '../hooks/useSubmit'

function Formularz() {
	const {
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
	} = useFormHandling()

	const {
		kategorie,
		wybranaKategoria,
		setWybranaKategoria,
		kursy,
		loadingKategorie,
		loadingKursy,
		handleKategoriaChange,
		handleKursChange,
	} = useCourses(setFormData, setTouched)

	const {
		wojewodztwa,
		powiaty,
		gminy,
		miejscowosci,
		handleWojewodztwoChange,
		handlePowiatChange,
		handleGminaChange,
		handleMiejscowoscChange,
		resetLocation,
	} = useLocation(formData, setFormData)

	const { handleSubmit, getButtonContent } = useSubmit({
		formData,
		wiek,
		validateFieldWrapper,
		setErrors,
		setTouched,
		handleReset,
		resetLocation,
		setWybranaKategoria,
	})

	const handleResetClick = () => {
		handleReset()
		resetLocation()
		setWybranaKategoria('')
	}

	return (
		<div className='container my-5'>
			<div className='card shadow-lg p-4'>
				<h2 className='card-title text-center mb-4'>Formularz Rejestracyjny</h2>
				<form onSubmit={handleSubmit} onReset={handleResetClick} noValidate>
					<div className='mb-3'>
						<label htmlFor='imie' className='form-label'>
							Imię
						</label>
						<input
							type='text'
							className={`form-control ${errors.imie ? 'is-invalid' : ''}`}
							id='imie'
							name='imie'
							value={formData.imie}
							onChange={handleChange}
							onBlur={handleBlur}
							required
						/>
						{errors.imie && <div className='invalid-feedback'>{errors.imie}</div>}
					</div>

					<div className='mb-3'>
						<label htmlFor='nazwisko' className='form-label'>
							Nazwisko
						</label>
						<input
							type='text'
							className={`form-control ${errors.nazwisko ? 'is-invalid' : ''}`}
							id='nazwisko'
							name='nazwisko'
							value={formData.nazwisko}
							onChange={handleChange}
							onBlur={handleBlur}
							required
						/>
						{errors.nazwisko && <div className='invalid-feedback'>{errors.nazwisko}</div>}
					</div>

					<div className='mb-3'>
						<label htmlFor='adresEmail' className='form-label'>
							Adres Email
						</label>
						<input
							type='email'
							className={`form-control ${errors.adresEmail ? 'is-invalid' : ''}`}
							id='adresEmail'
							name='adresEmail'
							value={formData.adresEmail}
							onChange={handleChange}
							onBlur={handleBlur}
							required
						/>
						{errors.adresEmail && <div className='invalid-feedback'>{errors.adresEmail}</div>}
					</div>

					<div className='row mb-3'>
						<div className='col-md-6'>
							<label htmlFor='dataUrodzenia' className='form-label'>
								Data Urodzenia
							</label>
							<input
								type='date'
								className={`form-control ${errors.dataUrodzenia ? 'is-invalid' : ''}`}
								id='dataUrodzenia'
								name='dataUrodzenia'
								value={formData.dataUrodzenia}
								onChange={handleChange}
								onBlur={handleBlur}
								required
							/>
							{errors.dataUrodzenia && <div className='invalid-feedback'>{errors.dataUrodzenia}</div>}
						</div>

						<div className='col-md-6'>
							<label className='form-label'>Wiek</label>
							<input type='text' className='form-control' value={wiek} disabled />
						</div>
					</div>

					<div className='mb-3'>
						<label htmlFor='pesel' className='form-label'>
							PESEL
						</label>
						<input
							type='text'
							className={`form-control ${errors.pesel ? 'is-invalid' : ''}`}
							id='pesel'
							name='pesel'
							value={formData.pesel}
							onChange={handleChange}
							onBlur={handleBlur}
							required
						/>
						{errors.pesel && <div className='invalid-feedback'>{errors.pesel}</div>}
					</div>

					<div className='mb-3'>
						<label htmlFor='plec' className='form-label'>
							Płeć
						</label>
						<select
							className={`form-select ${errors.plec ? 'is-invalid' : ''}`}
							id='plec'
							name='plec'
							value={formData.plec}
							onChange={handleChange}
							onBlur={handleBlur}
							required>
							<option value=''>Wybierz płeć</option>
							<option value='Mężczyzna'>Mężczyzna</option>
							<option value='Kobieta'>Kobieta</option>
						</select>
						{errors.plec && <div className='invalid-feedback'>{errors.plec}</div>}
					</div>

					<div className='mb-3'>
						<label htmlFor='obywatelstwo' className='form-label'>
							Obywatelstwo
						</label>
						<input
							type='text'
							className={`form-control ${errors.obywatelstwo ? 'is-invalid' : ''}`}
							id='obywatelstwo'
							name='obywatelstwo'
							value={formData.obywatelstwo}
							onChange={handleChange}
							onBlur={handleBlur}
							required
						/>
						{errors.obywatelstwo && <div className='invalid-feedback'>{errors.obywatelstwo}</div>}
					</div>
					<hr />

					<div className='row mb-3'>
						<div className='col-md-6'>
							<label htmlFor='kategoriaKursu' className='form-label'>
								Kategoria Kursu
							</label>
							<select
								className={`form-select ${errors.wybranaKategoria ? 'is-invalid' : ''}`}
								id='kategoriaKursu'
								value={wybranaKategoria}
								onChange={handleKategoriaChange}
								onBlur={(e) => handleBlur({ target: { name: 'wybranaKategoria', value: e.target.value } })}
								required>
								<option value=''>{loadingKategorie ? 'Ładowanie kategorii...' : 'Wybierz kategorię'}</option>
								{kategorie.map((kat) => (
									<option key={kat} value={kat}>
										{kat}
									</option>
								))}
							</select>
							{errors.wybranaKategoria && <div className='invalid-feedback'>{errors.wybranaKategoria}</div>}
						</div>

						<div className='col-md-6'>
							<label htmlFor='kurs' className='form-label'>
								Kurs
							</label>
							<select
								className={`form-select ${errors.kurs_id ? 'is-invalid' : ''}`}
								id='kurs'
								name='kurs_id'
								value={formData.kurs_id}
								onChange={handleKursChange}
								onBlur={handleBlur}
								required
								disabled={!wybranaKategoria || loadingKursy}>
								<option value=''>
									{loadingKursy ? 'Ładowanie kursów...' : wybranaKategoria ? 'Wybierz kurs' : 'Najpierw wybierz kategorię'}
								</option>
								{kursy.map((kurs) => (
									<option key={kurs.id} value={kurs.id}>
										{kurs.nazwa}
									</option>
								))}
							</select>
							{errors.kurs_id && <div className='invalid-feedback'>{errors.kurs_id}</div>}
						</div>
					</div>
					<hr />
					
					<h5 className='mb-3'>Adres Zamieszkania</h5>

					<div className='row mb-3'>
						<div className='col-md-6'>
							<label htmlFor='wojewodztwo' className='form-label'>
								Województwo
							</label>
							<select
								className={`form-select ${errors.wojewodztwo ? 'is-invalid' : ''}`}
								id='wojewodztwo'
								name='wojewodztwo'
								value={formData.wojewodztwo}
								onChange={handleWojewodztwoChange}
								onBlur={handleBlur}
								required>
								<option value=''>Wybierz woj.</option>
								{wojewodztwa.map((w) => (
									<option key={w} value={w}>
										{w}
									</option>
								))}
							</select>
							{errors.wojewodztwo && <div className='invalid-feedback'>{errors.wojewodztwo}</div>}
						</div>

						<div className='col-md-6'>
							<label htmlFor='powiat' className='form-label'>
								Powiat
							</label>
							<select
								className={`form-select ${errors.powiat ? 'is-invalid' : ''}`}
								id='powiat'
								name='powiat'
								value={formData.powiat}
								onChange={handlePowiatChange}
								onBlur={handleBlur}
								required
								disabled={!formData.wojewodztwo}>
								<option value=''>{formData.wojewodztwo ? 'Wybierz powiat' : 'Najpierw woj.'}</option>
								{powiaty.map((p) => (
									<option key={p} value={p}>
										{p}
									</option>
								))}
							</select>
							{errors.powiat && <div className='invalid-feedback'>{errors.powiat}</div>}
						</div>
					</div>

					<div className='row mb-3'>
						<div className='col-md-6'>
							<label htmlFor='gmina' className='form-label'>
								Gmina
							</label>
							<select
								className={`form-select ${errors.gmina ? 'is-invalid' : ''}`}
								id='gmina'
								name='gmina'
								value={formData.gmina}
								onChange={handleGminaChange}
								onBlur={handleBlur}
								required
								disabled={!formData.powiat}>
								<option value=''>{formData.powiat ? 'Wybierz gminę' : 'Najpierw powiat'}</option>
								{gminy.map((g) => (
									<option key={g} value={g}>
										{g}
									</option>
								))}
							</select>
							{errors.gmina && <div className='invalid-feedback'>{errors.gmina}</div>}
						</div>

						<div className='col-md-6'>
							<label htmlFor='miejscowosc' className='form-label'>
								Miejscowość
							</label>
							<select
								className={`form-select ${errors.miejscowosc ? 'is-invalid' : ''}`}
								id='miejscowosc'
								name='miejscowosc'
								value={formData.miejscowosc}
								onChange={handleMiejscowoscChange}
								onBlur={handleBlur}
								required
								disabled={!formData.gmina}>
								<option value=''>{formData.gmina ? 'Wybierz miejsc.' : 'Najpierw gmina'}</option>
								{miejscowosci.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
							{errors.miejscowosc && <div className='invalid-feedback'>{errors.miejscowosc}</div>}
						</div>
					</div>

                    <div className='mb-3'>
						<label htmlFor='ulica' className='form-label'>
							Ulica i numer domu/mieszkania
						</label>
						<input
							type='text'
							className={`form-control ${errors.ulica ? 'is-invalid' : ''}`}
							id='ulica'
							name='ulica'
							value={formData.ulica}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='np. Kwiatowa 5'
							required
						/>
						{errors.ulica && <div className='invalid-feedback'>{errors.ulica}</div>}
					</div>

					<div className='row mb-3'>
						<div className='col-md-4'>
							<label htmlFor='kodPocztowy' className='form-label'>
								Kod Pocztowy
							</label>
							<input
								type='text'
								className={`form-control ${errors.kodPocztowy ? 'is-invalid' : ''}`}
								id='kodPocztowy'
								name='kodPocztowy'
								value={formData.kodPocztowy}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='XX-XXX'
								required
							/>
							{errors.kodPocztowy && <div className='invalid-feedback'>{errors.kodPocztowy}</div>}
						</div>

						<div className='col-md-4'>
							<label htmlFor='poczta' className='form-label'>
								Poczta
							</label>
							<input
								type='text'
								className={`form-control ${errors.poczta ? 'is-invalid' : ''}`}
								id='poczta'
								name='poczta'
								value={formData.poczta}
								onChange={handleChange}
								onBlur={handleBlur}
								required
							/>
							{errors.poczta && <div className='invalid-feedback'>{errors.poczta}</div>}
						</div>

						<div className='col-md-4'>
							<label htmlFor='nrLokalu' className='form-label'>
								Nr Lokalu (opcjonalnie)
							</label>
							<input
								type='text'
								className={`form-control ${errors.nrLokalu ? 'is-invalid' : ''}`}
								id='nrLokalu'
								name='nrLokalu'
								value={formData.nrLokalu}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='np. 12/A'
							/>
							{errors.nrLokalu && <div className='invalid-feedback'>{errors.nrLokalu}</div>}
						</div>
					</div>

					<div className='d-flex justify-content-end mt-4'>
						<button type='reset' className='btn btn-outline-secondary me-2'>
							Wyczyść
						</button>
						<button type='submit' className='btn btn-primary' disabled={getButtonContent() !== 'Wyślij'}>
							{getButtonContent()}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Formularz