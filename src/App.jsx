import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import AttendanceForm from './components/AttendanceForm';
import AttendanceStats from './components/AttendanceStats';
import AttendanceTable from './components/AttendanceTable';

const initialData = [
  { id: '1', name: 'Ahmad Fikri', nis: '220134', className: 'XI RPL 1', status: 'Hadir', timestamp: new Date().toISOString() },
  { id: '2', name: 'Siti Aminah', nis: '220201', className: 'XI RPL 2', status: 'Izin', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: '3', name: 'Budi Santoso', nis: '220178', className: 'X TKJ 1', status: 'Sakit', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
];

function App() {
  const [records, setRecords] = useState(initialData);

  const handleAddRecord = (record) => {
    setRecords(prev => [record, ...prev]);
  };

  const todayRecords = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    return records.filter(r => {
      const t = new Date(r.timestamp);
      return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
    });
  }, [records]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 -mt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AttendanceForm onSubmit={handleAddRecord} />
            <div className="h-6" />
            <AttendanceStats records={todayRecords} />
          </div>
          <div className="lg:col-span-2">
            <AttendanceTable records={records} />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} SMK Negeri 7 Pandeglang • Sistem Presensi Siswa
      </footer>
    </div>
  );
}

export default App;
