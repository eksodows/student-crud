import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import DeleteModal from './components/DeleteModal';
import Toast from './components/Toast';
import { studentApi } from './api/studentApi';
import { AlertCircle, ServerOff } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Delete Confirmation State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch Students from Spring Boot API
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const data = await studentApi.getAll();
      // Ensure data is array
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch students:', err);
      const isConnectionRefused =
        err.code === 'ERR_NETWORK' ||
        err.message?.includes('Network Error') ||
        err.response?.status === 502 ||
        err.response?.status === 504;

      const message = isConnectionRefused
        ? 'Could not connect to Spring Boot backend at http://localhost:8080. Please ensure the backend is running.'
        : err.response?.data || err.message || 'Failed to load students.';

      setApiError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Open Create Modal
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  // Submit Add or Edit
  const handleSaveStudent = async (formData) => {
    try {
      if (editingStudent) {
        // UPDATE
        const updated = await studentApi.update(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showToast(`Student #${updated.id} successfully updated!`);
      } else {
        // CREATE
        const created = await studentApi.create(formData);
        setStudents((prev) => [...prev, created]);
        showToast(`Student "${created.firstname} ${created.lastname}" successfully added!`);
      }
      setApiError(null);
    } catch (err) {
      console.error('Failed to save student:', err);
      const msg = err.response?.data || err.message || 'Operation failed. Please try again.';
      showToast(String(msg), 'error');
      throw err;
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async (id) => {
    try {
      await studentApi.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Student record #${id} deleted.`);
      setApiError(null);
    } catch (err) {
      console.error('Failed to delete student:', err);
      const msg = err.response?.data || err.message || 'Failed to delete student.';
      showToast(String(msg), 'error');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onAddClick={handleOpenAdd}
        onRefresh={fetchStudents}
        loading={loading}
        totalStudents={students.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Backend Connectivity Alert Banner */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 shadow-xs">
            <ServerOff className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold">Backend Connection Warning</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">{apiError}</p>
              <div className="mt-2 text-xs text-amber-800">
                <span>Tip: Run your Spring Boot application (</span>
                <code className="bg-amber-100/70 px-1.5 py-0.5 rounded font-mono">
                  ./mvnw spring-boot:run
                </code>
                <span> or via your IDE in the </span>
                <code className="bg-amber-100/70 px-1.5 py-0.5 rounded font-mono">student</code>
                <span> directory).</span>
              </div>
            </div>
            <button
              onClick={fetchStudents}
              className="text-xs font-semibold px-3 py-1.5 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg transition-colors whitespace-nowrap"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <StatsBar students={students} />

        {/* Students Table Component */}
        <StudentTable
          students={students}
          loading={loading}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onAddClick={handleOpenAdd}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 bg-white text-center text-xs text-slate-400">
        <p>Student CRUD Management System &bull; Hernandez Fullstack Project</p>
      </footer>

      {/* Add / Edit Modal */}
      <StudentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveStudent}
        initialData={editingStudent}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
