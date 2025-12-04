import { useState, useEffect } from 'react';
import { fetchKursyKategorie, fetchKursyByKategoria } from '../services/formularzService';

export const useCourses = (setFormData, setTouched) => {
    const [kategorie, setKategorie] = useState([]);
    const [wybranaKategoria, setWybranaKategoria] = useState('');
    const [kursy, setKursy] = useState([]);
    const [loadingKategorie, setLoadingKategorie] = useState(false);
    const [loadingKursy, setLoadingKursy] = useState(false);

    useEffect(() => {
        const loadKategorie = async () => {
            setLoadingKategorie(true);
            try {
                const data = await fetchKursyKategorie();
                setKategorie(data);
            } catch (error) {
                console.error('Błąd podczas pobierania kategorii:', error.message);
            } finally {
                setLoadingKategorie(false);
            }
        };
        loadKategorie();
    }, []);

    useEffect(() => {
        if (wybranaKategoria) {
            const loadKursy = async () => {
                setLoadingKursy(true);
                try {
                    const data = await fetchKursyByKategoria(wybranaKategoria);
                    setKursy(data);
                    setFormData(prev => ({ ...prev, kurs_id: '' }));
                } catch (error) {
                    console.error('Błąd podczas pobierania kursów:', error.message);
                    setKursy([]);
                    setFormData(prev => ({ ...prev, kurs_id: '' }));
                } finally {
                    setLoadingKursy(false);
                }
            };
            loadKursy();
        } else {
            setKursy([]);
            setFormData(prev => ({ ...prev, kurs_id: '' }));
        }
    }, [wybranaKategoria, setFormData]);

    const handleKategoriaChange = e => {
        const value = e.target.value;
        setWybranaKategoria(value);
        setTouched(prev => ({ ...prev, wybranaKategoria: true }));
    };

    const handleKursChange = e => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, kurs_id: value }));
        setTouched(prev => ({ ...prev, kurs_id: true }));
    };

    return {
        kategorie,
        wybranaKategoria,
        setWybranaKategoria,
        kursy,
        loadingKategorie,
        loadingKursy,
        handleKategoriaChange,
        handleKursChange
    };
};