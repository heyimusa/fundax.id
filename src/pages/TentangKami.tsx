
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TentangKami = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold text-fundax-blue mb-4">Tentang Kami</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Fundax adalah platform finansial terpercaya yang menyediakan berbagai solusi
          keuangan untuk individu dan bisnis di Indonesia. Kami berkomitmen untuk membantu
          pelanggan kami mencapai kesuksesan finansial melalui produk dan layanan inovatif.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TentangKami;
