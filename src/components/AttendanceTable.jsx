import React, { useMemo, useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

function formatDateTime(iso) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium', timeStyle: 'short'
  }).format(d);
}

const AttendanceTable = ({ records }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Semua');
  const [kelas, setKelas] = useState('Semua');

  const filtered = useMemo(() => {
    return records
      .filter(r => {
        const matchQuery = [r.name, r.nis, r.className].join(' ').toLowerCase().includes(query.toLowerCase());
        const matchStatus = status === 'Semua' ? true : r.status === status;
        const matchKelas = kelas === 'Semua' ? true : r.className === kelas;
        return matchQuery && matchStatus && matchKelas;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [records, query, status, kelas]);

  const kelasOptions = useMemo(() => {
    const set = new Set(records.map(r => r.className));
    return ['Semua', ...Array.from(set)];
  }, [records]);

  return (
    <section className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-zinc-700" />
        <h2 className="text-lg font-semibold">Data Presensi Terbaru</h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama / NIS / kelas..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-zinc-300 bg-white"
          >
            {['Semua', 'Hadir', 'Izin', 'Sakit', 'Alpa'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-zinc-300 bg-white"
          >
            {kelasOptions.map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-600 border-b">
              <th className="py-2.5 px-3">Nama</th>
              <th className="py-2.5 px-3">NIS</th>
              <th className="py-2.5 px-3">Kelas</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-zinc-500 py-10">Belum ada data.</td>
              </tr>
            ) : (
              filtered.map(r => (
                <tr key={r.id} className="border-b hover:bg-zinc-50">
                  <td className="py-2.5 px-3 font-medium">{r.name}</td>
                  <td className="py-2.5 px-3">{r.nis}</td>
                  <td className="py-2.5 px-3">{r.className}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs border ${
                        r.status === 'Hadir' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.status === 'Izin' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        r.status === 'Sakit' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-600">{formatDateTime(r.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AttendanceTable;
