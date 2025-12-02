import supabase from '../supabaseClient'

export const submitFormData = async (formData) => {
	const dataToSubmit = {
		imie: formData.imie,
		nazwisko: formData.nazwisko,
		adres_email: formData.adresEmail,
		pesel: formData.pesel,
		data_urodzenia: formData.dataUrodzenia,
		wiek: formData.wiek,
		plec: formData.plec,
		obywatelstwo: formData.obywatelstwo,
	}

	const { error } = await supabase.from('dane_formularz').insert([dataToSubmit])

	if (error) {
		throw error
	}

	return { success: true }
}
