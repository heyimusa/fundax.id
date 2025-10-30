
import React from 'react';
import ProductCard from './ProductCard';
import { Home, PiggyBank, Briefcase, Building, CreditCard, Target } from 'lucide-react';

const ProductSection = () => {
  const products = [
    {
      title: "KPR & Multiguna",
      description: "Dapatkan solusi KPR dan pinjaman multiguna untuk kebutuhan properti dan keuangan Anda dengan suku bunga kompetitif",
      icon: <Home className="text-fundax-blue" size={32} />
    },
    {
      title: "Deposito",
      description: "Simpan dan kembangkan dana Anda dengan bunga menarik dan pilihan jangka waktu fleksibel untuk memaksimalkan keuntungan",
      icon: <PiggyBank className="text-fundax-blue" size={32} />
    },
    {
      title: "Modal Usaha",
      description: "Perluas bisnis Anda dengan solusi pendanaan fleksibel dan proses cepat untuk mendukung pertumbuhan usaha Anda",
      icon: <Briefcase className="text-fundax-blue" size={32} />
    },
    {
      title: "Take Over",
      description: "Pindahkan pinjaman Anda ke Fundax dan nikmati bunga lebih rendah serta persyaratan yang lebih menguntungkan",
      icon: <Building className="text-fundax-blue" size={32} />
    },
    {
      title: "Kredit Tanpa Agunan",
      description: "Dapatkan pinjaman tanpa jaminan dengan proses mudah dan cepat untuk berbagai kebutuhan mendesak Anda",
      icon: <CreditCard className="text-fundax-blue" size={32} />
    },
    {
      title: "Investasi",
      description: "Raih tujuan keuangan jangka panjang Anda dengan berbagai pilihan investasi yang aman dan menguntungkan",
      icon: <Target className="text-fundax-blue" size={32} />
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8">
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
