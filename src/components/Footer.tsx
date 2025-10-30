
import React from 'react';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#2D7BAF] font-inter mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-10 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact Section */}
          <div className="mb-6 sm:mb-0">
            <div className="text-white font-bold text-sm mb-4">
              Hubungi Kami
            </div>
            <div className="text-white text-xs">
              Sahid Sudirman Center 43E floor Jl. Jend. Sudirman No.86 Jakarta Pusat DKI Jakarta, Indonesia 10220
            </div>
            <div className="text-white text-xs space-y-1 mt-3">
              <p>Telepon : (021) 2788 9788</p>
              <p>Email : cs@fundaxindonesia.co.id</p>
              <p>Jam Kerja: Senin-Jumat (09.00- 17.00)</p>
            </div>
          </div>
          
          {/* About Us Section */}
          <div className="mb-6 sm:mb-0">
            <div className="text-white font-bold text-sm mb-4">
              Tentang Kami
            </div>
            <div className="flex flex-col space-y-2">
              {[
                { name: 'Produk', path: '/produk' },
                { name: 'Berita', path: '/berita' },
                { name: 'Kenapa Fundax', path: '/why-fundax' },
                { name: 'Karir', path: '/karir' },
                { name: 'Bisnis', path: '/bisnis' }
              ].map((item) => (
                <Link key={item.name} to={item.path} className="text-white text-xs hover:underline">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social Media Section */}
          <div>
            <div className="text-white font-bold text-sm mb-4">
              Media Sosial
            </div>
            <div className="flex items-center gap-3 mb-4">
              <a href="#" className="flex w-[30px] h-[30px] p-[9px] items-center justify-center rounded-full bg-white hover:bg-gray-100">
                <Facebook className="w-[12px] h-[12px] text-fundax-blue" />
              </a>
              <a href="#" className="flex w-[30px] h-[30px] p-[9px] items-center justify-center rounded-full bg-white hover:bg-gray-100">
                <Linkedin className="w-[12px] h-[12px] text-fundax-blue" />
              </a>
              <a href="#" className="flex w-[30px] h-[30px] p-[9px] items-center justify-center rounded-full bg-white hover:bg-gray-100">
                <Instagram className="w-[12px] h-[12px] text-fundax-blue" />
              </a>
              <a href="#" className="flex w-[30px] h-[30px] p-[9px] items-center justify-center rounded-full bg-white hover:bg-gray-100">
                <Twitter className="w-[12px] h-[12px] text-fundax-blue" />
              </a>
            </div>
            <div className="text-white text-xs space-y-1">
              <p>2024 Fundax | <a href="#" className="hover:underline">Kebijakan Privasi</a></p>
              <p><a href="#" className="hover:underline">Syarat dan Ketentuan</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
