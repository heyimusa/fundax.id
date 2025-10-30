import React, { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../lib/utils";

const KprCalculator = () => {
  // Page-level tabs exist in `src/pages/Kalkulator.tsx`; avoid duplicating here
  const [activeResultTab, setActiveResultTab] = useState<string>("HASIL_KPR");
  const [pendapatanBulanan, setPendapatanBulanan] = useState<number>(5000000);
  const [pendapatanBulananText, setPendapatanBulananText] = useState<string>((5000000).toLocaleString("id-ID"));
  const [usia, setUsia] = useState<number>(25);
  const [lamaPinjaman, setLamaPinjaman] = useState<number>(15);
  const [jumlahCicilan, setJumlahCicilan] = useState<number>(1500000);
  const [jumlahCicilanText, setJumlahCicilanText] = useState<string>((1500000).toLocaleString("id-ID"));
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
      // Pastikan array sukuBungaBerjenjang memiliki panjang yang sesuai dengan lamaPinjaman
      setSukuBungaBerjenjang((prev) => {
        const newSukuBungaBerjenjang = [...prev];
        
        // Jika array terlalu pendek, tambahkan nilai
        while (newSukuBungaBerjenjang.length < lamaPinjaman) {
          // Gunakan nilai terakhir atau default 3.0
          newSukuBungaBerjenjang.push(newSukuBungaBerjenjang[newSukuBungaBerjenjang.length - 1] || 3.0);
        }
        
        // Jika array terlalu panjang, potong
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

  const hitungKPR = React.useCallback(() => {
    try {
      const tenorBulan = lamaPinjaman * 12;

      // Perhitungan untuk mode tidak berjenjang (fixed -> floating)
      // Gunakan pembayaran input (jumlahCicilan) sebagai cicilan masa fixed.
      // Hitung plafon awal menggunakan rumus anuitas pada suku bunga fixed dan tenor penuh.
      const rFix = sukuBungaFix / 100 / 12;
      const rFloat = sukuBungaFloating / 100 / 12;
      const masaBulanFix = Math.min(masaTahunFix * 12, tenorBulan);

      let plafonAwal = 0;
      if (!isBungaBergerak) {
        if (rFix > 0) {
          plafonAwal = jumlahCicilan * (1 - Math.pow(1 + rFix, -tenorBulan)) / rFix;
        } else {
          plafonAwal = jumlahCicilan * tenorBulan;
        }
      } else {
        // Untuk mode berjenjang, gunakan pendekatan sederhana plafon tanpa bunga
        plafonAwal = jumlahCicilan * tenorBulan;
      }

      setMaksimalLimitPinjaman(Math.max(0, Math.round(plafonAwal)));

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
        let sisaPinjaman = plafonAwal;
        
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
        // Perhitungan anuitas untuk masa fixed, lalu hitung ulang cicilan ketika masuk masa floating
        let sisaPinjaman = plafonAwal;

        // Fase fixed: gunakan cicilan input "jumlahCicilan"
        for (let i = 1; i <= masaBulanFix; i++) {
          const bungaBulanan = sisaPinjaman * rFix;
          const angsuranPokok = jumlahCicilan - bungaBulanan;
          sisaPinjaman = Math.max(0, sisaPinjaman - angsuranPokok);
          newTabelAngsuran.push({
            bulan: i,
            bunga: `${sukuBungaFix}%`,
            angsuran: jumlahCicilan,
            sisaPlafond: sisaPinjaman
          });
        }

        // Fase floating: hitung ulang cicilan agar lunas pada sisa tenor dengan rFloat
        let cicilanFloating = jumlahCicilan;
        if (masaBulanFix < tenorBulan) {
          const sisaTenor = tenorBulan - masaBulanFix;
          if (rFloat > 0) {
            cicilanFloating = sisaPinjaman * (rFloat) / (1 - Math.pow(1 + rFloat, -sisaTenor));
          } else {
            cicilanFloating = sisaPinjaman / sisaTenor;
          }

          for (let i = 1; i <= sisaTenor; i++) {
            const bungaBulanan = sisaPinjaman * rFloat;
            const angsuranPokok = cicilanFloating - bungaBulanan;
            sisaPinjaman = Math.max(0, sisaPinjaman - angsuranPokok);
            newTabelAngsuran.push({
              bulan: masaBulanFix + i,
              bunga: `${sukuBungaFloating}%`,
              angsuran: cicilanFloating,
              sisaPlafond: sisaPinjaman
            });
          }
        }

        setAngsuranMasaFixedBunga(jumlahCicilan);
        setAngsuranMasaFloatingBunga(Math.round(cicilanFloating));
      }
      
      // Selalu set tabel angsuran dengan array baru
      setTabelAngsuran(newTabelAngsuran);
      setJangkaWaktuAngsuran(tenorBulan);
      setHasCalculated(newTabelAngsuran.length > 0);
    } catch (error) {
      console.error("Error dalam perhitungan KPR:", error);
      // Set tabel angsuran kosong jika terjadi error
      setTabelAngsuran([]);
      setHasCalculated(false);
    }
  }, [pendapatanBulanan, usia, lamaPinjaman, jumlahCicilan, sukuBungaFix, masaTahunFix, sukuBungaFloating, isBungaBergerak, tipeBungaAcuan, sukuBungaBerjenjang]);

  useEffect(() => {
    hitungKPR();
  }, [hitungKPR]);

  // Reset pagination when table data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tabelAngsuran.length]);

  // Render form input
  const renderInputForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Dasar</CardTitle>
          <CardDescription>Masukkan informasi dasar untuk perhitungan KPR</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pendapatanBulanan" className="text-sm font-medium text-fundax-darkText">
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
                setPendapatanBulanan(parseDigits(formatted));
              }}
              className="mt-2 transition-all focus:ring-2 focus:ring-fundax-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="usia" className="text-sm font-medium text-fundax-darkText">
                Usia
              </Label>
              <Input
                id="usia"
                type="number"
                value={usia}
                onChange={(e) => setUsia(Math.max(18, Math.min(100, parseInt(e.target.value) || 25)))}
                className="mt-2 transition-all focus:ring-2 focus:ring-fundax-blue"
              />
            </div>
            <div>
              <Label htmlFor="lamaPinjaman" className="text-sm font-medium text-fundax-darkText">
                Lama Pinjaman (Tahun)
              </Label>
              <Input
                id="lamaPinjaman"
                type="number"
                value={lamaPinjaman}
                onChange={(e) => setLamaPinjaman(Math.max(1, parseInt(e.target.value) || 15))}
                className="mt-2 transition-all focus:ring-2 focus:ring-fundax-blue"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="jumlahCicilan" className="text-sm font-medium text-fundax-darkText">
              Jumlah cicilan saat ini yang dibayarkan setiap bulan
            </Label>
            <Input
              id="jumlahCicilan"
              type="text"
              inputMode="numeric"
              value={jumlahCicilanText}
              onChange={(e) => {
                const formatted = formatWithDots(e.target.value);
                setJumlahCicilanText(formatted);
                setJumlahCicilan(parseDigits(formatted));
              }}
              className="mt-2 transition-all focus:ring-2 focus:ring-fundax-blue"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suku Bunga</CardTitle>
          <CardDescription>Pilih jenis suku bunga dan masukkan detail</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 p-3 rounded-md border border-input hover:bg-accent/50 transition-colors">
            <Checkbox 
              id="bungaBergerak" 
              checked={isBungaBergerak}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="bungaBergerak"
              className="text-sm font-medium leading-none cursor-pointer text-fundax-darkText"
            >
              Suku Bunga Bergerak
            </label>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-fundax-darkText">
              Suku Bunga Acuan
            </Label>
            <RadioGroup value={tipeBungaAcuan} onValueChange={setTipeBungaAcuan} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="KPR_KONVENSIONAL" id="kpr_konvensional" />
                <label htmlFor="kpr_konvensional" className="text-sm font-medium text-fundax-darkText cursor-pointer">KPR KONVENSIONAL</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="KPR_SYARIAH" id="kpr_syariah" />
                <label htmlFor="kpr_syariah" className="text-sm font-medium text-fundax-darkText cursor-pointer">KPR SYARIAH</label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sukuBungaFix" className="text-sm font-medium text-fundax-darkText">
              Suku Bunga Fix (%)
            </Label>
            <Input
              id="sukuBungaFix"
              type="number"
              step="0.1"
              value={sukuBungaFix}
              onChange={(e) => setSukuBungaFix(Math.max(0, parseFloat(e.target.value) || 3))}
              className={`mt-2 transition-all focus:ring-2 focus:ring-fundax-blue ${isBungaBergerak ? "bg-muted opacity-60" : ""}`}
              disabled={isBungaBergerak}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="masaTahunFix" className="text-sm font-medium text-fundax-darkText">
                Masa Tahun Fix (Tahun)
              </Label>
              <Input
                id="masaTahunFix"
                type="number"
                value={masaTahunFix}
                onChange={(e) => setMasaTahunFix(Math.max(1, parseInt(e.target.value) || 5))}
                className={`mt-2 transition-all focus:ring-2 focus:ring-fundax-blue ${isBungaBergerak ? "bg-muted opacity-60" : ""}`}
                disabled={isBungaBergerak}
              />
            </div>
            <div>
              <Label htmlFor="sukuBungaFloating" className="text-sm font-medium text-fundax-darkText">
                Suku Bunga Floating (%)
              </Label>
              <Input
                id="sukuBungaFloating"
                type="number"
                step="0.1"
                value={sukuBungaFloating}
                onChange={(e) => setSukuBungaFloating(Math.max(0, parseFloat(e.target.value) || 8))}
                className={`mt-2 transition-all focus:ring-2 focus:ring-fundax-blue ${isBungaBergerak ? "bg-muted opacity-60" : ""}`}
                disabled={isBungaBergerak}
              />
            </div>
          </div>

          {isBungaBergerak && (
            <Card className="mt-4 border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center">
                  <Checkbox 
                    id="sukuBungaBerjenjang" 
                    checked={true}
                    disabled
                    className="mr-2"
                  />
                  <Label htmlFor="sukuBungaBerjenjang" className="text-sm font-medium text-fundax-darkText">
                    Suku Bunga Berjenjang
                  </Label>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-2">
                  {Array.from({ length: lamaPinjaman }).map((_, index) => (
                    <div key={index} className="space-y-1">
                      <Label className="text-xs text-fundax-grayText">Bunga Tahun ke-{index + 1}</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={sukuBungaBerjenjang[index] || 0}
                        onChange={(e) => {
                          const newSukuBungaBerjenjang = [...sukuBungaBerjenjang];
                          newSukuBungaBerjenjang[index] = Math.max(0, parseFloat(e.target.value) || 0);
                          setSukuBungaBerjenjang(newSukuBungaBerjenjang);
                        }}
                        className="text-sm transition-all focus:ring-2 focus:ring-fundax-blue"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Button 
        className="w-full bg-fundax-blue hover:bg-fundax-blue/90 text-white transition-all shadow-md hover:shadow-lg"
        onClick={hitungKPR}
        size="lg"
      >
        Lihat Hasil
      </Button>
    </div>
  );

  // Render hasil perhitungan
  const renderHasilPerhitungan = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Hasil Perhitungan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Button 
              variant={activeResultTab === "HASIL_KPR" ? "default" : "outline"} 
              className={activeResultTab === "HASIL_KPR" ? "bg-fundax-blue text-white hover:bg-fundax-blue/90" : ""}
              onClick={() => setActiveResultTab("HASIL_KPR")}
            >
              HASIL KPR
            </Button>
            <Button 
              variant={activeResultTab === "DETAIL_TABEL_ANGSURAN" ? "default" : "outline"} 
              className={activeResultTab === "DETAIL_TABEL_ANGSURAN" ? "bg-fundax-blue text-white hover:bg-fundax-blue/90" : ""}
              onClick={() => setActiveResultTab("DETAIL_TABEL_ANGSURAN")}
            >
              DETAIL TABEL ANGSURAN
            </Button>
          </div>
          
          {activeResultTab === "HASIL_KPR" && (
            <>
              <Card className="bg-gradient-to-br from-fundax-blue/10 to-fundax-lightBlue/5 border-fundax-blue/20">
                <CardContent className="pt-6">
                  <div className="mb-2">
                    <p className="text-sm text-fundax-grayText mb-1">Maksimal Limit Pinjaman</p>
                    <p className="text-3xl font-bold text-fundax-blue">{formatCurrency(maksimalLimitPinjaman)}</p>
                  </div>
                </CardContent>
              </Card>
              
              {isBungaBergerak ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-xs text-fundax-grayText mb-1">Bunga Tahun Pertama</p>
                      <p className="text-xl font-semibold text-fundax-blue">{sukuBungaBerjenjang[0] || 0} %</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-xs text-fundax-grayText mb-1">Tenor</p>
                      <p className="text-xl font-semibold text-fundax-blue">{lamaPinjaman} Tahun</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-xs text-fundax-grayText mb-1">Bunga Tahun Terakhir</p>
                      <p className="text-xl font-semibold text-fundax-blue">
                        {sukuBungaBerjenjang[lamaPinjaman - 1] || 0} %
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-xs text-fundax-grayText mb-1">Bunga Fixed</p>
                      <p className="text-xl font-semibold text-fundax-blue">{sukuBungaFix} %</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-xs text-fundax-grayText mb-1">Tenor</p>
                      <p className="text-xl font-semibold text-fundax-blue">{lamaPinjaman} Tahun</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-xs text-fundax-grayText mb-1">Masa Fixed</p>
                      <p className="text-xl font-semibold text-fundax-blue">{masaTahunFix} Tahun</p>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Detail Angsuran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isBungaBergerak ? (
                    <div className="flex justify-between items-center border-b pb-3">
                      <p className="text-sm text-fundax-darkText">Angsuran bulanan (dapat berubah setiap tahun)</p>
                      <p className="text-sm font-semibold text-fundax-blue">{formatCurrency(jumlahCicilan)}/Bulan</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center border-b pb-3">
                        <p className="text-sm text-fundax-darkText">Angsuran selama masa fixed bunga {sukuBungaFix}% selama Bulan 1 - {masaTahunFix * 12}</p>
                        <p className="text-sm font-semibold text-fundax-blue">{formatCurrency(angsuranMasaFixedBunga)}/Bulan</p>
                      </div>
                      
                      {masaTahunFix < lamaPinjaman && (
                        <div className="flex justify-between items-center border-b pb-3">
                          <p className="text-sm text-fundax-darkText">Angsuran selama masa floating bunga {sukuBungaFloating}% selama Bulan {masaTahunFix * 12 + 1} - {lamaPinjaman * 12}</p>
                          <p className="text-sm font-semibold text-fundax-blue">{formatCurrency(angsuranMasaFloatingBunga)}/Bulan</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-sm font-medium text-fundax-darkText">Jangka Waktu Angsuran</p>
                    <p className="text-sm font-semibold text-fundax-blue">{jangkaWaktuAngsuran} Bulan</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {activeResultTab === "DETAIL_TABEL_ANGSURAN" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tabel Angsuran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto max-h-[500px] rounded-md border">
                  {tabelAngsuran && tabelAngsuran.length > 0 ? (
                    <>
                      <table className="w-full border-collapse">
                        <thead className="bg-fundax-blue text-white sticky top-0 z-10">
                          <tr>
                            <th className="p-3 text-left text-sm font-semibold">Bulan</th>
                            <th className="p-3 text-left text-sm font-semibold">Bunga</th>
                            <th className="p-3 text-right text-sm font-semibold">Angsuran</th>
                            <th className="p-3 text-right text-sm font-semibold">Sisa Plafond</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tabelAngsuran
                            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                            .map((row, index) => (
                            <tr 
                              key={index} 
                              className={`transition-colors ${index % 2 === 0 ? "bg-white hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/70"}`}
                            >
                              <td className="p-3 border-b text-sm">{row.bulan}</td>
                              <td className="p-3 border-b text-sm">{row.bunga}</td>
                              <td className="p-3 border-b text-right text-sm font-medium">{formatCurrency(row.angsuran)}</td>
                              <td className="p-3 border-b text-right text-sm font-medium">{formatCurrency(row.sisaPlafond)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-2 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-fundax-grayText">Rows per page:</span>
                          <select 
                            className="border rounded-md p-1.5 text-sm bg-background transition-colors focus:ring-2 focus:ring-fundax-blue focus:outline-none"
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
                          <span className="text-sm text-fundax-grayText">
                            {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, tabelAngsuran.length)} of {tabelAngsuran.length}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            disabled={currentPage * rowsPerPage >= tabelAngsuran.length}
                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(tabelAngsuran.length / rowsPerPage), prev + 1))}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-fundax-grayText">Tidak ada data angsuran untuk ditampilkan.</p>
                      <p className="text-fundax-grayText text-sm mt-2">Silakan isi semua data dan klik "Lihat Hasil" untuk melihat tabel angsuran.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              className="flex-1 bg-fundax-blue hover:bg-fundax-blue/90 text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50" 
              disabled={!hasCalculated}
            >
              Download PDF
            </Button>
            <Button 
              className="flex-1 bg-fundax-blue hover:bg-fundax-blue/90 text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50" 
              disabled={!hasCalculated}
            >
              Ajukan KPR
            </Button>
          </div>
          
          <p className="text-xs text-fundax-grayText mt-2 leading-relaxed">
            Catatan: Perhitungan ini adalah hasil perkiraan aplikasi KPR secara umum. Data perhitungan di atas dapat berbeda dengan perhitungan bank. Untuk perhitungan yang akurat, silakan hubungi bank penyedia pinjaman KPR.
          </p>
        </CardContent>
      </Card>
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