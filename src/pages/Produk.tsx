import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Home, Briefcase, Building2, KeyRound, Handshake, MessageSquare, Scale, Gavel, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
  minAmount: string;
  maxAmount: string;
  interestRate: string;
  tenure: string;
  requirements: string[];
  suitableFor: string[];
}

interface ConsultationService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const products: Product[] = [
  {
    id: 'kpr',
    title: 'Kredit Kepemilikan Rumah',
    description: 'Dapatkan solusi KPR untuk kebutuhan properti Anda dengan suku bunga kompetitif dan proses yang mudah',
    icon: <Home className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Suku bunga kompetitif',
      'Plafon hingga 70% nilai properti',
      'Tenor fleksibel hingga 20 tahun',
      'Proses cepat dan mudah',
      'Tanpa biaya tersembunyi'
    ],
    minAmount: 'Rp 50 Juta',
    maxAmount: 'Rp 5 Miliar',
    interestRate: '3.5% - 8% per tahun',
    tenure: '5 - 20 tahun',
    requirements: [
      'NPWP',
      'KTP',
      'Slip gaji',
      'Bukti kepemilikan properti'
    ],
    suitableFor: [
      'Pembelian rumah pertama',
      'Refinancing properti',
      'Kebutuhan properti'
    ]
  },
  {
    id: 'modal-kerja',
    title: 'Modal Kerja',
    description: 'Solusi pendanaan fleksibel untuk mendukung pertumbuhan bisnis Anda dengan proses cepat',
    icon: <Briefcase className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Plafon tinggi hingga Rp 2 Miliar',
      'Proses cepat 3-5 hari kerja',
      'Tenor fleksibel',
      'Cicilan fleksibel',
      'Support konsultasi bisnis'
    ],
    minAmount: 'Rp 50 Juta',
    maxAmount: 'Rp 2 Miliar',
    interestRate: '8% - 15% per tahun',
    tenure: '1 - 5 tahun',
    requirements: [
      'NPWP',
      'SIUP',
      'Laporan keuangan',
      'Proposal bisnis'
    ],
    suitableFor: [
      'Modal kerja',
      'Ekspansi bisnis',
      'Peralatan bisnis'
    ]
  },
  {
    id: 'bridging',
    title: 'Pinjaman Bridging',
    description: 'Pembiayaan jangka pendek untuk kebutuhan bridge financing dengan proses yang cepat dan fleksibel',
    icon: <Building2 className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Proses cepat',
      'Jangka pendek',
      'Fleksibel',
      'Cocok untuk transisi',
      'Solusi bridge financing'
    ],
    minAmount: 'Rp 100 Juta',
    maxAmount: 'Rp 5 Miliar',
    interestRate: '10% - 18% per tahun',
    tenure: '6 bulan - 2 tahun',
    requirements: [
      'NPWP',
      'KTP',
      'Dokumen properti',
      'Rencana refinancing'
    ],
    suitableFor: [
      'Bridge financing',
      'Transisi pembiayaan',
      'Kebutuhan jangka pendek'
    ]
  },
  {
    id: 'multiguna',
    title: 'Kredit Multiguna',
    description: 'Pinjaman multiguna untuk berbagai kebutuhan keuangan Anda dengan jaminan properti',
    icon: <KeyRound className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Plafon hingga 70% nilai properti',
      'Tenor fleksibel',
      'Bunga kompetitif',
      'Berbagai tujuan penggunaan',
      'Proses cepat'
    ],
    minAmount: 'Rp 50 Juta',
    maxAmount: 'Rp 5 Miliar',
    interestRate: '3.5% - 8% per tahun',
    tenure: '5 - 20 tahun',
    requirements: [
      'NPWP',
      'KTP',
      'Bukti kepemilikan properti',
      'Slip gaji/keterangan penghasilan'
    ],
    suitableFor: [
      'Kebutuhan dana tunai',
      'Renovasi properti',
      'Berbagai kebutuhan finansial'
    ]
  }
];

const consultationServices: ConsultationService[] = [
  {
    id: 'gagal-bayar',
    title: 'Konsultasi Gagal Bayar Kredit & Pendampingan',
    description: 'Dapatkan solusi dan pendampingan profesional ketika mengalami kesulitan membayar kredit',
    icon: <MessageSquare className="text-fundax-blue" size={40} />,
    details: [
      'Analisis situasi finansial',
      'Rekomendasi solusi restrukturisasi',
      'Pendampingan negosiasi dengan bank',
      'Strategi penyelesaian yang tepat',
      'Dukungan hingga selesai'
    ]
  },
  {
    id: 'take-over',
    title: 'Konsultasi Take Over Kredit',
    description: 'Bantuan konsultasi untuk proses take over kredit ke bank lain dengan kondisi yang lebih menguntungkan',
    icon: <Scale className="text-fundax-blue" size={40} />,
    details: [
      'Analisis kredit saat ini',
      'Pencarian opsi bank terbaik',
      'Perbandingan produk dan bunga',
      'Pendampingan proses take over',
      'Negosiasi syarat yang lebih baik'
    ]
  },
  {
    id: 'lelang',
    title: 'Konsultasi Lelang, Eksekusi & Hak Tanggungan',
    description: 'Pendampingan profesional untuk proses lelang, eksekusi, dan pengurusan hak tanggungan',
    icon: <Gavel className="text-fundax-blue" size={40} />,
    details: [
      'Pemahaman proses lelang',
      'Strategi menghadapi eksekusi',
      'Pengurusan hak tanggungan',
      'Pendampingan legal',
      'Solusi terbaik untuk situasi Anda'
    ]
  },
  {
    id: 'pemasaran-asset',
    title: 'Konsultasi Pemasaran Asset',
    description: 'Konsultasi dan pendampingan untuk pemasaran aset properti seperti Residential, Shop House, dan lainnya',
    icon: <Handshake className="text-fundax-blue" size={40} />,
    details: [
      'Jasa pemasaran properti',
      'Residential & Shop House',
      'Valuasi properti',
      'Konsultasi strategi',
      'Pendampingan transaksi'
    ]
  }
];

const Produk = () => {
  // Products are always loan products
  const loanProducts = products.filter(p => p.category === 'Pinjaman');

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Produk & Layanan Kami
          </h1>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Kami menyediakan berbagai produk pinjaman dan layanan konsultasi untuk memenuhi kebutuhan finansial Anda.
          </p>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-fundax-blue mb-6">Produk Pinjaman</h2>
          <p className="text-fundax-grayText mb-6 max-w-3xl">
            Pilih produk pinjaman yang sesuai dengan kebutuhan finansial Anda
          </p>

          {/* Product Grid - 2x2 layout for 4 products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-fundax-lightGray rounded-full flex-shrink-0">
                      {product.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-fundax-blue mb-2">{product.title}</CardTitle>
                      <CardDescription className="text-sm">{product.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-fundax-grayText">Bunga</span>
                      <span className="text-sm text-fundax-blue font-semibold">{product.interestRate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-fundax-grayText">Plafon</span>
                      <span className="text-sm">{product.minAmount} - {product.maxAmount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-fundax-grayText">Tenor</span>
                      <span className="text-sm">{product.tenure}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-fundax-blue hover:bg-fundax-blue/90">
                    <Link to="/ajukan">
                      Ajukan Sekarang <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Consultation Services Section */}
        <div className="bg-fundax-lightGray py-12 rounded-lg">
          <div className="px-4">
            <h2 className="text-2xl font-bold text-fundax-blue mb-2 text-center">
              Layanan Konsultasi Inovatif
            </h2>
            <p className="text-fundax-grayText text-center mb-8 max-w-2xl mx-auto">
              Layanan konsultasi profesional untuk membantu Anda mengatasi berbagai tantangan finansial
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultationServices.map((service) => (
                <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-fundax-blue rounded-lg flex items-center justify-center text-white mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg text-fundax-blue mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-fundax-blue mt-0.5 font-semibold">✓</span>
                          <span className="text-fundax-grayText">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-4 bg-fundax-blue hover:bg-fundax-blue/90">
                      <Link to="/fundax-advisor">
                        Konsultasi Sekarang
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-fundax-blue mb-4">
            Butuh Bantuan Memilih Produk?
          </h2>
          <p className="text-fundax-grayText mb-6 max-w-2xl mx-auto">
            Hubungi advisor kami untuk konsultasi gratis dan temukan solusi terbaik untuk kebutuhan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-fundax-blue hover:bg-fundax-blue/90">
              <Link to="/fundax-advisor">
                Hubungi Advisor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-fundax-blue text-fundax-blue">
              <Link to="/ajukan">
                Ajukan Pinjaman
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Produk;