import React, { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../lib/utils";
import { generateCalculatorPDF } from "../../lib/pdfGenerator";

const TakeOverCalculator = () => {
  const [activeResultTab, setActiveResultTab] = useState<string>("HASIL_KPR");
  const [pendapatanBulanan, setPendapatanBulanan] = useState<number>(5000000);
  const [pendapatanBulananText, setPendapatanBulananText] = useState<string>((5000000).toLocaleString("id-ID"));
  const [usia, setUsia] = useState<number>(25);
  const [lamaPinjaman, setLamaPinjaman] = useState<number>(15);
  const [jumlahCicilan, setJumlahCicilan] = useState<number>(1500000);
  const [jumlahCicilanText, setJumlahCicilanText] = useState<string>((1500000).toLocaleString("id-ID"));
  const [sisaPinjaman, setSisaPinjaman] = useState<number>(300000000);
  const [sisaPinjamanText, setSisaPinjamanText] = useState<string>((300000000).toLocaleString("id-ID"));
  const [sukuBungaFix, setSukuBungaFix] = useState<number>(3);
  const [masaTahunFix, setMasaTahunFix] = useState<number>(5);
  const [sukuBungaFloating, setSukuBungaFloating] = useState<number>(8);
  const [isBungaBergerak, setIsBungaBergerak] = useState<boolean>(false);
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
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(12);

  // Helpers to format and parse currency-like inputs with dot grouping
  const formatWithDots = (value: string | number): string => {
    const num = typeof value === "number" ? value : parseInt(value.replace(/\D/g, "")) || 0;
    return num.toLocaleString("id-ID");
  };

  const parseDigits = (value: string): number => {
    const onlyDigits = value.replace(/\D/g, "");
    return onlyDigits ? parseInt(onlyDigits) : 0;
  };

  useEffect(() => {
    if (isBungaBergerak) {
      setSukuBungaBerjenjang((prev) => {
        const newSukuBungaBerjenjang = [...prev];
        
        while (newSukuBungaBerjenjang.length < lamaPinjaman) {
          newSukuBungaBerjenjang.push(newSukuBungaBerjenjang[newSukuBungaBerjenjang.length - 1] || 3.0);
        }
        
        if (newSukuBungaBerjenjang.length > lamaPinjaman) {
          newSukuBungaBerjenjang.length = lamaPinjaman;
        }
        
        return newSukuBungaBerjenjang;
      });
    }
  }, [lamaPinjaman, isBungaBergerak]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsBungaBergerak(checked);
    
    if (checked) {
      const defaultValues = [7.1, 6.5, 5.4, 5.4, 5.1, 4.8, 4.7, 4.7, 4.4, 4.1, 4.1, 4.0, 3.7, 3.3, 3.0];
      const newSukuBungaBerjenjang = [...defaultValues];
      while (newSukuBungaBerjenjang.length < lamaPinjaman) {
        newSukuBungaBerjenjang.push(defaultValues[defaultValues.length - 1] || 3.0);
      }
      setSukuBungaBerjenjang(newSukuBungaBerjenjang);
    }
  };

  const hitungTakeOver = React.useCallback(() => {
    try {
      const tenorBulan = lamaPinjaman * 12;
      const rFix = sukuBungaFix / 100 / 12;
      const rFloat = sukuBungaFloating / 100 / 12;
      const masaBulanFix = Math.min(masaTahunFix * 12, tenorBulan);

      // Untuk take over, gunakan sisa pinjaman sebagai plafon awal
      const plafonAwal = sisaPinjaman;
      setMaksimalLimitPinjaman(Math.max(0, Math.round(plafonAwal)));

      const newTabelAngsuran: Array<{
        bulan: number;
        bunga: string;
        angsuran: number;
        sisaPlafond: number;
      }> = [];

      if (isBungaBergerak) {
        const bungaBerjenjang = [...sukuBungaBerjenjang];
        while (bungaBerjenjang.length < lamaPinjaman) {
          bungaBerjenjang.push(bungaBerjenjang[bungaBerjenjang.length - 1] || 3.0);
        }
        
        let sisaPinjamanCalc = plafonAwal;
        
        for (let bulanKe = 1; bulanKe <= tenorBulan; bulanKe++) {
          const tahunKe = Math.floor((bulanKe - 1) / 12);
          const sukuBungaTahun = bungaBerjenjang[tahunKe];
          const sukuBungaBulanan = sukuBungaTahun / 100 / 12;
          const bungaBulanan = sisaPinjamanCalc * sukuBungaBulanan;
          const angsuranPokok = jumlahCicilan - bungaBulanan;
          sisaPinjamanCalc -= angsuranPokok;
          if (sisaPinjamanCalc < 0) sisaPinjamanCalc = 0;
          
          newTabelAngsuran.push({
            bulan: bulanKe,
            bunga: `${sukuBungaTahun}%`,
            angsuran: jumlahCicilan,
            sisaPlafond: sisaPinjamanCalc
          });
        }
        
        setAngsuranMasaFixedBunga(jumlahCicilan);
        setAngsuranMasaFloatingBunga(0);
      } else {
        let sisaPinjamanCalc = plafonAwal;

        for (let i = 1; i <= masaBulanFix; i++) {
          const bungaBulanan = sisaPinjamanCalc * rFix;
          const angsuranPokok = jumlahCicilan - bungaBulanan;
          sisaPinjamanCalc = Math.max(0, sisaPinjamanCalc - angsuranPokok);
          newTabelAngsuran.push({
            bulan: i,
            bunga: `${sukuBungaFix}%`,
            angsuran: jumlahCicilan,
            sisaPlafond: sisaPinjamanCalc
          });
        }

        let cicilanFloating = jumlahCicilan;
        if (masaBulanFix < tenorBulan) {
          const sisaTenor = tenorBulan - masaBulanFix;
          if (rFloat > 0) {
            cicilanFloating = sisaPinjamanCalc * (rFloat) / (1 - Math.pow(1 + rFloat, -sisaTenor));
          } else {
            cicilanFloating = sisaPinjamanCalc / sisaTenor;
          }

          for (let i = 1; i <= sisaTenor; i++) {
            const bungaBulanan = sisaPinjamanCalc * rFloat;
            const angsuranPokok = cicilanFloating - bungaBulanan;
            sisaPinjamanCalc = Math.max(0, sisaPinjamanCalc - angsuranPokok);
            newTabelAngsuran.push({
              bulan: masaBulanFix + i,
              bunga: `${sukuBungaFloating}%`,
              angsuran: cicilanFloating,
              sisaPlafond: sisaPinjamanCalc
            });
          }
        }

        setAngsuranMasaFixedBunga(jumlahCicilan);
        setAngsuranMasaFloatingBunga(Math.round(cicilanFloating));
      }
      
      setTabelAngsuran(newTabelAngsuran);
      setJangkaWaktuAngsuran(tenorBulan);
      setHasCalculated(newTabelAngsuran.length > 0);
    } catch (error) {
      console.error("Error dalam perhitungan Take Over:", error);
      setTabelAngsuran([]);
      setHasCalculated(false);
    }
  }, [pendapatanBulanan, usia, lamaPinjaman, jumlahCicilan, sisaPinjaman, sukuBungaFix, masaTahunFix, sukuBungaFloating, isBungaBergerak, sukuBungaBerjenjang]);

  useEffect(() => {
    hitungTakeOver();
  }, [hitungTakeOver]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tabelAngsuran.length]);

  const renderInputForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="pendapatanBulanan" className="text-sm font-normal text-gray-600">
            Pendapatan bulanan
          </Label>
          <Input
            id="pendapatanBulanan"
            type="text"
            inputMode="numeric"
            value={pendapatanBulananText}
            onChange={(e) => {
              const formatted = formatWithDots(e.target.value);
              setPendapatanBulananText(formatted);
              setPendapatanBulanan(Math.max(0, parseDigits(formatted)));
            }}
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
              onChange={(e) => setUsia(Math.max(18, Math.min(100, parseInt(e.target.value) || 25)))}
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
              onChange={(e) => setLamaPinjaman(Math.max(1, parseInt(e.target.value) || 15))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="sisaPinjaman" className="text-sm font-normal text-gray-600">
            Sisa Pinjaman yang akan di-Take Over
          </Label>
          <Input
            id="sisaPinjaman"
            type="text"
            inputMode="numeric"
            value={sisaPinjamanText}
            onChange={(e) => {
              const formatted = formatWithDots(e.target.value);
              setSisaPinjamanText(formatted);
              setSisaPinjaman(Math.max(0, parseDigits(formatted)));
            }}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="jumlahCicilan" className="text-sm font-normal text-gray-600">
            Jumlah cicilan yang dibayarkan setiap bulan
          </Label>
          <Input
            id="jumlahCicilan"
            type="text"
            inputMode="numeric"
            value={jumlahCicilanText}
            onChange={(e) => {
              const formatted = formatWithDots(e.target.value);
              setJumlahCicilanText(formatted);
              setJumlahCicilan(Math.max(0, parseDigits(formatted)));
            }}
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
          <Label htmlFor="sukuBungaFix" className="text-sm font-normal text-gray-600">
            Suku Bunga Fix (%)
          </Label>
          <Input
            id="sukuBungaFix"
            type="number"
            value={sukuBungaFix}
            onChange={(e) => setSukuBungaFix(Math.max(0, parseFloat(e.target.value) || 3))}
            className={`mt-1 ${isBungaBergerak ? "bg-muted/50" : ""}`}
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
              onChange={(e) => setMasaTahunFix(Math.max(1, parseInt(e.target.value) || 5))}
              className={`mt-1 ${isBungaBergerak ? "bg-muted/50" : ""}`}
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
              onChange={(e) => setSukuBungaFloating(Math.max(0, parseFloat(e.target.value) || 8))}
              className={`mt-1 ${isBungaBergerak ? "bg-muted/50" : ""}`}
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
                      newSukuBungaBerjenjang[index] = Math.max(0, parseFloat(e.target.value) || 0);
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
          className="w-full bg-fundax-blue hover:bg-fundax-blue/90"
          onClick={hitungTakeOver}
        >
          Lihat Hasil
        </Button>
      </div>
    </div>
  );

  const renderHasilPerhitungan = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hasil</h2>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeResultTab === "HASIL_KPR" ? "default" : "outline"} 
          className={activeResultTab === "HASIL_KPR" ? "bg-fundax-blue text-white" : ""}
          onClick={() => setActiveResultTab("HASIL_KPR")}
        >
          HASIL TAKE OVER
        </Button>
        <Button 
          variant={activeResultTab === "DETAIL_TABEL_ANGSURAN" ? "default" : "outline"} 
          className={activeResultTab === "DETAIL_TABEL_ANGSURAN" ? "bg-fundax-blue text-white" : ""}
          onClick={() => setActiveResultTab("DETAIL_TABEL_ANGSURAN")}
        >
          DETAIL TABEL ANGSURAN
        </Button>
      </div>
      
      {activeResultTab === "HASIL_KPR" && (
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-600">Sisa Pinjaman yang di-Take Over</p>
            <p className="text-2xl font-bold text-fundax-blue">{formatCurrency(sisaPinjaman)}</p>
          </div>
          
          {isBungaBergerak ? (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Bunga Tahun Pertama</p>
                <p className="text-xl font-semibold text-fundax-blue">{sukuBungaBerjenjang[0] || 0} %</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Tenor</p>
                <p className="text-xl font-semibold text-fundax-blue">{lamaPinjaman} Tahun</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Bunga Tahun Terakhir</p>
                <p className="text-xl font-semibold text-fundax-blue">
                  {sukuBungaBerjenjang[lamaPinjaman - 1] || 0} %
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Bunga Fixed</p>
                <p className="text-xl font-semibold text-fundax-blue">{sukuBungaFix} %</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Tenor</p>
                <p className="text-xl font-semibold text-fundax-blue">{lamaPinjaman} Tahun</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Masa Fixed</p>
                <p className="text-xl font-semibold text-fundax-blue">{masaTahunFix} Tahun</p>
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
                <thead className="bg-fundax-blue text-white sticky top-0">
                  <tr>
                    <th className="p-3 text-left">Bulan</th>
                    <th className="p-3 text-left">Bunga</th>
                    <th className="p-3 text-right">Angsuran</th>
                    <th className="p-3 text-right">Sisa Plafond</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelAngsuran
                    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                    .map((row, index) => (
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
                  <select 
                    className="border rounded p-1 text-sm"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, tabelAngsuran.length)} of {tabelAngsuran.length}
                  </span>
                  <button 
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={currentPage * rowsPerPage >= tabelAngsuran.length}
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(tabelAngsuran.length / rowsPerPage), prev + 1))}
                  >
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
        <Button 
          className="w-full bg-fundax-blue hover:bg-fundax-blue/90" 
          disabled={!hasCalculated}
          onClick={async () => {
            if (!hasCalculated) return;
            
            const pdfData = {
              type: 'TakeOver' as const,
              inputs: {
                pendapatanBulanan: formatCurrency(pendapatanBulanan),
                usia: `${usia} tahun`,
                lamaPinjaman: `${lamaPinjaman} tahun`,
                sisaPinjaman: formatCurrency(sisaPinjaman),
                jumlahCicilan: formatCurrency(jumlahCicilan),
                sukuBungaFix: `${sukuBungaFix}%`,
                masaTahunFix: `${masaTahunFix} tahun`,
                sukuBungaFloating: `${sukuBungaFloating}%`,
                isBungaBergerak: isBungaBergerak ? 'Ya' : 'Tidak'
              },
              results: [
                {
                  title: 'Maksimal Limit Pinjaman',
                  value: formatCurrency(maksimalLimitPinjaman)
                },
                {
                  title: isBungaBergerak ? 'Angsuran Bulanan' : 'Angsuran Masa Fixed',
                  value: formatCurrency(angsuranMasaFixedBunga) + '/Bulan'
                },
                ...(isBungaBergerak ? [] : [{
                  title: 'Angsuran Masa Floating',
                  value: formatCurrency(angsuranMasaFloatingBunga) + '/Bulan'
                }]),
                {
                  title: 'Jangka Waktu Angsuran',
                  value: `${jangkaWaktuAngsuran} Bulan`
                }
              ],
              tableData: {
                headers: ['Bulan', 'Bunga', 'Angsuran', 'Sisa Plafond'],
                rows: tabelAngsuran.slice(0, 50).map(row => [
                  row.bulan,
                  row.bunga,
                  row.angsuran,
                  row.sisaPlafond
                ])
              }
            };
            
            await generateCalculatorPDF(pdfData);
          }}
        >
          Download PDF
        </Button>
        <Button className="w-full bg-fundax-blue hover:bg-fundax-blue/90" disabled={!hasCalculated}>
          Ajukan Take Over
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        Catatan: Perhitungan ini adalah hasil perkiraan aplikasi Take Over secara umum. Data perhitungan di atas dapat berbeda dengan perhitungan bank. Untuk perhitungan yang akurat, silakan hubungi bank penyedia pinjaman Take Over.
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

export default TakeOverCalculator; 