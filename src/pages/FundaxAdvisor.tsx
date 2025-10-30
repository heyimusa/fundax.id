
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FundaxAdvisor = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold text-fundax-blue mb-4">Fundax Advisor</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Fundax Advisor membantu Anda membuat keputusan keuangan yang tepat.
          Konsultasikan kebutuhan finansial Anda dengan para ahli kami.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default FundaxAdvisor;
