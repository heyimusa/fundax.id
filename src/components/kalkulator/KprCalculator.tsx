import React, { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { formatCurrency } from "../../lib/utils";

const KprCalculator = () => {
  const [activeTab, setActiveTab] = useState<string>("KPR");
  const [activeResultTab, setActiveResultTab] = useState<string>("HASIL_KPR");
  const [pendapatanBulanan, setPendapatanBulanan] = useState<number>(5000000);
  const [usia, setUsia] = useState<number>(25);
  const [lamaPinjaman, setLamaPinjaman] = useState<number>(15);
  const [jumlahCicilan, setJumlahCicilan] = useState<number>(1500000);
  const [sukuBungaFix, setSukuBungaFix] = useState<number>(3);
  const [masaTahunFix, setMasaTahunFix] = useState<number>(5);
  const [sukuBungaFloating, setSukuBungaFloating] = useState<number>(8);
  const [isBungaBergerak, setIsBungaBergerak] = useState<boolean>(false);
  const [tipeBungaAcuan, setTipeBungaAcuan] = useState<string>("KPR_KONVENSIONAL");
  const [sukuBungaBerjenjang, setSukuBungaBerjenjang] = useState<number[]>([]);
  
  const [maksimalLimitPinjaman, setMaksimalLimitPinjaman] = useState<number>(0);
  const [angsuranMasaFixedBunga, setAngsuranMasaFixedBunga] = useState<number>(0);
  const [angsuranMasaFloatingBunga, setAngsuranMasaFloatingBunga] = useState<number>(0);
  const [jangkaWaktuAngsuran, setJangkaWaktuAngsuran] = useState<number>(0);
  const [tabelAngsuran, setTabelAngsuran] = useState<Array<{
    bulan: number;
    bunga: string;
    angsuran: number;
    sisaPlafond: number;
  }>>([]);

  useEffect(() => {
    hitungKPR();
  }, [pendapatanBulanan, usia, lamaPinjaman, jumlahCicilan, sukuBungaFix, masaTahunFix, sukuBungaFloating, isBungaBergerak, tipeBungaAcuan, sukuBungaBerjenjang]);

  useEffect(() => {
    if (isBungaBergerak) {
      // Pastikan array sukuBungaBerjenjang memiliki panjang yang sesuai dengan lamaPinjaman
      const newSukuBungaBerjenjang = [...sukuBungaBerjenjang];
      
      // Jika array terlalu pendek, tambahkan nilai
      while (newSukuBungaBerjenjang.length < lamaPinjaman) {
        // Gunakan nilai terakhir atau default 3.0
        newSukuBungaBerjenjang.push(newSukuBungaBerjenjang[newSukuBungaBerjenjang.length - 1] || 3.0);
      }
      
      // Jika array terlalu panjang, potong
      if (newSukuBungaBerjenjang.length > lamaPinjaman) {
        newSukuBungaBerjenjang.length = lamaPinjaman;
      }
      
      setSukuBungaBerjenjang(newSukuBungaBerjenjang);
    }
  }, [lamaPinjaman, isBungaBergerak]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsBungaBergerak(checked);
    
    if (checked) {
      // Buat array default dengan panjang sesuai lama pinjaman
      const defaultValues = [7.1, 6.5, 5.4, 5.4, 5.1, 4.8, 4.7, 4.7, 4.4, 4.1, 4.1, 4.0, 3.7, 3.3, 3.0];
      
      // Perluas array jika lama pinjaman lebih dari 15 tahun
      const newSukuBungaBerjenjang = [...defaultValues];
      while (newSukuBungaBerjenjang.length < lamaPinjaman) {
        // Gunakan nilai terakhir untuk tahun-tahun berikutnya
        newSukuBungaBerjenjang.push(defaultValues[defaultValues.length - 1] || 3.0);
      }
      
      setSukuBungaBerjenjang(newSukuBungaBerjenjang);
    }
  };

  const hitungKPR = () => {
    try {
      // Hitung maksimal limit pinjaman
      const tenorBulan = lamaPinjaman * 12;
      const maksimalPinjaman = jumlahCicilan * tenorBulan;
      setMaksimalLimitPinjaman(maksimalPinjaman);

      // Inisialisasi array tabel angsuran baru
      const newTabelAngsuran: Array<{
        bulan: number;
        bunga: string;
        angsuran: number;
        sisaPlafond: number;
      }> = [];

      // Jika menggunakan bunga berjenjang
      if (isBungaBergerak) {
        // Pastikan array sukuBungaBerjenjang cukup panjang
        const bungaBerjenjang = [...sukuBungaBerjenjang];
        while (bungaBerjenjang.length < lamaPinjaman) {
          bungaBerjenjang.push(bungaBerjenjang[bungaBerjenjang.length - 1] || 3.0);
        }
        
        // Hitung angsuran dengan bunga berjenjang
        let sisaPinjaman = maksimalPinjaman;
        
        // Untuk setiap bulan dalam tenor
        for (let bulanKe = 1; bulanKe <= tenorBulan; bulanKe++) {
          // Tentukan tahun ke berapa (dimulai dari 0)
          const tahunKe = Math.floor((bulanKe - 1) / 12);
          
          // Ambil suku bunga untuk tahun tersebut
          const sukuBungaTahun = bungaBerjenjang[tahunKe];
          const sukuBungaBulanan = sukuBungaTahun / 100 / 12;
          
          // Hitung bunga bulanan
          const bungaBulanan = sisaPinjaman * sukuBungaBulanan;
          
          // Hitung angsuran pokok (asumsi angsuran tetap)
          const angsuranPokok = jumlahCicilan - bungaBulanan;
          
          // Update sisa pinjaman
          sisaPinjaman -= angsuranPokok;
          if (sisaPinjaman < 0) sisaPinjaman = 0;
          
          // Tambahkan ke tabel angsuran
          newTabelAngsuran.push({
            bulan: bulanKe,
            bunga: `${sukuBungaTahun}%`,
            angsuran: jumlahCicilan,
            sisaPlafond: sisaPinjaman
          });
        }
        
        setAngsuranMasaFixedBunga(jumlahCicilan);
        setAngsuranMasaFloatingBunga(0); // Tidak ada floating bunga dalam mode berjenjang
      } else {
        // Kode perhitungan untuk bunga fixed dan floating
        let sisaPinjaman = maksimalPinjaman;
        const sukuBungaBulananFix = sukuBungaFix / 100 / 12;
        const sukuBungaBulananFloating = sukuBungaFloating / 100 / 12;
        const masaBulanFix = Math.min(masaTahunFix * 12, tenorBulan);
        
        // Generate untuk masa fixed bunga
        for (let i = 1; i <= masaBulanFix; i++) {
          const bungaBulanan = sisaPinjaman * sukuBungaBulananFix;
          const angsuranPokok = jumlahCicilan - bungaBulanan;
          sisaPinjaman -= angsuranPokok;
          
          newTabelAngsuran.push({
            bulan: i,
            bunga: `${sukuBungaFix}%`,
            angsuran: jumlahCicilan,
            sisaPlafond: sisaPinjaman > 0 ? sisaPinjaman : 0
          });
        }
        
        // Generate untuk masa floating bunga
        if (masaBulanFix < tenorBulan) {
          for (let i = masaBulanFix + 1; i <= tenorBulan; i++) {
            const bungaBulanan = sisaPinjaman * sukuBungaBulananFloating;
            const angsuranPokok = jumlahCicilan - bungaBulanan;
            sisaPinjaman -= angsuranPokok;
            
            newTabelAngsuran.push({
              bulan: i,
              bunga: `${sukuBungaFloating}%`,
              angsuran: jumlahCicilan,
              sisaPlafond: sisaPinjaman > 0 ? sisaPinjaman : 0
            });
          }
        }
        
        setAngsuranMasaFixedBunga(jumlahCicilan);
        setAngsuranMasaFloatingBunga(jumlahCicilan); // Sama untuk sederhananya
      }
      
      // Selalu set tabel angsuran dengan array baru
      setTabelAngsuran(newTabelAngsuran);
      setJangkaWaktuAngsuran(tenorBulan);
    } catch (error) {
      console.error("Error dalam perhitungan KPR:", error);
      // Set tabel angsuran kosong jika terjadi error
      setTabelAngsuran([]);
    }
  };

  // Render form input
  const renderInputForm = () => (
    <div className="space-y-6">
      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeTab === "KPR" ? "default" : "outline"} 
          className={activeTab === "KPR" ? "bg-blue-900 text-white" : ""}
          onClick={() => setActiveTab("KPR")}
        >
          KPR
        </Button>
        <Button 
          variant={activeTab === "TAKE_OVER" ? "default" : "outline"} 
          className={activeTab === "TAKE_OVER" ? "bg-blue-900 text-white" : ""}
          onClick={() => setActiveTab("TAKE_OVER")}
        >
          TAKE OVER
        </Button>
        <Button 
          variant={activeTab === "MULTIGUNA" ? "default" : "outline"} 
          className={activeTab === "MULTIGUNA" ? "bg-blue-900 text-white" : ""}
          onClick={() => setActiveTab("MULTIGUNA")}
        >
          MULTIGUNA
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="pendapatanBulanan" className="text-sm font-normal text-gray-600">
            Pendapatan bulanan
          </Label>
          <Input
            id="pendapatanBulanan"
            type="number"
            value={pendapatanBulanan}
            onChange={(e) => setPendapatanBulanan(parseFloat(e.target.value))}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="usia" className="text-sm font-normal text-gray-600">
              Usia
            </Label>
            <Input
              id="usia"
              type="number"
              value={usia}
              onChange={(e) => setUsia(parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lamaPinjaman" className="text-sm font-normal text-gray-600">
              Lama Pinjaman (Tahun)
            </Label>
            <Input
              id="lamaPinjaman"
              type="number"
              value={lamaPinjaman}
              onChange={(e) => setLamaPinjaman(parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="jumlahCicilan" className="text-sm font-normal text-gray-600">
            Jumlah cicilan saat ini yang dibayarkan setiap bulan
          </Label>
          <Input
            id="jumlahCicilan"
            type="number"
            value={jumlahCicilan}
            onChange={(e) => setJumlahCicilan(parseFloat(e.target.value))}
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="bungaBergerak" 
            checked={isBungaBergerak}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="bungaBergerak"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Suku Bunga Bergerak
          </label>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-normal text-gray-600">
            Suku Bunga Acuan
          </Label>
          <RadioGroup value={tipeBungaAcuan} onValueChange={setTipeBungaAcuan} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="KPR_KONVENSIONAL" id="kpr_konvensional" />
              <label htmlFor="kpr_konvensional" className="text-sm">KPR KONVENSIONAL</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="KPR_SYARIAH" id="kpr_syariah" />
              <label htmlFor="kpr_syariah" className="text-sm">KPR SYARIAH</label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sukuBungaFix" className="text-sm font-normal text-gray-600">
            Suku Bunga Fix (%)
          </Label>
          <Input
            id="sukuBungaFix"
            type="number"
            value={sukuBungaFix}
            onChange={(e) => setSukuBungaFix(parseFloat(e.target.value))}
            className={`mt-1 ${isBungaBergerak ? "bg-gray-100" : ""}`}
            disabled={isBungaBergerak}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="masaTahunFix" className="text-sm font-normal text-gray-600">
              Masa Tahun Fix (Tahun)
            </Label>
            <Input
              id="masaTahunFix"
              type="number"
              value={masaTahunFix}
              onChange={(e) => setMasaTahunFix(parseInt(e.target.value))}
              className={`mt-1 ${isBungaBergerak ? "bg-gray-100" : ""}`}
              disabled={isBungaBergerak}
            />
          </div>
          <div>
            <Label htmlFor="sukuBungaFloating" className="text-sm font-normal text-gray-600">
              Suku Bunga Floating (%)
            </Label>
            <Input
              id="sukuBungaFloating"
              type="number"
              value={sukuBungaFloating}
              onChange={(e) => setSukuBungaFloating(parseFloat(e.target.value))}
              className={`mt-1 ${isBungaBergerak ? "bg-gray-100" : ""}`}
              disabled={isBungaBergerak}
            />
          </div>
        </div>

        {isBungaBergerak && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <div className="flex items-center mb-2">
              <Checkbox 
                id="sukuBungaBerjenjang" 
                checked={true}
                disabled
              />
              <label
                htmlFor="sukuBungaBerjenjang"
                className="ml-2 text-sm font-medium"
              >
                Suku Bunga Berjenjang
              </label>
            </div>
            
            <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
              {Array.from({ length: lamaPinjaman }).map((_, index) => (
                <div key={index} className="space-y-1">
                  <label className="text-xs text-gray-600">Bunga Tahun ke-{index + 1}</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={sukuBungaBerjenjang[index] || 0}
                    onChange={(e) => {
                      const newSukuBungaBerjenjang = [...sukuBungaBerjenjang];
                      newSukuBungaBerjenjang[index] = parseFloat(e.target.value);
                      setSukuBungaBerjenjang(newSukuBungaBerjenjang);
                    }}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          className="w-full bg-blue-900 hover:bg-blue-800"
          onClick={hitungKPR}
        >
          Lihat Hasil
        </Button>
      </div>
    </div>
  );

  // Render hasil perhitungan
  const renderHasilPerhitungan = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hasil</h2>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeResultTab === "HASIL_KPR" ? "default" : "outline"} 
          className={activeResultTab === "HASIL_KPR" ? "bg-blue-900 text-white" : ""}
          onClick={() => setActiveResultTab("HASIL_KPR")}
        >
          HASIL KPR
        </Button>
        <Button 
          variant={activeResultTab === "DETAIL_TABEL_ANGSURAN" ? "default" : "outline"} 
          className={activeResultTab === "DETAIL_TABEL_ANGSURAN" ? "bg-blue-900 text-white" : ""}
          onClick={() => setActiveResultTab("DETAIL_TABEL_ANGSURAN")}
        >
          DETAIL TABEL ANGSURAN
        </Button>
      </div>
      
      {activeResultTab === "HASIL_KPR" && (
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-600">Maksimal Limit Pinjaman</p>
            <p className="text-2xl font-bold text-blue-900">{formatCurrency(maksimalLimitPinjaman)}</p>
          </div>
          
          {isBungaBergerak ? (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Bunga Tahun Pertama</p>
                <p className="text-xl font-semibold text-blue-900">{sukuBungaBerjenjang[0]} %</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Tenor</p>
                <p className="text-xl font-semibold text-blue-500">{lamaPinjaman} Tahun</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Bunga Tahun Terakhir</p>
                <p className="text-xl font-semibold text-blue-500">
                  {sukuBungaBerjenjang[lamaPinjaman - 1]} %
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Bunga Fixed</p>
                <p className="text-xl font-semibold text-blue-900">{sukuBungaFix} %</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Tenor</p>
                <p className="text-xl font-semibold text-blue-500">{lamaPinjaman} Tahun</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Masa Fixed</p>
                <p className="text-xl font-semibold text-blue-500">{masaTahunFix} Tahun</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {isBungaBergerak ? (
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-sm">Angsuran bulanan (dapat berubah setiap tahun)</p>
                <p className="text-sm font-semibold">{formatCurrency(jumlahCicilan)}/Bulan</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center border-b pb-2">
                  <p className="text-sm">Angsuran selama masa fixed bunga {sukuBungaFix}% selama Bulan 1 - {masaTahunFix * 12}</p>
                  <p className="text-sm font-semibold">{formatCurrency(angsuranMasaFixedBunga)}/Bulan</p>
                </div>
                
                {masaTahunFix < lamaPinjaman && (
                  <div className="flex justify-between items-center border-b pb-2">
                    <p className="text-sm">Angsuran selama masa floating bunga {sukuBungaFloating}% selama Bulan {masaTahunFix * 12 + 1} - {lamaPinjaman * 12}</p>
                    <p className="text-sm font-semibold">{formatCurrency(angsuranMasaFloatingBunga)}/Bulan</p>
                  </div>
                )}
              </>
            )}
            
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm">Jangka Waktu Angsuran</p>
              <p className="text-sm font-semibold">{jangkaWaktuAngsuran} Bulan</p>
            </div>
          </div>
        </>
      )}
      
      {activeResultTab === "DETAIL_TABEL_ANGSURAN" && (
        <div className="overflow-auto max-h-[400px]">
          {tabelAngsuran && tabelAngsuran.length > 0 ? (
            <>
              <table className="w-full border-collapse">
                <thead className="bg-blue-900 text-white sticky top-0">
                  <tr>
                    <th className="p-3 text-left">Bulan</th>
                    <th className="p-3 text-left">Bunga</th>
                    <th className="p-3 text-right">Angsuran</th>
                    <th className="p-3 text-right">Sisa Plafond</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelAngsuran.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border-b">{row.bulan}</td>
                      <td className="p-3 border-b">{row.bunga}</td>
                      <td className="p-3 border-b text-right">{formatCurrency(row.angsuran)}</td>
                      <td className="p-3 border-b text-right">{formatCurrency(row.sisaPlafond)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="flex justify-between items-center mt-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Rows per page:</span>
                  <select className="border rounded p-1 text-sm">
                    <option>12</option>
                    <option>24</option>
                    <option>48</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">1–{Math.min(12, tabelAngsuran.length)} of {tabelAngsuran.length}</span>
                  <button className="p-1 rounded hover:bg-gray-200" disabled={true}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-200" disabled={tabelAngsuran.length <= 12}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Tidak ada data angsuran untuk ditampilkan.</p>
              <p className="text-gray-500 text-sm mt-2">Silakan isi semua data dan klik "Lihat Hasil" untuk melihat tabel angsuran.</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 flex gap-2">
        <Button className="w-full bg-blue-900 hover:bg-blue-800">
          Download PDF
        </Button>
        <Button className="w-full bg-blue-900 hover:bg-blue-800">
          Ajukan KPR
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        Catatan: Perhitungan ini adalah hasil perkiraan aplikasi KPR secara umum. Data perhitungan di atas dapat berbeda dengan perhitungan bank. Untuk perhitungan yang akurat, silakan hubungi bank penyedia pinjaman KPR.
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        {renderInputForm()}
      </div>
      <div>
        {renderHasilPerhitungan()}
      </div>
    </div>
  );
};

export default KprCalculator; 