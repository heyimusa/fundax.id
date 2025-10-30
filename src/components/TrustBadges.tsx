import React from 'react';
import { Shield, Award } from 'lucide-react';

// Trust badge logos
import ojkLogo from '../assets/images/logos/trust-badges/ojk-logo.svg';
import isoLogo from '../assets/images/logos/trust-badges/iso-27001-logo.svg';

const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <Shield className="text-fundax-blue" size={32} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">Terdaftar di OJK</p>
          <p className="text-xs text-fundax-grayText">S-194/IK.01/2025</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <Award className="text-fundax-blue" size={32} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">ISO 27001:2022</p>
          <p className="text-xs text-fundax-grayText">Certified</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <img
            src={ojkLogo}
            alt="OJK Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">Registrasi OJK</p>
          <p className="text-xs text-fundax-grayText">Terpercaya & Aman</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center">
          <img
            src={isoLogo}
            alt="ISO 27001 Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-fundax-blue">ISO 27001:2022</p>
          <p className="text-xs text-fundax-grayText">Certified</p>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
