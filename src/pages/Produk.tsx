
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Produk = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold text-fundax-blue mb-4">Produk Kami</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Kami menyediakan berbagai macam produk finansial untuk memenuhi kebutuhan Anda.
          Silakan jelajahi pilihan produk kami untuk menemukan solusi yang tepat.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Produk;
