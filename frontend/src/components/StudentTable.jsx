import React, { useMemo, useState } from 'react';
import { Search, Edit2, Trash2, Filter, UserX, Users, ArrowUpDown } from 'lucide-react';

export default function StudentTable({
  students,
  loading,
  onEdit,
  onDelete,
  onAddClick,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Extract unique course list for filter dropdown
  const uniqueCourses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course) set.add(s.course);
    });
    return Array.from(set).sort();
  }, [students]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesSearch =
          `${s.firstname} ${s.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(s.id).includes(searchTerm) ||
          (s.course && s.course.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (s.section && s.section.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCourse =
          selectedCourse === 'ALL' || s.course === selectedCourse;

        return matchesSearch && matchesCourse;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [students, searchTerm, selectedCourse, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name, ID, course, section..."
            className="block w-full pl-10 pr-4 py-2 text-sm bg-white rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
          />
        </div>

        {/* Filter & Counter */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="pl-8 pr-8 py-2 text-xs font-medium bg-white text-slate-700 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs appearance-none cursor-pointer"
            >
              <option value="ALL">All Courses</option>
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-medium text-slate-500 whitespace-nowrap px-2">
            Showing <span className="font-semibold text-slate-800">{filteredStudents.length}</span> of {students.length}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th
                onClick={() => handleSort('id')}
                className="py-3.5 pl-6 pr-3 cursor-pointer hover:text-slate-900 select-none transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('firstname')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>Student Name</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('course')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>Course</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('section')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>Section</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading && students.length === 0 ? (
              // Loading skeleton
              [...Array(4)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 pl-6 pr-3">
                    <div className="h-4 bg-slate-200 rounded-md w-8"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-slate-200 rounded-md w-36"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-5 bg-slate-200 rounded-full w-16"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-slate-200 rounded-md w-12"></div>
                  </td>
                  <td className="py-4 pl-4 pr-6 text-right">
                    <div className="h-8 bg-slate-200 rounded-lg w-16 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : filteredStudents.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                      {searchTerm || selectedCourse !== 'ALL' ? (
                        <UserX className="w-6 h-6" />
                      ) : (
                        <Users className="w-6 h-6" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {searchTerm || selectedCourse !== 'ALL'
                        ? 'No matching students found'
                        : 'No student records yet'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      {searchTerm || selectedCourse !== 'ALL'
                        ? 'Try adjusting your search criteria or filter to locate the student.'
                        : 'Get started by creating your first student record in the system.'}
                    </p>
                    {!searchTerm && selectedCourse === 'ALL' && (
                      <button
                        onClick={onAddClick}
                        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                      >
                        Add Student Now
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* ID */}
                  <td className="py-3.5 pl-6 pr-3 whitespace-nowrap">
                    <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      #{student.id}
                    </span>
                  </td>

                  {/* Student Name */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
                        {student.firstname ? student.firstname.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {student.firstname} {student.lastname}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          Record ID: {student.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-slate-700 bg-slate-100">
                      {student.section}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pl-4 pr-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-1 opacity-90 group-hover:opacity-100">
                      <button
                        onClick={() => onEdit(student)}
                        title="Edit student"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(student)}
                        title="Delete student"
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
