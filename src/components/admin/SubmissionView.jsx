import { useState, useEffect } from "react";
import {
  fetchSubmissionsForCourse,
  updateKwalifikacja,
  fetchQualifiedCount,
} from "../../services/formularzService";
import SubmissionTable from "./SubmissionTable";
import EditCourseModal from "./EditCourseModal";
import SubmissionDetailsModal from "./SubmissionDetailsModal";

const SubmissionView = ({
  selectedKurs,
  setSelectedKurs,
  existingCategories = [],
  handleCourseAction,
}) => {
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [error, setError] = useState(null);
  const [qualifiedCount, setQualifiedCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const loadSubmissions = async (kurs) => {
    if (!kurs || !kurs.id) {
      setSubmissions([]);
      setSelectedKurs(null);
      setQualifiedCount(0);
      return;
    }

    setLoadingSubmissions(true);
    setSubmissions([]);
    setError(null);
    setSelectedKurs(kurs);

    try {
      const data = await fetchSubmissionsForCourse(kurs.id);
      setSubmissions(data || []);
      try {
        const count = await fetchQualifiedCount(kurs.id);
        setQualifiedCount(count || 0);
      } catch (countErr) {
        console.warn("Nie udało się pobrać liczby uczestników:", countErr);
        setQualifiedCount(0);
      }
    } catch (err) {
      console.error(err);
      setError("Nie udało się załadować zgłoszeń.");
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (selectedKurs?.id) {
      loadSubmissions(selectedKurs);
    }
    
  }, [selectedKurs?.id]);

  const handleKwalifikacjaChange = async (kursId, daneId, currentStatus) => {
    const newStatus = !currentStatus;
    
    const maxSeats = selectedKurs?.ilosc;
    if (
      newStatus &&
      typeof maxSeats === "number" &&
      qualifiedCount >= maxSeats
    ) {
      return;
    }

    try {
      await updateKwalifikacja(daneId, newStatus);
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((osoba) =>
          osoba.id === daneId ? { ...osoba, zakwalifikowano: newStatus } : osoba
        )
      );
      
      setQualifiedCount((prev) =>
        newStatus ? prev + 1 : Math.max(0, prev - 1)
      );
      
      try {
        const delta = newStatus ? 1 : -1;
        window.dispatchEvent(
          new CustomEvent("participant-count-changed", {
            detail: { kursId: selectedKurs.id, delta },
          })
        );
      } catch (e) {
        
      }
    } catch (err) {
      console.error(err);
      alert("Błąd aktualizacji.");
    }
  };

  if (!selectedKurs) {
    return (
      <div className="card border-0 bg-transparent h-100 d-flex justify-content-center align-items-center text-center p-5">
        <div className="text-muted">
          <i className="bi bi-arrow-left-circle fs-2 mb-2"></i>
          <p>
            Wybierz kurs z listy po lewej stronie, <br />
            aby zobaczyć zgłoszenia.
          </p>
        </div>
      </div>
    );
  }

  if (loadingSubmissions) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-dark">
          Kurs: <span className="text-primary">{selectedKurs.nazwa}</span>
        </h5>
      </div>

      <div className="mb-3 d-flex gap-2 justify-content-end">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setShowEditModal(true)}
        >
          Edytuj kurs
        </button>
      </div>

      <SubmissionTable
        submissions={submissions}
        kursId={selectedKurs.id}
        handleKwalifikacjaChange={handleKwalifikacjaChange}
        onRowClick={(id) => setSelectedSubmissionId(id)}
      />

      {showEditModal && (
        <EditCourseModal
          kurs={selectedKurs}
          existingCategories={existingCategories}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            if (handleCourseAction) handleCourseAction();
          }}
          onDelete={() => {
            setShowEditModal(false);
            if (handleCourseAction) handleCourseAction();
            setSelectedKurs(null);
          }}
        />
      )}
      {selectedSubmissionId && (
        <SubmissionDetailsModal
          submissionId={selectedSubmissionId}
          onClose={() => setSelectedSubmissionId(null)}
        />
      )}
    </>
  );
};

export default SubmissionView;
