import { useState } from 'react';
import { submitFormData } from '../services/formularzService';

export const useSubmit = ({ formData, wiek, validateFieldWrapper, setErrors, setTouched, handleReset, resetLocation, setWybranaKategoria }) => {
    const [submitStatus, setSubmitStatus] = useState('idle');

    const handleSubmit = async e => {
        e.preventDefault();

        const fieldsToValidate = { ...formData };
        
        const newErrors = {};
        Object.keys(fieldsToValidate).forEach(key => {
            const error = validateFieldWrapper(key, fieldsToValidate[key]); 
            if (error) {
                newErrors[key] = error;
            }
        });

        const allTouched = {};
        Object.keys(fieldsToValidate).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.error('Błąd walidacji: Proszę poprawić błędy w formularzu');
            return;
        }

        setSubmitStatus('submitting');

        try {
            await submitFormData({ ...formData, wiek });

            console.log('Formularz został pomyślnie wysłany!');
            setSubmitStatus('success');

            setTimeout(() => {
                handleReset();
								resetLocation()
								setWybranaKategoria('')
                setSubmitStatus('idle');
            }, 1000);
        } catch (error) {
            console.error('Błąd podczas wysyłania do Supabase:', error.message);
            setSubmitStatus('error');
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 2000);
        }
    };

    const getButtonContent = () => {
        if (submitStatus === 'submitting') {
            return 'Wysyłanie...';
        }

        if (submitStatus === 'success') {
            return 'Wysłano!';
        }

        if (submitStatus === 'error') {
            return 'Błąd!';
        }

        return 'Wyślij';
    };

    return { handleSubmit, getButtonContent };
};