import React, { useMemo } from 'react';
import { CheckCircle, Activity, HeartPulse, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, color, icon: Icon }) => (
  <div className={`rounded-xl border p-4 ${color.bg} ${color.border}`}>
    <div className="flex items-center gap-3">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color.iconBg} ${color.iconText}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-zinc-600">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const AttendanceStats = ({ records }) => {
  const counts = useMemo(() => {
    return records.reduce(
      (acc, r) => {
        acc.total += 1;
        if (r.status === 'Hadir') acc.hadir += 1;
        if (r.status === 'Izin') acc.izin += 1;
        if (r.status === 'Sakit') acc.sakit += 1;
        if (r.status === 'Alpa') acc.alpa += 1;
        return acc;
      },
      { total: 0, hadir: 0, izin: 0, sakit: 0, alpa: 0 }
    );
  }, [records]);

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title="Hadir"
        value={counts.hadir}
        color={{ bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100', iconText: 'text-emerald-700' }}
        icon={CheckCircle}
      />
      <StatCard
        title="Izin"
        value={counts.izin}
        color={{ bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100', iconText: 'text-amber-700' }}
        icon={Activity}
      />
      <StatCard
        title="Sakit"
        value={counts.sakit}
        color={{ bg: 'bg-sky-50', border: 'border-sky-100', iconBg: 'bg-sky-100', iconText: 'text-sky-700' }}
        icon={HeartPulse}
      />
      <StatCard
        title="Alpa"
        value={counts.alpa}
        color={{ bg: 'bg-rose-50', border: 'border-rose-100', iconBg: 'bg-rose-100', iconText: 'text-rose-700' }}
        icon={AlertTriangle}
      />
    </section>
  );
};

export default AttendanceStats;
