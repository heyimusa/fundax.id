import React, { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { formatCurrency } from "../../lib/utils";

const DepositoCalculator = () => {
  const [pokok, setPokok] = useState<number>(10000000);
  const [sukuBunga, setSukuBunga] = useState<number>(5);
  const [jangkaWaktu, setJangkaWaktu] = useState<number>(12);
  const [pajakBunga, setPajakBunga] = useState<number>(20);
  
  const [bungaBruto, setBungaBruto] = useState<number>(0);
  const [pajakTotal, setPajakTotal] = useState<number>(0);
  const [bungaNetto, setBungaNetto] = useState<number>(0);
  const [totalAkhir, setTotalAkhir] = useState<number>(0);

  const hitungDeposito = React.useCallback(() => {
    // Validasi input
    const validPokok = Math.max(0, pokok || 0);
    const validSukuBunga = Math.max(0, sukuBunga || 0);
    const validJangkaWaktu = Math.max(1, jangkaWaktu || 1);
    const validPajakBunga = Math.max(0, Math.min(100, pajakBunga || 0));

    // Hitung bunga bruto (sebelum pajak)
    const bruto = validPokok * (validSukuBunga / 100) * (validJangkaWaktu / 12);
    setBungaBruto(bruto);
    
    // Hitung pajak
    const pajak = bruto * (validPajakBunga / 100);
    setPajakTotal(pajak);
    
    // Hitung bunga netto (setelah pajak)
    const netto = bruto - pajak;
    setBungaNetto(netto);
    
    // Hitung total akhir
    const total = validPokok + netto;
    setTotalAkhir(total);
  }, [pokok, sukuBunga, jangkaWaktu, pajakBunga]);

  useEffect(() => {
    hitungDeposito();
  }, [hitungDeposito]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pokok" className="text-sm font-normal text-gray-600">
              Pokok Deposito
            </Label>
            <Input
              id="pokok"
              type="number"
              value={pokok}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setPokok(Math.max(0, value));
              }}
              className="mt-1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sukuBunga" className="text-sm font-normal text-gray-600">
              Suku Bunga (% per tahun)
            </Label>
            <Input
              id="sukuBunga"
              type="number"
              value={sukuBunga}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setSukuBunga(Math.max(0, value));
              }}
              className="mt-1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jangkaWaktu" className="text-sm font-normal text-gray-600">
              Jangka Waktu (bulan)
            </Label>
            <Input
              id="jangkaWaktu"
              type="number"
              value={jangkaWaktu}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setJangkaWaktu(Math.max(1, value));
              }}
              className="mt-1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pajakBunga" className="text-sm font-normal text-gray-600">
              Pajak Bunga (%)
            </Label>
            <Input
              id="pajakBunga"
              type="number"
              value={pajakBunga}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setPajakBunga(Math.max(0, Math.min(100, value)));
              }}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Hasil Perhitungan</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm">Pokok Deposito</p>
              <p className="text-sm font-semibold">{formatCurrency(pokok)}</p>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm">Bunga Bruto</p>
              <p className="text-sm font-semibold">{formatCurrency(bungaBruto)}</p>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm">Pajak ({pajakBunga}%)</p>
              <p className="text-sm font-semibold">{formatCurrency(pajakTotal)}</p>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm">Bunga Netto</p>
              <p className="text-sm font-semibold">{formatCurrency(bungaNetto)}</p>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm font-medium">Total Akhir</p>
              <p className="text-lg font-bold text-fundax-blue">{formatCurrency(totalAkhir)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositoCalculator; 