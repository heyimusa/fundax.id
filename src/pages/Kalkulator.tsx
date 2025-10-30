import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Ubah path import untuk menggunakan path relatif
import KprCalculator from '../components/kalkulator/KprCalculator';
import TakeOverCalculator from '../components/kalkulator/TakeOverCalculator';
import MultigunaCalculator from '../components/kalkulator/MultigunaCalculator';
import DepositoCalculator from '../components/kalkulator/DepositoCalculator';

const Kalkulator = () => {
  // Gunakan satu state untuk melacak tab aktif
  const [activeTab, setActiveTab] = useState<string>("KPR");

  // Render konten berdasarkan tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case "KPR":
        return <KprCalculator />;
      case "TAKE_OVER":
        return <TakeOverCalculator />;
      case "MULTIGUNA":
        return <MultigunaCalculator />;
      case "DEPOSITO":
        return <DepositoCalculator />;
      default:
        return <KprCalculator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Kalkulator Finansial</h1>
        
        {/* Tab utama */}
        <div className="mb-6">
          <div className="bg-gray-100 p-2 rounded-lg">
            <div className="flex flex-wrap">
              <button 
                className={`px-4 py-2 rounded-md mr-2 mb-2 ${activeTab === "KPR" ? "bg-blue-900 text-white" : "bg-white"}`}
                onClick={() => setActiveTab("KPR")}
              >
                KPR
              </button>
              <button 
                className={`px-4 py-2 rounded-md mr-2 mb-2 ${activeTab === "TAKE_OVER" ? "bg-blue-900 text-white" : "bg-white"}`}
                onClick={() => setActiveTab("TAKE_OVER")}
              >
                TAKE OVER
              </button>
              <button 
                className={`px-4 py-2 rounded-md mr-2 mb-2 ${activeTab === "MULTIGUNA" ? "bg-blue-900 text-white" : "bg-white"}`}
                onClick={() => setActiveTab("MULTIGUNA")}
              >
                MULTIGUNA
              </button>
              <button 
                className={`px-4 py-2 rounded-md mr-2 mb-2 ${activeTab === "DEPOSITO" ? "bg-blue-900 text-white" : "bg-white"}`}
                onClick={() => setActiveTab("DEPOSITO")}
              >
                DEPOSITO
              </button>
            </div>
          </div>
        </div>
        
        {/* Konten */}
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Kalkulator;