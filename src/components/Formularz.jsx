import { useFormHandling } from "../hooks/useFormHandling";
import { useCourses } from "../hooks/useCourses";
import { useLocation } from "../hooks/useLocation";
import { useSubmit } from "../hooks/useSubmit";
import PersonalDataSection from "./forms/PersonalDataSection";
import CourseSelection from "./forms/CourseSelection";
import AddressSection from "./forms/AddressSection";

function Formularz() {
  const {
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
    validateFieldWrapper,
  } = useFormHandling();

  const {
    kategorie,
    kursy,
    loadingKategorie,
    loadingKursy,
    handleKategoriaChange,
    handleKursChange,
  } = useCourses(formData, setFormData, setTouched);

  const {
    wojewodztwa,
    powiaty,
    gminy,
    miejscowosci,
    handleWojewodztwoChange,
    handlePowiatChange,
    handleGminaChange,
    handleMiejscowoscChange,
    resetLocation,
  } = useLocation(formData, setFormData);

  const { handleSubmit, getButtonContent } = useSubmit({
    formData,
    wiek,
    validateFieldWrapper,
    setErrors,
    setTouched,
    handleReset,
    resetLocation,
  });

  const handleResetClick = () => {
    handleReset();
    resetLocation();
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div className="text-center mb-4">
              <h2 className="fw-light text-secondary mb-2">
                Formularz Rejestracyjny
              </h2>
              <p className="text-muted small">
                Wypełnij poniższe pola, aby dokończyć rejestrację
              </p>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <form
                  onSubmit={handleSubmit}
                  onReset={handleResetClick}
                  noValidate
                >
                  <div className="mb-4">
                    <h5
                      className="text-secondary fw-normal mb-3 pb-2"
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      Dane Osobowe
                    </h5>
                    <PersonalDataSection
                      formData={formData}
                      wiek={wiek}
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </div>

                  <div className="mb-4">
                    <h5
                      className="text-secondary fw-normal mb-3 pb-2"
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      Wybór Kursu
                    </h5>
                    <CourseSelection
                      formData={formData}
                      errors={errors}
                      loadingKategorie={loadingKategorie}
                      loadingKursy={loadingKursy}
                      kategorie={kategorie}
                      kursy={kursy}
                      handleKategoriaChange={handleKategoriaChange}
                      handleKursChange={handleKursChange}
                      handleBlur={handleBlur}
                    />
                  </div>

                  <div className="mb-4">
                    <h5
                      className="text-secondary fw-normal mb-3 pb-2"
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      Adres Zamieszkania
                    </h5>
                    <AddressSection
                      formData={formData}
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      wojewodztwa={wojewodztwa}
                      powiaty={powiaty}
                      gminy={gminy}
                      miejscowosci={miejscowosci}
                      handleWojewodztwoChange={handleWojewodztwoChange}
                      handlePowiatChange={handlePowiatChange}
                      handleGminaChange={handleGminaChange}
                      handleMiejscowoscChange={handleMiejscowoscChange}
                    />
                  </div>

                  <div
                    className="d-flex gap-2 justify-content-end pt-3"
                    style={{ borderTop: "1px solid #e9ecef" }}
                  >
                    <button type="reset" className="btn btn-light btn-lg px-4">
                      Wyczyść
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5"
                      disabled={getButtonContent() !== "Wyślij"}
                    >
                      {getButtonContent()}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formularz;
