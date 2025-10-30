import React from 'react';
import { Newspaper } from 'lucide-react';

// Media logos
import swasembada from '../assets/images/logos/media/swasembada.svg';
import bisnisIndonesia from '../assets/images/logos/media/bisnis-indonesia.svg';
import liputan6 from '../assets/images/logos/media/liputan-6.svg';
import kontan from '../assets/images/logos/media/kontan.svg';
import merdeka from '../assets/images/logos/media/merdeka.svg';
import republika from '../assets/images/logos/media/republika.svg';
import suaraPemberitaan from '../assets/images/logos/media/suara-pemberitaan.svg';
import bisnisCom from '../assets/images/logos/media/bisnis-com.svg';
import marketingCoId from '../assets/images/logos/media/marketing-co-id.svg';
import mediaIndonesia from '../assets/images/logos/media/media-indonesia.svg';

const media = [
  { name: 'Swasembada', logo: swasembada },
  { name: 'Bisnis Indonesia', logo: bisnisIndonesia },
  { name: 'Liputan 6', logo: liputan6 },
  { name: 'Kontan', logo: kontan },
  { name: 'Merdeka', logo: merdeka },
  { name: 'Republika', logo: republika },
  { name: 'Suara Pemberitaan', logo: suaraPemberitaan },
  { name: 'Bisnis.com', logo: bisnisCom },
  { name: 'Marketing.co.id', logo: marketingCoId },
  { name: 'Media Indonesia', logo: mediaIndonesia },
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
