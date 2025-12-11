import { useState } from "react";
import data from "../../data.json";

export const useLocation = (formData, setFormData) => {
  const [wojewodztwa] = useState(() => Object.keys(data));
  const [powiaty, setPowiaty] = useState([]);
  const [gminy, setGminy] = useState([]);
  const [miejscowosci, setMiejscowosci] = useState([]);

  const handleWojewodztwoChange = (e) => {
    const wojewodztwo = e.target.value;
    setFormData((prev) => ({
      ...prev,
      wojewodztwo,
      powiat: "",
      gmina: "",
      miejscowosc: "",
      ulica: "",
      kodPocztowy: "",
      poczta: "",
    }));
    setPowiaty(wojewodztwo ? Object.keys(data[wojewodztwo] || {}) : []);
    setGminy([]);
    setMiejscowosci([]);
  };

  const handlePowiatChange = (e) => {
    const powiat = e.target.value;
    setFormData((prev) => ({
      ...prev,
      powiat,
      gmina: "",
      miejscowosc: "",
      kodPocztowy: "",
      poczta: "",
    }));
    setGminy(
      powiat ? Object.keys(data[formData.wojewodztwo][powiat] || {}) : []
    );
    setMiejscowosci([]);
  };

  const handleGminaChange = (e) => {
    const gmina = e.target.value;
    setFormData((prev) => ({
      ...prev,
      gmina,
      miejscowosc: "",
      kodPocztowy: "",
      poczta: "",
    }));

    const miejscowosciData = gmina
      ? data[formData.wojewodztwo][formData.powiat][gmina] || []
      : [];
    const nazwyMiejscowosci = miejscowosciData.map(
      (item) => item.nazwa || item
    );
    setMiejscowosci(nazwyMiejscowosci);
  };

  const handleMiejscowoscChange = (e) => {
    const miejscowosc = e.target.value;
    let kodPocztowy = "";

    const miejscowosciData =
      data[formData.wojewodztwo][formData.powiat][formData.gmina] || [];
    const znalezionoMiejscowosc = miejscowosciData.find(
      (item) => item.nazwa === miejscowosc || item === miejscowosc
    );

    if (znalezionoMiejscowosc && znalezionoMiejscowosc.kod) {
      kodPocztowy = znalezionoMiejscowosc.kod;
    }

    setFormData((prev) => ({
      ...prev,
      miejscowosc,
      kodPocztowy,
    }));
  };

  const resetLocation = () => {
    setPowiaty([]);
    setGminy([]);
    setMiejscowosci([]);
  };

  return {
    wojewodztwa,
    powiaty,
    gminy,
    miejscowosci,
    handleWojewodztwoChange,
    handlePowiatChange,
    handleGminaChange,
    handleMiejscowoscChange,
    resetLocation,
  };
};
