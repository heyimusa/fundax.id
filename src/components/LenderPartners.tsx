import React from 'react';
import { Building2 } from 'lucide-react';

// Bank logos
import bankMandiri from '../assets/images/logos/banks/bank-mandiri.svg';
import bankBCA from '../assets/images/logos/banks/bank-bca.svg';
import bankBRI from '../assets/images/logos/banks/bank-bri.svg';
import bankBNI from '../assets/images/logos/banks/bank-bni.svg';
import bankCIMB from '../assets/images/logos/banks/bank-cimb.svg';
import bankDanamon from '../assets/images/logos/banks/bank-danamon.svg';
import bankOCBC from '../assets/images/logos/banks/bank-ocbc.svg';
import bankPermata from '../assets/images/logos/banks/bank-permata.svg';
import bankMaybank from '../assets/images/logos/banks/bank-maybank.svg';
import bankPanin from '../assets/images/logos/banks/bank-panin.svg';
import bankBTPN from '../assets/images/logos/banks/bank-btpn.svg';
import bankDBS from '../assets/images/logos/banks/bank-dbs.svg';
import bankHSBC from '../assets/images/logos/banks/bank-hsbc.svg';
import bankUOB from '../assets/images/logos/banks/bank-uob.svg';
import bankStandardChartered from '../assets/images/logos/banks/bank-standard-chartered.svg';

const lenders = [
  { name: 'Bank Mandiri', logo: bankMandiri },
  { name: 'Bank BCA', logo: bankBCA },
  { name: 'Bank BRI', logo: bankBRI },
  { name: 'Bank BNI', logo: bankBNI },
  { name: 'Bank CIMB', logo: bankCIMB },
  { name: 'Bank Danamon', logo: bankDanamon },
  { name: 'Bank OCBC', logo: bankOCBC },
  { name: 'Bank Permata', logo: bankPermata },
  { name: 'Bank Maybank', logo: bankMaybank },
  { name: 'Bank Panin', logo: bankPanin },
  { name: 'Bank BTPN', logo: bankBTPN },
  { name: 'Bank DBS', logo: bankDBS },
  { name: 'Bank HSBC', logo: bankHSBC },
  { name: 'Bank UOB', logo: bankUOB },
  { name: 'Bank Standard Chartered', logo: bankStandardChartered },
];

const LenderPartners = () => {
  return (
    <div className="py-16 bg-fundax-lightGray">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Akses ke Ratusan Produk Pinjaman
          </h2>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto mb-2">
            dari 30+ Lender Terpercaya
          </p>
          <div className="flex items-center justify-center gap-2 text-fundax-grayText">
            <Building2 size={20} />
            <span className="text-sm">Lebih dari 30 bank dan lembaga keuangan terpercaya</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {lenders.map((lender, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-24"
            >
              <img
                src={lender.logo}
                alt={lender.name}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                title={lender.name}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-fundax-grayText">
            Dan masih banyak lagi partner bank dan lembaga keuangan lainnya
          </p>
        </div>
      </div>
    </div>
  );
};

export default LenderPartners;
