
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WhyFundax = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold text-fundax-blue mb-4">Mengapa Fundax?</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Fundax adalah solusi keuangan terpercaya dengan layanan terbaik di kelasnya.
          Kami menawarkan produk inovatif, proses cepat, dan dukungan pelanggan yang responsif.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default WhyFundax;
