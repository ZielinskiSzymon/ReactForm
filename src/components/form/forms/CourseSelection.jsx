const CourseSelection = ({
	formData,
	errors,
	loadingKategorie,
	loadingKursy,
	kategorie,
	kursy,
	handleKategoriaChange,
	handleKursChange,
	handleBlur,
}) => (
	<div className='row g-3'>
		<div className='col-md-6'>
			<label htmlFor='kategoriaKursu' className='form-label small text-muted'>
				Kategoria Kursu
			</label>
			<select
				className={`form-select form-select-lg ${errors.wybranaKategoria ? 'is-invalid' : ''}`}
				id='kategoriaKursu'
				name='wybranaKategoria'
				value={formData.wybranaKategoria}
				onChange={handleKategoriaChange}
				onBlur={handleBlur}
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
					<option key={kurs.id} value={kurs.id} disabled={kurs.published}>
						{kurs.nazwa} {kurs.published ? ' (wyniki opublikowane)' : ''}
					</option>
				))}
			</select>
			{errors.kurs_id && <div className='invalid-feedback'>{errors.kurs_id}</div>}
		</div>
	</div>
)

export default CourseSelection
