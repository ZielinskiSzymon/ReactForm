const PersonalDataSection = ({
  formData,
  wiek,
  errors,
  handleChange,
  handleBlur,
}) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label htmlFor="imie" className="form-label small text-muted">
        Imię
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.imie ? "is-invalid" : ""
        }`}
        id="imie"
        name="imie"
        value={formData.imie}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.imie && <div className="invalid-feedback">{errors.imie}</div>}
    </div>

    <div className="col-md-6">
      <label htmlFor="nazwisko" className="form-label small text-muted">
        Nazwisko
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.nazwisko ? "is-invalid" : ""
        }`}
        id="nazwisko"
        name="nazwisko"
        value={formData.nazwisko}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.nazwisko && (
        <div className="invalid-feedback">{errors.nazwisko}</div>
      )}
    </div>

    <div className="col-12">
      <label htmlFor="adresEmail" className="form-label small text-muted">
        Adres Email
      </label>
      <input
        type="email"
        className={`form-control form-control-lg ${
          errors.adresEmail ? "is-invalid" : ""
        }`}
        id="adresEmail"
        name="adresEmail"
        value={formData.adresEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.adresEmail && (
        <div className="invalid-feedback">{errors.adresEmail}</div>
      )}
    </div>

    <div className="col-md-6">
      <label htmlFor="dataUrodzenia" className="form-label small text-muted">
        Data Urodzenia
      </label>
      <input
        type="date"
        className={`form-control form-control-lg ${
          errors.dataUrodzenia ? "is-invalid" : ""
        }`}
        id="dataUrodzenia"
        name="dataUrodzenia"
        value={formData.dataUrodzenia}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.dataUrodzenia && (
        <div className="invalid-feedback">{errors.dataUrodzenia}</div>
      )}
    </div>

    <div className="col-md-6">
      <label className="form-label small text-muted">Wiek</label>
      <input
        type="text"
        className="form-control form-control-lg bg-light"
        value={wiek}
        disabled
      />
    </div>

    <div className="col-md-6">
      <label htmlFor="pesel" className="form-label small text-muted">
        PESEL
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.pesel ? "is-invalid" : ""
        }`}
        id="pesel"
        name="pesel"
        value={formData.pesel}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.pesel && <div className="invalid-feedback">{errors.pesel}</div>}
    </div>

    <div className="col-md-6">
      <label htmlFor="plec" className="form-label small text-muted">
        Płeć
      </label>
      <select
        className={`form-select form-select-lg ${
          errors.plec ? "is-invalid" : ""
        }`}
        id="plec"
        name="plec"
        value={formData.plec}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      >
        <option value="">Wybierz płeć</option>
        <option value="Mężczyzna">Mężczyzna</option>
        <option value="Kobieta">Kobieta</option>
      </select>
      {errors.plec && <div className="invalid-feedback">{errors.plec}</div>}
    </div>

    <div className="col-12">
      <label htmlFor="obywatelstwo" className="form-label small text-muted">
        Obywatelstwo
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.obywatelstwo ? "is-invalid" : ""
        }`}
        id="obywatelstwo"
        name="obywatelstwo"
        value={formData.obywatelstwo}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.obywatelstwo && (
        <div className="invalid-feedback">{errors.obywatelstwo}</div>
      )}
    </div>
  </div>
);

export default PersonalDataSection;
