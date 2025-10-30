
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Berita = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold text-fundax-blue mb-4">Berita & Informasi</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Dapatkan informasi terbaru tentang Fundax, produk kami, dan berita 
          terkini seputar dunia finansial untuk membuat keputusan keuangan yang lebih baik.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Berita;
