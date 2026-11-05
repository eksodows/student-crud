import React from 'react';
import { Users, BookOpen, Layers, CheckCircle } from 'lucide-react';

export default function StatsBar({ students }) {
  const totalStudents = students.length;

  const totalCourses = React.useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course) set.add(s.course);
    });
    return set.size;
  }, [students]);

  const totalSections = React.useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.section) set.add(s.section);
    });
    return set.size;
  }, [students]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Students */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrolled</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalStudents}</h3>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Courses</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalCourses}</h3>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sections</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalSections}</h3>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">API Endpoint</p>
          <h3 className="text-sm font-bold text-slate-800 mt-1 truncate">/hernandez/students</h3>
        </div>
      </div>
    </div>
  );
}
