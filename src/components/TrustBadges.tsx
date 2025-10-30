import React from 'react';
import { Award, Shield, Users } from 'lucide-react';

const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <Award className="text-fundax-blue" size={32} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">Profesional</p>
          <p className="text-xs text-fundax-grayText">Berpengalaman</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <Shield className="text-fundax-blue" size={32} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">Terpercaya</p>
          <p className="text-xs text-fundax-grayText">15+ Tahun</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <Users className="text-fundax-blue" size={32} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">Komitmen</p>
          <p className="text-xs text-fundax-grayText">Pelayanan Terbaik</p>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
