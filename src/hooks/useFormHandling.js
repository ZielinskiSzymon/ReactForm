import { useState, useEffect } from 'react';
import { validateField } from '../utils/validation';
import { calculateAge } from '../utils/dateUtils';

export const useFormHandling = () => {
    const [formData, setFormData] = useState({
        imie: '',
        nazwisko: '',
        adresEmail: '',
        dataUrodzenia: '',
        pesel: '',
        plec: '',
        obywatelstwo: '',
        kurs_id: '',
        wojewodztwo: '',
        powiat: '',
        gmina: '',
        miejscowosc: '',
        ulica: '', // DODANE
        kodPocztowy: '', // DODANE
        nrLokalu: '', // DODANE
        poczta: '', // DODANE
    });
    const [wiek, setWiek] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setWiek(calculateAge(formData.dataUrodzenia));

        if (formData.pesel) {
            const peselError = validateFieldWrapper('pesel', formData.pesel);
            setErrors(prev => ({
                ...prev,
                pesel: peselError,
            }));
        }
    }, [formData.dataUrodzenia, formData.pesel]);

    const validateFieldWrapper = (name, value) => {
        return validateField(name, value, formData);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (touched[name]) {
            const error = validateFieldWrapper(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error,
            }));
        }
    };

    const handleBlur = e => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true,
        }));

        const error = validateFieldWrapper(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error,
        }));
    };

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
            wojewodztwo: '',
            powiat: '',
            gmina: '',
            miejscowosc: '',
            ulica: '', // DODANE
            kodPocztowy: '', // DODANE
            nrLokalu: '', // DODANE
            poczta: '', // DODANE
        });
        setWiek('');
        setErrors({});
        setTouched({});
    };

    return {
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
        validateFieldWrapper
    };
};