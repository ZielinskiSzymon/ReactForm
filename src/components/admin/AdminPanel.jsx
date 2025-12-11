import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAdminData } from "../../hooks/useAdminData";

import AddCourseForm from "./AddCourseForm";
import CourseSidebar from "./CourseSidebar";
import SubmissionView from "./SubmissionView";

function AdminPanel() {
  const {
    kategorie,
    filteredCourses,
    selectedKategoria,
    selectedKurs,
    setSelectedKategoria,
    setSelectedKurs,
    loading,
    error,
    handleCourseAction,
  } = useAdminData();

  const [showAddForm, setShowAddForm] = useState(false);

  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const loadSubmissionsWrapper = (kurs) => {
    
    if (!kurs) {
      setSelectedKurs(null);
      return;
    }
    setSelectedKurs(kurs);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container py-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <span className="navbar-brand fw-bold text-dark">Panel Kursów</span>
          <div className="d-flex gap-2">
            {!showAddForm && (
              <button
                className="btn btn-primary btn-sm px-3"
                onClick={() => setShowAddForm(true)}
              >
                <i className="bi bi-plus-lg me-2"></i>Dodaj Kurs
              </button>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-outline-secondary btn-sm"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {showAddForm && (
          <div className="animate-fade-in">
            <AddCourseForm
              existingCategories={kategorie}
              onSuccess={() => {
                setShowAddForm(false);
                handleCourseAction();
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="row g-4">
          <CourseSidebar
            kategorie={kategorie}
            filteredCourses={filteredCourses}
            selectedKategoria={selectedKategoria}
            selectedKurs={selectedKurs}
            setSelectedKategoria={setSelectedKategoria}
            setSelectedKurs={setSelectedKurs}
            loadSubmissions={loadSubmissionsWrapper}
          />

          <div className="col-md-8">
            <SubmissionView
              selectedKurs={selectedKurs}
              setSelectedKurs={setSelectedKurs}
              existingCategories={kategorie}
              handleCourseAction={handleCourseAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
