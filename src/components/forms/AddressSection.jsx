const AddressSection = ({
  formData,
  errors,
  wojewodztwa,
  powiaty,
  gminy,
  miejscowosci,
  handleChange,
  handleBlur,
  handleWojewodztwoChange,
  handlePowiatChange,
  handleGminaChange,
  handleMiejscowoscChange,
}) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label htmlFor="wojewodztwo" className="form-label small text-muted">
        Województwo
      </label>
      <select
        className={`form-select form-select-lg ${
          errors.wojewodztwo ? "is-invalid" : ""
        }`}
        id="wojewodztwo"
        name="wojewodztwo"
        value={formData.wojewodztwo}
        onChange={handleWojewodztwoChange}
        onBlur={handleBlur}
        required
      >
        <option value="">Wybierz województwo</option>
        {wojewodztwa.map((w) => (
          <option key={w} value={w}>
            {w}
          </option>
        ))}
      </select>
      {errors.wojewodztwo && (
        <div className="invalid-feedback">{errors.wojewodztwo}</div>
      )}
    </div>

    <div className="col-md-6">
      <label htmlFor="powiat" className="form-label small text-muted">
        Powiat
      </label>
      <select
        className={`form-select form-select-lg ${
          errors.powiat ? "is-invalid" : ""
        }`}
        id="powiat"
        name="powiat"
        value={formData.powiat}
        onChange={handlePowiatChange}
        onBlur={handleBlur}
        required
        disabled={!formData.wojewodztwo}
      >
        <option value="">
          {formData.wojewodztwo
            ? "Wybierz powiat"
            : "Najpierw wybierz województwo"}
        </option>
        {powiaty.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      {errors.powiat && <div className="invalid-feedback">{errors.powiat}</div>}
    </div>

    <div className="col-md-6">
      <label htmlFor="gmina" className="form-label small text-muted">
        Gmina
      </label>
      <select
        className={`form-select form-select-lg ${
          errors.gmina ? "is-invalid" : ""
        }`}
        id="gmina"
        name="gmina"
        value={formData.gmina}
        onChange={handleGminaChange}
        onBlur={handleBlur}
        required
        disabled={!formData.powiat}
      >
        <option value="">
          {formData.powiat ? "Wybierz gminę" : "Najpierw wybierz powiat"}
        </option>
        {gminy.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      {errors.gmina && <div className="invalid-feedback">{errors.gmina}</div>}
    </div>

    <div className="col-md-6">
      <label htmlFor="miejscowosc" className="form-label small text-muted">
        Miejscowość
      </label>
      <select
        className={`form-select form-select-lg ${
          errors.miejscowosc ? "is-invalid" : ""
        }`}
        id="miejscowosc"
        name="miejscowosc"
        value={formData.miejscowosc}
        onChange={handleMiejscowoscChange}
        onBlur={handleBlur}
        required
        disabled={!formData.gmina}
      >
        <option value="">
          {formData.gmina ? "Wybierz miejscowość" : "Najpierw wybierz gminę"}
        </option>
        {miejscowosci.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {errors.miejscowosc && (
        <div className="invalid-feedback">{errors.miejscowosc}</div>
      )}
    </div>

    <div className="col-12">
      <label htmlFor="ulica" className="form-label small text-muted">
        Ulica
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.ulica ? "is-invalid" : ""
        }`}
        id="ulica"
        name="ulica"
        value={formData.ulica}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.ulica && <div className="invalid-feedback">{errors.ulica}</div>}
    </div>

    <div className="col-md-4">
      <label htmlFor="kodPocztowy" className="form-label small text-muted">
        Kod Pocztowy
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.kodPocztowy ? "is-invalid" : ""
        }`}
        id="kodPocztowy"
        name="kodPocztowy"
        maxLength={6}
        value={formData.kodPocztowy}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.kodPocztowy && (
        <div className="invalid-feedback">{errors.kodPocztowy}</div>
      )}
    </div>

    <div className="col-md-4">
      <label htmlFor="poczta" className="form-label small text-muted">
        Poczta
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.poczta ? "is-invalid" : ""
        }`}
        id="poczta"
        name="poczta"
        value={formData.poczta}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.poczta && <div className="invalid-feedback">{errors.poczta}</div>}
    </div>

    <div className="col-md-4">
      <label htmlFor="nrLokalu" className="form-label small text-muted">
        Nr Lokalu
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.nrLokalu ? "is-invalid" : ""
        }`}
        id="nrLokalu"
        name="nrLokalu"
        value={formData.nrLokalu}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.nrLokalu && (
        <div className="invalid-feedback">{errors.nrLokalu}</div>
      )}
    </div>
  </div>
);

export default AddressSection;
