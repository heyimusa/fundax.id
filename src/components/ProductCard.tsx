
import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-[24px_32px] rounded-lg shadow-[0px_2px_4px_0px_rgba(171,190,209,0.20)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
      <div className="flex flex-col items-center gap-4">
        <div className="w-[65px] h-[56px] flex items-center justify-center bg-fundax-lightGray rounded-full transition-all duration-300 group-hover:bg-fundax-blue/10 group-hover:scale-110">
          {icon || (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:scale-110">
              <path d="M3 9L12 5L21 9V19L12 23L3 19V9Z" stroke="#1E5C9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="text-fundax-darkText text-[28px] font-bold leading-9 text-center transition-colors duration-300 group-hover:text-fundax-blue">
          {title}
        </div>
      </div>
      <div className="text-[#89939E] text-sm leading-[30px] text-center mt-2 transition-colors duration-300 group-hover:text-fundax-grayText">
        {description}
      </div>
    </div>
  );
};

export default ProductCard;
