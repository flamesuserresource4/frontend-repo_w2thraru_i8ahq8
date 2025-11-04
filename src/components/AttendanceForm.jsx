import React, { useState } from 'react';
import { CheckCircle, User, ClipboardList } from 'lucide-react';

const classOptions = [
  'X RPL 1', 'X RPL 2', 'XI RPL 1', 'XI RPL 2', 'XII RPL 1', 'XII RPL 2',
  'X TKJ 1', 'XI TKJ 1', 'XII TKJ 1'
];

const statusOptions = [
  { value: 'Hadir', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'Izin', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'Sakit', color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { value: 'Alpa', color: 'bg-rose-100 text-rose-700 border-rose-200' }
];

const AttendanceForm = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [nis, setNis] = useState('');
  const [className, setClassName] = useState(classOptions[0]);
  const [status, setStatus] = useState('Hadir');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !nis.trim()) return;
    const record = {
      id: crypto.randomUUID(),
      name: studentName.trim(),
      nis: nis.trim(),
      className,
      status,
      timestamp: new Date().toISOString(),
    };
    onSubmit(record);
    setStudentName('');
    setNis('');
    setStatus('Hadir');
  };

  return (
    <section className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="h-5 w-5 text-zinc-700" />
        <h2 className="text-lg font-semibold">Form Presensi</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Siswa</label>
          <div className="relative">
            <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Contoh: Ahmad Fikri"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">NIS</label>
          <input
            type="text"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            placeholder="Nomor Induk Siswa"
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Kelas</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {classOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`px-3 py-2 rounded-lg border text-sm transition ${
                  status === opt.value ? opt.color : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm"
          >
            <CheckCircle className="h-5 w-5" />
            Simpan Presensi
          </button>
        </div>
      </form>
    </section>
  );
};

export default AttendanceForm;
