import { useState, useEffect, useMemo } from "react";
import {
  fetchKursyKategorie,
  fetchAllCourses,
} from "../services/formularzService";

export const useAdminData = () => {
  const [kategorie, setKategorie] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedKategoria, setSelectedKategoria] = useState(null);
  const [selectedKurs, setSelectedKurs] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function refreshData(shouldSelectFirstCategory = true) {
    try {
      const [kategorieData, coursesData] = await Promise.all([
        fetchKursyKategorie(),
        fetchAllCourses(),
      ]);
      setKategorie(kategorieData);
      setAllCourses(coursesData);

      let newSelectedKategoria = selectedKategoria;
      if (
        shouldSelectFirstCategory &&
        !selectedKategoria &&
        kategorieData.length > 0
      ) {
        newSelectedKategoria = kategorieData[0];
      }
      if (newSelectedKategoria) {
        setSelectedKategoria(newSelectedKategoria);
      }

      if (selectedKurs) {
        const updatedKurs = coursesData.find((k) => k.id === selectedKurs.id);
        if (updatedKurs) {
          setSelectedKurs(updatedKurs);
        } else {
          setSelectedKurs(null);
        }
      }
    } catch (err) {
      console.error("Błąd odświeżania danych:", err);
      setError("Nie udało się załadować danych.");
    }
  }

  useEffect(() => {
    
    const init = async () => {
      setLoading(true);
      await refreshData();
      setLoading(false);
    };
    init();
    
  }, []);

  const handleCourseAction = async () => {
    setLoading(true);
    await refreshData(false);
    setLoading(false);
  };

  const handleCourseDelete = async () => {
    setSelectedKurs(null);
    setLoading(true);
    await refreshData(true);
    setLoading(false);
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter((kurs) => kurs.kategoria === selectedKategoria);
  }, [allCourses, selectedKategoria]);

  return {
    kategorie,
    allCourses,
    filteredCourses,
    selectedKategoria,
    selectedKurs,
    setSelectedKategoria,
    setSelectedKurs,
    loading,
    error,
    handleCourseAction,
    handleCourseDelete,
  };
};
