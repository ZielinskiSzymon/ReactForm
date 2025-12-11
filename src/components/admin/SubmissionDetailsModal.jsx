import { useState, useEffect } from "react";
import { fetchSubmissionDetails } from "../../services/formularzService";

const SubmissionDetailsModal = ({ submissionId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSubmissionDetails(submissionId);
        setDetails(data);
      } catch (err) {
        console.error(err);
        setError("Nie udało się załadować pełnych danych zgłoszenia.");
      } finally {
        setLoading(false);
      }
    };
    if (submissionId) {
      loadDetails();
    }
  }, [submissionId]);

  const renderDetail = (label, value) => (
    <div className="col-12 col-sm-6 col-md-4 mb-3">
      <div className="small text-secondary fw-bold text-uppercase">{label}</div>
      <div className="text-dark fw-medium">{value || "N/A"}</div>
    </div>
  );

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Szczegóły Zgłoszenia</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {loading && (
              <div className="text-center p-3">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            {details && (
              <>
                <h6 className="text-primary border-bottom pb-2 mb-3">
                  Dane Osobowe
                </h6>
                <div className="row">
                  {renderDetail("Imię", details.imie)}
                  {renderDetail("Nazwisko", details.nazwisko)}
                  {renderDetail("Email", details.adres_email)}
                  {renderDetail("PESEL", details.pesel)}
                  {renderDetail("Data Urodzenia", details.data_urodzenia)}
                  {renderDetail("Wiek", details.wiek)}
                  {renderDetail("Płeć", details.plec)}
                  {renderDetail("Obywatelstwo", details.obywatelstwo)}
                </div>

                <h6 className="text-primary border-bottom pb-2 mt-4 mb-3">
                  Adres Zamieszkania
                </h6>
                <div className="row">
                  {renderDetail("Województwo", details.wojewodztwo)}
                  {renderDetail("Powiat", details.powiat)}
                  {renderDetail("Gmina", details.gmina)}
                  {renderDetail("Miejscowość", details.miejscowosc)}
                  {renderDetail("Ulica", details.ulica)}
                  {renderDetail("Kod Pocztowy", details.kod_pocztowy)}
                  {renderDetail("Poczta", details.poczta)}
                  {renderDetail("Nr Lokalu", details.nr_lokalu)}
                </div>

                <h6 className="text-primary border-bottom pb-2 mt-4 mb-3">
                  Status
                </h6>
                <div className="row">
                  {renderDetail("ID Kursu", details.kurs_id)}
                  {renderDetail(
                    "Zakwalifikowano",
                    details.zakwalifikowano ? "TAK" : "NIE"
                  )}
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailsModal;
