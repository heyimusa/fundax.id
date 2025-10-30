
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import Testimonials from '../components/Testimonials';
import LenderPartners from '../components/LenderPartners';
import MediaCoverage from '../components/MediaCoverage';
import ProcessSteps from '../components/ProcessSteps';
import MobileApp from '../components/MobileApp';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      <Hero />
      <ProductSection />
      <ProcessSteps />
      <LenderPartners />
      <Testimonials />
      <MediaCoverage />
      <MobileApp />
      <Footer />
    </div>
  );
};

export default Index;
