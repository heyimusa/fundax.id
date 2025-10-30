
import React from 'react';
import heroImage from '../assets/images/hero/hero-financial-services.svg';

const Hero = () => {
  return (
    <div className="relative w-full h-[415px] sm:h-[450px]">
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <div className="w-full h-full bg-[#D9D9D9]">
          <img 
            src={heroImage} 
            alt="Financial services" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.5)]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col gap-[30px] sm:gap-[40px] md:gap-[60px] w-full max-w-[90%] sm:max-w-[80%] md:max-w-[600px] lg:max-w-[501px] mx-auto lg:mx-0 lg:ml-[10%] p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-white text-[24px] sm:text-[28px] md:text-[32px] font-semibold leading-[1.2]">
            Penuhi Kebutuhan Finansial Bersama Kami
          </div>
          <div className="text-white text-sm sm:text-base font-medium leading-6">
            Fundax Adviser kami siap membantu memenuhi kebutuhan finansial Anda dalam bentuk kredit kepemilikan rumah, modal kerja, pinjaman bridging, kredit multiguna, dan pemasaran asset. Konsultasikan dengan ahlinya untuk mendapatkan pelayanan terbaik
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="bg-fundax-blue text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-sm whitespace-nowrap transition-all duration-200 hover:bg-fundax-blue/90 hover:shadow-lg hover:scale-105 active:scale-100">
            Ajukan
          </button>
          <button className="bg-fundax-lightGray text-fundax-blue px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-sm whitespace-nowrap transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-105 active:scale-100 border border-transparent hover:border-fundax-blue/20">
            Konsultasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
