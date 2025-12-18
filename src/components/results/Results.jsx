import { useEffect, useState } from 'react'
import { fetchPublishedCourses, fetchAcceptedForCourse } from '../../services/formularzService'

const Results = () => {
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let mounted = true
		const load = async () => {
			try {
				setLoading(true)
				const kursy = await fetchPublishedCourses()
				if (!mounted) return

				const kursyWithAccepted = await Promise.all(
					kursy.map(async (k) => {
						const accepted = await fetchAcceptedForCourse(k.id)
						return { ...k, acceptedList: accepted }
					})
				)

				if (!mounted) return
				setCourses(kursyWithAccepted)
			} catch (err) {
				console.error(err)
				if (!mounted) return
				setError('Nie udało się wczytać wyników.')
			} finally {
				if (mounted) setLoading(false)
			}
		}

		load()
		return () => (mounted = false)
	}, [])

	if (loading) {
		return (
			<div className='d-flex justify-content-center align-items-center vh-50'>
				<div className='spinner-border text-primary' role='status'></div>
			</div>
		)
	}

	if (error) {
		return <div className='alert alert-danger'>{error}</div>
	}

	if (!courses || courses.length === 0) {
		return (
			<div className='container py-5 text-center'>
				<h3 className='text-muted'>Brak opublikowanych wyników</h3>
				<p className='text-muted small'>Wyniki jeszcze nie zostały opublikowane.</p>
			</div>
		)
	}

	return (
		<div className='container py-4'>
			<h3 className='mb-4'>Wyniki Rekrutacji</h3>
			<div className='row g-4'>
				{courses.map((k) => (
					<div className='col-12' key={k.id}>
						<div className='card shadow-sm h-100'>
							<div className='card-body'>
								<h5 className='card-title mb-1'>{k.nazwa}</h5>
								<p className='text-muted small mb-2'>{k.kategoria}</p>

								<div className='list-group list-group-flush'>
									{k.acceptedList.length > 0 ? (
										k.acceptedList.map((a) => (
											<div key={a.id} className='list-group-item'>
												<div className='fw-bold'>
													{a.imie} {a.nazwisko}
												</div>
											</div>
										))
									) : (
										<div className='p-3 text-muted small'>Brak przyjętych uczestników.</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Results
