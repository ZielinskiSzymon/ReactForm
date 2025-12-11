const SubmissionTable = ({
  submissions,
  kursId,
  handleKwalifikacjaChange,
  onRowClick,
}) => {
  return (
    <div className="card border shadow-sm" style={{ borderColor: "#dee2e6" }}>
      <div className="card-header bg-white py-3 border-bottom">
        <h6 className="mb-0 fw-bold text-dark">Lista Zgłoszeń</h6>
      </div>
      <div className="card-body p-0">
        {submissions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 text-secondary small text-uppercase fw-bold border-bottom ps-3">
                    Imię i Nazwisko
                  </th>
                  <th className="py-3 text-secondary small text-uppercase fw-bold border-bottom">
                    PESEL
                  </th>
                  <th className="py-3 text-secondary small text-uppercase fw-bold border-bottom">
                    Email
                  </th>
                  <th
                    className="py-3 text-secondary small text-uppercase fw-bold border-bottom text-end pe-3"
                    style={{ width: "180px" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((osoba) => (
                  <tr
                    key={osoba.id}
                    onClick={() => onRowClick && onRowClick(osoba.id)}
                    style={{ cursor: onRowClick ? "pointer" : "default" }}
                  >
                    <td className="ps-3 fw-medium text-dark">
                      {osoba.imie} {osoba.nazwisko}
                    </td>
                    <td className="text-muted">{osoba.pesel}</td>
                    <td className="text-muted">{osoba.adres_email}</td>
                    <td className="text-end pe-3">
                      <div className="form-check form-switch d-flex justify-content-end align-items-center gap-2">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          role="switch"
                          id={`kwalifikacja-${osoba.id}`}
                          aria-label={`Zakwalifikowano: ${
                            osoba.zakwalifikowano ? "tak" : "nie"
                          }`}
                          aria-checked={osoba.zakwalifikowano}
                          checked={osoba.zakwalifikowano}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() =>
                            handleKwalifikacjaChange(
                              kursId,
                              osoba.id,
                              osoba.zakwalifikowano
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center text-muted">
            Brak zapisów na ten kurs.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionTable;
