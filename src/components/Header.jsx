import React from 'react';
import { Users, ClipboardList, Calendar, Clock } from 'lucide-react';

function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit'
  }).format(date);
}

const Header = () => {
  const now = new Date();
  return (
    <header className="bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20 shadow-inner">
            <span className="font-bold text-lg leading-none">SMKN<br/>7P</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Presensi Siswa • SMK Negeri 7 Pandeglang</h1>
            <p className="text-white/80 mt-1 text-sm md:text-base">Cepat, akurat, dan modern untuk kebutuhan kehadiran harian.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
            <Users className="h-5 w-5" />
            <div>
              <p className="text-xs text-white/75">Instansi</p>
              <p className="font-medium">SMK Negeri 7 Pandeglang</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
            <Calendar className="h-5 w-5" />
            <div>
              <p className="text-xs text-white/75">Tanggal</p>
              <p className="font-medium">{formatDate(now)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
            <Clock className="h-5 w-5" />
            <div>
              <p className="text-xs text-white/75">Waktu</p>
              <p className="font-medium">{formatTime(now)} WIB</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
