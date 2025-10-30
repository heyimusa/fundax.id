import React from 'react';
import { Building2 } from 'lucide-react';

const lenders = [
  { name: 'Bank Mandiri', logo: 'https://via.placeholder.com/150x80?text=Bank+Mandiri' },
  { name: 'Bank BCA', logo: 'https://via.placeholder.com/150x80?text=Bank+BCA' },
  { name: 'Bank BRI', logo: 'https://via.placeholder.com/150x80?text=Bank+BRI' },
  { name: 'Bank BNI', logo: 'https://via.placeholder.com/150x80?text=Bank+BNI' },
  { name: 'Bank CIMB', logo: 'https://via.placeholder.com/150x80?text=Bank+CIMB' },
  { name: 'Bank Danamon', logo: 'https://via.placeholder.com/150x80?text=Bank+Danamon' },
  { name: 'Bank OCBC', logo: 'https://via.placeholder.com/150x80?text=Bank+OCBC' },
  { name: 'Bank Permata', logo: 'https://via.placeholder.com/150x80?text=Bank+Permata' },
  { name: 'Bank Maybank', logo: 'https://via.placeholder.com/150x80?text=Bank+Maybank' },
  { name: 'Bank Panin', logo: 'https://via.placeholder.com/150x80?text=Bank+Panin' },
  { name: 'Bank BTPN', logo: 'https://via.placeholder.com/150x80?text=Bank+BTPN' },
  { name: 'Bank DBS', logo: 'https://via.placeholder.com/150x80?text=Bank+DBS' },
  { name: 'Bank HSBC', logo: 'https://via.placeholder.com/150x80?text=Bank+HSBC' },
  { name: 'Bank UOB', logo: 'https://via.placeholder.com/150x80?text=Bank+UOB' },
  { name: 'Bank Standard Chartered', logo: 'https://via.placeholder.com/150x80?text=Bank+SC' },
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
