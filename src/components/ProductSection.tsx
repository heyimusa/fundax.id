
import React from 'react';
import ProductCard from './ProductCard';
import { Home, Briefcase, Building2, KeyRound } from 'lucide-react';

const ProductSection = () => {
  const products = [
    {
      title: "Kredit Kepemilikan Rumah",
      description: "Dapatkan solusi KPR untuk kebutuhan properti Anda dengan suku bunga kompetitif dan proses yang mudah",
      icon: <Home className="text-fundax-blue" size={32} />
    },
    {
      title: "Modal Kerja",
      description: "Solusi pendanaan fleksibel untuk mendukung pertumbuhan bisnis Anda dengan proses cepat",
      icon: <Briefcase className="text-fundax-blue" size={32} />
    },
    {
      title: "Pinjaman Bridging",
      description: "Pembiayaan jangka pendek untuk kebutuhan bridge financing dengan proses yang cepat dan fleksibel",
      icon: <Building2 className="text-fundax-blue" size={32} />
    },
    {
      title: "Kredit Multiguna",
      description: "Pinjaman multiguna untuk berbagai kebutuhan keuangan Anda dengan jaminan properti",
      icon: <KeyRound className="text-fundax-blue" size={32} />
    }
  ];

  return (
    <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36">
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <div className="text-fundax-darkText text-[28px] sm:text-[32px] md:text-[36px] font-semibold leading-[1.2] mb-2">
          Pilih Produk sesuai dengan Kebutuhan Mu
        </div>
        <div className="text-fundax-grayText text-base sm:text-lg leading-7">
          Mudah, Cepat, & Fleksibel
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8">
        {products.map((product, index) => (
          <ProductCard 
            key={index}
            title={product.title}
            description={product.description}
            icon={product.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
