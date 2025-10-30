import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Home, PiggyBank, Briefcase, Building, CreditCard, Target, GitCompare, X, ArrowRight } from 'lucide-react';
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

const products: Product[] = [
  {
    id: 'kpr-multiguna',
    title: 'KPR & Multiguna',
    description: 'Dapatkan solusi KPR dan pinjaman multiguna untuk kebutuhan properti dan keuangan Anda dengan suku bunga kompetitif',
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
      'Kebutuhan dana tunai'
    ]
  },
  {
    id: 'deposito',
    title: 'Deposito',
    description: 'Simpan dan kembangkan dana Anda dengan bunga menarik dan pilihan jangka waktu fleksibel untuk memaksimalkan keuntungan',
    icon: <PiggyBank className="text-fundax-blue" size={32} />,
    category: 'Tabungan',
    features: [
      'Bunga menarik hingga 6%',
      'Jaminan LPS',
      'Tenor fleksibel',
      'Bisa dijadikan agunan',
      'Minimal deposit rendah'
    ],
    minAmount: 'Rp 10 Juta',
    maxAmount: 'Tak terbatas',
    interestRate: '4% - 6% per tahun',
    tenure: '1 bulan - 24 bulan',
    requirements: [
      'KTP',
      'NPWP',
      'Buku tabungan'
    ],
    suitableFor: [
      'Investasi jangka pendek',
      'Dana darurat',
      'Planing keuangan'
    ]
  },
  {
    id: 'modal-usaha',
    title: 'Modal Usaha',
    description: 'Perluas bisnis Anda dengan solusi pendanaan fleksibel dan proses cepat untuk mendukung pertumbuhan usaha Anda',
    icon: <Briefcase className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Plafon tinggi hingga Rp 2 Miliar',
      'Proses cepat 3-5 hari kerja',
      'Tanpa agunan untuk plafon tertentu',
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
    id: 'take-over',
    title: 'Take Over',
    description: 'Pindahkan pinjaman Anda ke Fundax dan nikmati bunga lebih rendah serta persyaratan yang lebih menguntungkan',
    icon: <Building className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Bunga lebih rendah',
      'Tenor bisa diperpanjang',
      'Cicilan lebih ringan',
      'Proses cepat',
      'Biaya administrasi rendah'
    ],
    minAmount: 'Rp 100 Juta',
    maxAmount: 'Rp 5 Miliar',
    interestRate: '3% - 7% per tahun',
    tenure: 'Sesuai sisa tenor',
    requirements: [
      'NPWP',
      'KTP',
      'Surat keterangan dari bank lama',
      'Kartu pinjaman aktif'
    ],
    suitableFor: [
      'Pinjaman KPR',
      'Pinjaman multiguna',
      'Pinjaman usaha'
    ]
  },
  {
    id: 'kredit-tanpa-agunan',
    title: 'Kredit Tanpa Agunan',
    description: 'Dapatkan pinjaman tanpa jaminan dengan proses mudah dan cepat untuk berbagai kebutuhan mendesak Anda',
    icon: <CreditCard className="text-fundax-blue" size={32} />,
    category: 'Pinjaman',
    features: [
      'Tanpa agunan',
      'Proses cepat 1-2 hari',
      'Plafon hingga Rp 500 Juta',
      'Cicilan fleksibel',
      'Pencairan langsung'
    ],
    minAmount: 'Rp 10 Juta',
    maxAmount: 'Rp 500 Juta',
    interestRate: '12% - 20% per tahun',
    tenure: '6 bulan - 5 tahun',
    requirements: [
      'KTP',
      'NPWP',
      'Slip gaji',
      'Kartu kredit (opsional)'
    ],
    suitableFor: [
      'Kebutuhan mendesak',
      'Konsolidasi utang',
      'Modal usaha kecil'
    ]
  },
  {
    id: 'investasi',
    title: 'Investasi',
    description: 'Raih tujuan keuangan jangka panjang Anda dengan berbagai pilihan investasi yang aman dan menguntungkan',
    icon: <Target className="text-fundax-blue" size={32} />,
    category: 'Investasi',
    features: [
      'Diversifikasi portofolio',
      'Manajemen profesional',
      'Return kompetitif',
      'Risk management',
      'Laporan berkala'
    ],
    minAmount: 'Rp 10 Juta',
    maxAmount: 'Tak terbatas',
    interestRate: '7% - 15% per tahun',
    tenure: '1 - 10 tahun',
    requirements: [
      'KTP',
      'NPWP',
      'Rekening bank'
    ],
    suitableFor: [
      'Investasi jangka panjang',
      'Dana pensiun',
      'Kekayaan masa depan'
    ]
  }
];

const categories = ['Semua', 'Pinjaman', 'Tabungan', 'Investasi'];

const Produk = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const filteredProducts = selectedCategory === 'Semua'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleProductToggle = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      if (newSelected.size < 3) {
        newSelected.add(productId);
      }
    }
    setSelectedProducts(newSelected);
  };

  const comparisonProducts = products.filter(p => selectedProducts.has(p.id));

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Produk Kami
          </h1>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Kami menyediakan berbagai macam produk finansial untuk memenuhi kebutuhan Anda. 
            Silakan jelajahi pilihan produk kami untuk menemukan solusi yang tepat.
          </p>
        </div>

        {/* Comparison Bar */}
        {selectedProducts.size > 0 && (
          <div className="mb-6 bg-fundax-lightGray rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GitCompare className="text-fundax-blue" size={20} />
              <span className="font-medium text-fundax-blue">
                {selectedProducts.size} produk dipilih untuk perbandingan
              </span>
              {selectedProducts.size < 3 && (
                <span className="text-sm text-fundax-grayText">
                  (Pilih maksimal 3 produk)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowComparison(!showComparison);
                }}
                className="border-fundax-blue text-fundax-blue"
              >
                {showComparison ? 'Sembunyikan' : 'Lihat'} Perbandingan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProducts(new Set())}
                className="text-fundax-grayText"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {showComparison && comparisonProducts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="text-fundax-blue" size={20} />
                Perbandingan Produk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold text-fundax-blue">Fitur</th>
                      {comparisonProducts.map(product => (
                        <th key={product.id} className="text-left p-3 font-semibold text-fundax-blue">
                          {product.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Bunga</td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-3">{product.interestRate}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Plafon Minimum</td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-3">{product.minAmount}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Plafon Maksimum</td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-3">{product.maxAmount}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Jangka Waktu</td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-3">{product.tenure}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Kategori</td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-3">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={selectedCategory === category ? 'bg-fundax-blue text-white' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="detail">Detail View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card
                  key={product.id}
                  className="relative hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="absolute top-4 right-4">
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={() => handleProductToggle(product.id)}
                      disabled={selectedProducts.size >= 3 && !selectedProducts.has(product.id)}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 flex items-center justify-center bg-fundax-lightGray rounded-full">
                        {product.icon}
                      </div>
                      <div>
                        <CardTitle className="text-fundax-blue">{product.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">{product.category}</Badge>
                      </div>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-sm font-medium text-fundax-grayText">Bunga: </span>
                        <span className="text-sm text-fundax-blue font-semibold">{product.interestRate}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-fundax-grayText">Plafon: </span>
                        <span className="text-sm">{product.minAmount} - {product.maxAmount}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-fundax-blue hover:bg-fundax-blue/90">
                      <Link to={`/produk/${product.id}`}>
                        Pelajari Lebih Lanjut <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detail">
            <div className="space-y-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="relative">
                  <div className="absolute top-4 right-4">
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={() => handleProductToggle(product.id)}
                      disabled={selectedProducts.size >= 3 && !selectedProducts.has(product.id)}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 flex items-center justify-center bg-fundax-lightGray rounded-full flex-shrink-0">
                        {product.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl text-fundax-blue">{product.title}</CardTitle>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <CardDescription className="text-base">{product.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-fundax-blue mb-3">Keunggulan</h3>
                        <ul className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-fundax-blue mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-fundax-blue mb-3">Informasi Produk</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-fundax-grayText">Bunga:</span>
                            <span className="font-medium">{product.interestRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-fundax-grayText">Plafon:</span>
                            <span className="font-medium">{product.minAmount} - {product.maxAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-fundax-grayText">Jangka Waktu:</span>
                            <span className="font-medium">{product.tenure}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-semibold text-fundax-blue mb-2 text-sm">Cocok Untuk:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.suitableFor.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t flex gap-4">
                      <Button asChild className="bg-fundax-blue hover:bg-fundax-blue/90">
                        <Link to="/ajukan">
                          Ajukan Sekarang
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/produk/${product.id}`}>
                          Detail Lengkap
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Produk;