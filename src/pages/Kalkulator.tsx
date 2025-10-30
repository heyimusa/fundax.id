import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Ubah path import untuk menggunakan path relatif
import KprCalculator from '../components/kalkulator/KprCalculator';
import TakeOverCalculator from '../components/kalkulator/TakeOverCalculator';
import MultigunaCalculator from '../components/kalkulator/MultigunaCalculator';
import DepositoCalculator from '../components/kalkulator/DepositoCalculator';

const Kalkulator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-fundax-darkText">Kalkulator Finansial</h1>
        
        {/* Tab utama */}
        <Tabs defaultValue="KPR" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto p-1 bg-muted">
            <TabsTrigger 
              value="KPR" 
              className="data-[state=active]:bg-fundax-blue data-[state=active]:text-white transition-all"
            >
              KPR
            </TabsTrigger>
            <TabsTrigger 
              value="TAKE_OVER" 
              className="data-[state=active]:bg-fundax-blue data-[state=active]:text-white transition-all"
            >
              TAKE OVER
            </TabsTrigger>
            <TabsTrigger 
              value="MULTIGUNA" 
              className="data-[state=active]:bg-fundax-blue data-[state=active]:text-white transition-all"
            >
              MULTIGUNA
            </TabsTrigger>
            <TabsTrigger 
              value="DEPOSITO" 
              className="data-[state=active]:bg-fundax-blue data-[state=active]:text-white transition-all"
            >
              DEPOSITO
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="KPR">
            <KprCalculator />
          </TabsContent>
          
          <TabsContent value="TAKE_OVER">
            <TakeOverCalculator />
          </TabsContent>
          
          <TabsContent value="MULTIGUNA">
            <MultigunaCalculator />
          </TabsContent>
          
          <TabsContent value="DEPOSITO">
            <DepositoCalculator />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Kalkulator;