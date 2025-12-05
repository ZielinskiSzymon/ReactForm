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

	const { kategorie, kursy, loadingKategorie, loadingKursy, handleKategoriaChange, handleKursChange } = useCourses(
		formData,
		setFormData,
		setTouched
	)

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
	})

	const handleResetClick = () => {
		handleReset()
		resetLocation()
	}

	return (
		<div className='bg-light min-vh-100 py-5'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-lg-8 col-xl-7'>
						<div className='text-center mb-4'>
							<h2 className='fw-light text-secondary mb-2'>Formularz Rejestracyjny</h2>
							<p className='text-muted small'>Wypełnij poniższe pola, aby dokończyć rejestrację</p>
						</div>

						<div className='card border-0 shadow-sm'>
							<div className='card-body p-4 p-md-5'>
								<form onSubmit={handleSubmit} onReset={handleResetClick} noValidate>
									<div className='mb-4'>
										<h5 className='text-secondary fw-normal mb-3 pb-2' style={{ borderBottom: '1px solid #e9ecef' }}>
											Dane Osobowe
										</h5>

										<div className='row g-3'>
											<div className='col-md-6'>
												<label htmlFor='imie' className='form-label small text-muted'>
													Imię
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.imie ? 'is-invalid' : ''}`}
													id='imie'
													name='imie'
													value={formData.imie}
													onChange={handleChange}
													onBlur={handleBlur}
													required
												/>
												{errors.imie && <div className='invalid-feedback'>{errors.imie}</div>}
											</div>

											<div className='col-md-6'>
												<label htmlFor='nazwisko' className='form-label small text-muted'>
													Nazwisko
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.nazwisko ? 'is-invalid' : ''}`}
													id='nazwisko'
													name='nazwisko'
													value={formData.nazwisko}
													onChange={handleChange}
													onBlur={handleBlur}
													required
												/>
												{errors.nazwisko && <div className='invalid-feedback'>{errors.nazwisko}</div>}
											</div>

											<div className='col-12'>
												<label htmlFor='adresEmail' className='form-label small text-muted'>
													Adres Email
												</label>
												<input
													type='email'
													className={`form-control form-control-lg ${errors.adresEmail ? 'is-invalid' : ''}`}
													id='adresEmail'
													name='adresEmail'
													value={formData.adresEmail}
													onChange={handleChange}
													onBlur={handleBlur}
													required
												/>
												{errors.adresEmail && <div className='invalid-feedback'>{errors.adresEmail}</div>}
											</div>

											<div className='col-md-6'>
												<label htmlFor='dataUrodzenia' className='form-label small text-muted'>
													Data Urodzenia
												</label>
												<input
													type='date'
													className={`form-control form-control-lg ${errors.dataUrodzenia ? 'is-invalid' : ''}`}
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
												<label className='form-label small text-muted'>Wiek</label>
												<input type='text' className='form-control form-control-lg bg-light' value={wiek} disabled />
											</div>

											<div className='col-md-6'>
												<label htmlFor='pesel' className='form-label small text-muted'>
													PESEL
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.pesel ? 'is-invalid' : ''}`}
													id='pesel'
													name='pesel'
													value={formData.pesel}
													onChange={handleChange}
													onBlur={handleBlur}
													required
												/>
												{errors.pesel && <div className='invalid-feedback'>{errors.pesel}</div>}
											</div>

											<div className='col-md-6'>
												<label htmlFor='plec' className='form-label small text-muted'>
													Płeć
												</label>
												<select
													className={`form-select form-select-lg ${errors.plec ? 'is-invalid' : ''}`}
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

											<div className='col-12'>
												<label htmlFor='obywatelstwo' className='form-label small text-muted'>
													Obywatelstwo
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.obywatelstwo ? 'is-invalid' : ''}`}
													id='obywatelstwo'
													name='obywatelstwo'
													value={formData.obywatelstwo}
													onChange={handleChange}
													onBlur={handleBlur}
													required
												/>
												{errors.obywatelstwo && <div className='invalid-feedback'>{errors.obywatelstwo}</div>}
											</div>
										</div>
									</div>

									<div className='mb-4'>
										<h5 className='text-secondary fw-normal mb-3 pb-2' style={{ borderBottom: '1px solid #e9ecef' }}>
											Wybór Kursu
										</h5>

										<div className='row g-3'>
											<div className='col-md-6'>
												<label htmlFor='kategoriaKursu' className='form-label small text-muted'>
													Kategoria Kursu
												</label>
												<select
													className={`form-select form-select-lg ${errors.wybranaKategoria ? 'is-invalid' : ''}`}
													id='kategoriaKursu'
													value={formData.wybranaKategoria}
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
												<label htmlFor='kurs' className='form-label small text-muted'>
													Kurs
												</label>
												<select
													className={`form-select form-select-lg ${errors.kurs_id ? 'is-invalid' : ''}`}
													id='kurs'
													name='kurs_id'
													value={formData.kurs_id}
													onChange={handleKursChange}
													onBlur={handleBlur}
													required
													disabled={!formData.wybranaKategoria || loadingKursy}>
													<option value=''>
														{loadingKursy
															? 'Ładowanie kursów...'
															: formData.wybranaKategoria
															? 'Wybierz kurs'
															: 'Najpierw wybierz kategorię'}
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
									</div>

									<div className='mb-4'>
										<h5 className='text-secondary fw-normal mb-3 pb-2' style={{ borderBottom: '1px solid #e9ecef' }}>
											Adres Zamieszkania
										</h5>

										<div className='row g-3'>
											<div className='col-md-6'>
												<label htmlFor='wojewodztwo' className='form-label small text-muted'>
													Województwo
												</label>
												<select
													className={`form-select form-select-lg ${errors.wojewodztwo ? 'is-invalid' : ''}`}
													id='wojewodztwo'
													name='wojewodztwo'
													value={formData.wojewodztwo}
													onChange={handleWojewodztwoChange}
													onBlur={handleBlur}
													required>
													<option value=''>Wybierz województwo</option>
													{wojewodztwa.map((w) => (
														<option key={w} value={w}>
															{w}
														</option>
													))}
												</select>
												{errors.wojewodztwo && <div className='invalid-feedback'>{errors.wojewodztwo}</div>}
											</div>

											<div className='col-md-6'>
												<label htmlFor='powiat' className='form-label small text-muted'>
													Powiat
												</label>
												<select
													className={`form-select form-select-lg ${errors.powiat ? 'is-invalid' : ''}`}
													id='powiat'
													name='powiat'
													value={formData.powiat}
													onChange={handlePowiatChange}
													onBlur={handleBlur}
													required
													disabled={!formData.wojewodztwo}>
													<option value=''>
														{formData.wojewodztwo ? 'Wybierz powiat' : 'Najpierw wybierz województwo'}
													</option>
													{powiaty.map((p) => (
														<option key={p} value={p}>
															{p}
														</option>
													))}
												</select>
												{errors.powiat && <div className='invalid-feedback'>{errors.powiat}</div>}
											</div>

											<div className='col-md-6'>
												<label htmlFor='gmina' className='form-label small text-muted'>
													Gmina
												</label>
												<select
													className={`form-select form-select-lg ${errors.gmina ? 'is-invalid' : ''}`}
													id='gmina'
													name='gmina'
													value={formData.gmina}
													onChange={handleGminaChange}
													onBlur={handleBlur}
													required
													disabled={!formData.powiat}>
													<option value=''>{formData.powiat ? 'Wybierz gminę' : 'Najpierw wybierz powiat'}</option>
													{gminy.map((g) => (
														<option key={g} value={g}>
															{g}
														</option>
													))}
												</select>
												{errors.gmina && <div className='invalid-feedback'>{errors.gmina}</div>}
											</div>

											<div className='col-md-6'>
												<label htmlFor='miejscowosc' className='form-label small text-muted'>
													Miejscowość
												</label>
												<select
													className={`form-select form-select-lg ${errors.miejscowosc ? 'is-invalid' : ''}`}
													id='miejscowosc'
													name='miejscowosc'
													value={formData.miejscowosc}
													onChange={handleMiejscowoscChange}
													onBlur={handleBlur}
													required
													disabled={!formData.gmina}>
													<option value=''>{formData.gmina ? 'Wybierz miejscowość' : 'Najpierw wybierz gminę'}</option>
													{miejscowosci.map((m) => (
														<option key={m} value={m}>
															{m}
														</option>
													))}
												</select>
												{errors.miejscowosc && <div className='invalid-feedback'>{errors.miejscowosc}</div>}
											</div>

											<div className='col-12'>
												<label htmlFor='ulica' className='form-label small text-muted'>
													Ulica i numer domu/mieszkania
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.ulica ? 'is-invalid' : ''}`}
													id='ulica'
													name='ulica'
													value={formData.ulica}
													onChange={handleChange}
													onBlur={handleBlur}
													placeholder='np. Kwiatowa 5/12A'
													required
												/>
												{errors.ulica && <div className='invalid-feedback'>{errors.ulica}</div>}
											</div>

											<div className='col-md-4'>
												<label htmlFor='kodPocztowy' className='form-label small text-muted'>
													Kod Pocztowy
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.kodPocztowy ? 'is-invalid' : ''}`}
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
												<label htmlFor='poczta' className='form-label small text-muted'>
													Poczta
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.poczta ? 'is-invalid' : ''}`}
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
												<label htmlFor='nrLokalu' className='form-label small text-muted'>
													Nr Lokalu (opcjonalnie)
												</label>
												<input
													type='text'
													className={`form-control form-control-lg ${errors.nrLokalu ? 'is-invalid' : ''}`}
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
									</div>

									<div className='d-flex gap-2 justify-content-end pt-3' style={{ borderTop: '1px solid #e9ecef' }}>
										<button type='reset' className='btn btn-light btn-lg px-4'>
											Wyczyść
										</button>
										<button
											type='submit'
											className='btn btn-primary btn-lg px-5'
											disabled={getButtonContent() !== 'Wyślij'}>
											{getButtonContent()}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Formularz
