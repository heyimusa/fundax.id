import React from 'react';
import { Newspaper } from 'lucide-react';

const media = [
  { name: 'Swasembada', logo: 'https://via.placeholder.com/120x60?text=Swasembada' },
  { name: 'Bisnis Indonesia', logo: 'https://via.placeholder.com/120x60?text=Bisnis+Indonesia' },
  { name: 'Liputan 6', logo: 'https://via.placeholder.com/120x60?text=Liputan+6' },
  { name: 'Kontan', logo: 'https://via.placeholder.com/120x60?text=Kontan' },
  { name: 'Merdeka', logo: 'https://via.placeholder.com/120x60?text=Merdeka' },
  { name: 'Republika', logo: 'https://via.placeholder.com/120x60?text=Republika' },
  { name: 'Suara Pemberitaan', logo: 'https://via.placeholder.com/120x60?text=Suara' },
  { name: 'Bisnis.com', logo: 'https://via.placeholder.com/120x60?text=Bisnis.com' },
  { name: 'Marketing.co.id', logo: 'https://via.placeholder.com/120x60?text=Marketing' },
  { name: 'Media Indonesia', logo: 'https://via.placeholder.com/120x60?text=Media+Indonesia' },
];

const MediaCoverage = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Newspaper className="text-fundax-blue" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue">
              Telah Diliput Oleh
            </h2>
          </div>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Media-media terpercaya yang telah meliput Fundax dan layanan kami
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {media.map((outlet, idx) => (
            <div
              key={idx}
              className="bg-fundax-lightGray p-4 rounded-lg hover:bg-white hover:shadow-md transition-all flex items-center justify-center h-24"
            >
              <img
                src={outlet.logo}
                alt={outlet.name}
                className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                title={outlet.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCoverage;
