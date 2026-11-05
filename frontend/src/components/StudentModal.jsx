import React, { useState, useEffect } from 'react';
import { X, Save, User, BookOpen, Layers } from 'lucide-react';

const COMMON_COURSES = ['BSIT', 'BSCS', 'BSIS', 'BSCpE', 'BSEMC', 'ACT'];

export default function StudentModal({ isOpen, onClose, onSubmit, initialData }) {
  const isEdit = Boolean(initialData?.id);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: 'BSIT',
    section: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstname: initialData.firstname || '',
        lastname: initialData.lastname || '',
        course: initialData.course || 'BSIT',
        section: initialData.section || '',
      });
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: 'BSIT',
        section: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.firstname.trim()) errs.firstname = 'First name is required';
    if (!formData.lastname.trim()) errs.lastname = 'Last name is required';
    if (!formData.course.trim()) errs.course = 'Course is required';
    if (!formData.section.trim()) errs.section = 'Section is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch {
      // Error handled by parent toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? `Updating records for Student ID #${initialData.id}`
                : 'Fill in the information below to register a student.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                First Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="e.g. Juan"
                  className={`block w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.firstname
                      ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } shadow-xs transition-colors`}
                />
              </div>
              {errors.firstname && (
                <p className="text-rose-500 text-xs mt-1">{errors.firstname}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="e.g. Dela Cruz"
                  className={`block w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.lastname
                      ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } shadow-xs transition-colors`}
                />
              </div>
              {errors.lastname && (
                <p className="text-rose-500 text-xs mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course / Degree Program <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <input
                type="text"
                list="course-options"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. BSIT"
                className={`block w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                  errors.course
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                } shadow-xs transition-colors`}
              />
              <datalist id="course-options">
                {COMMON_COURSES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            {errors.course && (
              <p className="text-rose-500 text-xs mt-1">{errors.course}</p>
            )}
          </div>

          {/* Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Layers className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="e.g. 3A, 4B, Section 1"
                className={`block w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                  errors.section
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                } shadow-xs transition-colors`}
              />
            </div>
            {errors.section && (
              <p className="text-rose-500 text-xs mt-1">{errors.section}</p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
