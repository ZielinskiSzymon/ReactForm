import supabase from "../supabaseClient";

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
    kurs_id: formData.kurs_id,
    wojewodztwo: formData.wojewodztwo,
    powiat: formData.powiat,
    gmina: formData.gmina,
    miejscowosc: formData.miejscowosc,
    ulica: formData.ulica,
    kod_pocztowy: formData.kodPocztowy,
    poczta: formData.poczta,
    nr_lokalu: formData.nrLokalu,
  };

  const { error } = await supabase
    .from("dane_formularz")
    .insert([dataToSubmit]);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const fetchKursyKategorie = async () => {
  const { data, error } = await supabase
    .from("kursy")
    .select("kategoria")
    .not("kategoria", "is", null)
    .order("kategoria", { ascending: true });

  if (error) {
    throw error;
  }

  const uniqueKategorie = [
    ...new Set(data.map((item) => item.kategoria).filter(Boolean)),
  ];
  return uniqueKategorie;
};

export const fetchKursyByKategoria = async (kategoria) => {
  const { data, error } = await supabase
    .from("kursy")
    .select("id, nazwa")
    .eq("kategoria", kategoria);

  if (error) {
    throw error;
  }

  return data;
};

export const fetchAllCourses = async () => {
  const { data, error } = await supabase
    .from("kursy")
    .select("id, nazwa, kategoria, ilosc")
    .order("kategoria", { ascending: true })
    .order("nazwa", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const fetchSubmissionDetails = async (daneId) => {
  const { data, error } = await supabase
    .from("dane_formularz")
    .select("*")
    .eq("id", daneId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const fetchQualifiedCount = async (kursId) => {
  const { count, error } = await supabase
    .from("dane_formularz")
    .select("id", { count: "exact" })
    .eq("kurs_id", kursId)
    .eq("zakwalifikowano", true);

  if (error) {
    throw error;
  }
  return count;
};

export const fetchSubmissionCount = async (kursId) => {
  const { count, error } = await supabase
    .from("dane_formularz")
    .select("id", { count: "exact" })
    .eq("kurs_id", kursId);

  if (error) {
    throw error;
  }
  return count;
};

export const fetchSubmissionsForCourse = async (kursId) => {
  const { data, error } = await supabase
    .from("dane_formularz")
    .select(
      `
            id,
            imie,
            nazwisko,
            adres_email,
            pesel,
            zakwalifikowano
        `
    )
    .eq("kurs_id", kursId)
    .order("imie", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const updateKwalifikacja = async (daneId, status) => {
  const { error } = await supabase
    .from("dane_formularz")
    .update({ zakwalifikowano: status })
    .eq("id", daneId);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const updateCourse = async (kursId, nazwa, kategoria, ilosc) => {
  const { error } = await supabase
    .from("kursy")
    .update({ nazwa: nazwa, kategoria: kategoria, ilosc: ilosc })
    .eq("id", kursId);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const deleteCourse = async (kursId) => {
  const { error } = await supabase.from("kursy").delete().eq("id", kursId);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const addCourse = async (nazwa, kategoria, ilosc) => {
  const { data, error } = await supabase.from("kursy").insert([
    {
      nazwa: nazwa,
      kategoria: kategoria,
      ilosc: ilosc,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
};
