import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Search, 
  ArrowRight,
  Tag,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Article images
import article1 from '../assets/images/articles/tips-memilih-produk-pinjaman.svg';
import article3 from '../assets/images/articles/panduan-lengkap-kpr.svg';
import article4 from '../assets/images/articles/keuntungan-loan-adviser.svg';
import article5 from '../assets/images/articles/fundax-ekspansi-24-kota.svg';
import article6 from '../assets/images/articles/memahami-bunga-fixed-floating.svg';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Tips Memilih Produk Pinjaman yang Tepat untuk Kebutuhan Anda',
    excerpt: 'Memilih produk pinjaman yang tepat adalah langkah penting dalam perencanaan keuangan. Artikel ini akan membantu Anda memahami berbagai jenis produk pinjaman dan cara memilih yang sesuai dengan kebutuhan.',
    category: 'Tips & Trik',
    author: 'Tim Fundax',
    date: '15 Januari 2025',
    image: article1,
    readTime: '5 menit'
  },
  {
    id: '2',
    title: 'Tips Mengelola Keuangan Bisnis dengan Lebih Efektif',
    excerpt: 'Pelajari strategi dan tips praktis untuk mengelola keuangan bisnis Anda dengan lebih efektif. Dari pengelolaan cash flow hingga strategi investasi untuk bisnis.',
    category: 'Tips & Trik',
    author: 'Tim Fundax',
    date: '10 Januari 2025',
    image: article4,
    readTime: '5 menit'
  },
  {
    id: '3',
    title: 'Panduan Lengkap KPR untuk Pemula: Dari Syarat hingga Persetujuan',
    excerpt: 'Bingung dengan proses KPR? Artikel ini akan membahas secara lengkap tentang syarat, dokumen, dan langkah-langkah yang perlu Anda lakukan untuk mendapatkan KPR.',
    category: 'Panduan',
    author: 'Tim Fundax',
    date: '5 Januari 2025',
    image: article3,
    readTime: '8 menit'
  },
  {
    id: '4',
    title: '5 Keuntungan Menggunakan Loan Adviser untuk Pinjaman Anda',
    excerpt: 'Mengapa menggunakan Loan Adviser? Artikel ini menjelaskan berbagai keuntungan yang akan Anda dapatkan ketika menggunakan jasa Loan Adviser profesional.',
    category: 'Tips & Trik',
    author: 'Tim Fundax',
    date: '28 Desember 2024',
    image: article6,
    readTime: '6 menit'
  },
  {
    id: '5',
    title: 'Fundax Ekspansi ke 24 Kota Besar di Indonesia',
    excerpt: 'Fundax terus berkembang dengan membuka cabang baru di berbagai kota besar di Indonesia. Sekarang kami hadir di 24 kota untuk memberikan pelayanan yang lebih dekat dengan Anda.',
    category: 'Berita',
    author: 'Admin Fundax',
    date: '20 Desember 2024',
    image: article5,
    readTime: '4 menit'
  },
  {
    id: '6',
    title: 'Memahami Bunga Fixed vs Floating: Mana yang Lebih Menguntungkan?',
    excerpt: 'Perbedaan antara bunga fixed dan floating seringkali membingungkan. Artikel ini akan menjelaskan perbedaan keduanya dan membantu Anda memilih yang terbaik.',
    category: 'Edukasi',
    author: 'Tim Fundax',
    date: '15 Desember 2024',
    image: article3,
    readTime: '7 menit'
  }
];

const categories = ['Semua', 'Berita', 'Tips & Trik', 'Panduan', 'Edukasi'];

const Berita = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-fundax-blue to-fundax-lightBlue text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Berita & Informasi
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dapatkan informasi terbaru tentang Fundax, produk kami, dan berita terkini 
              seputar dunia finansial untuk membuat keputusan keuangan yang lebih baik.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-fundax-grayText">Tidak ada artikel ditemukan</p>
                <p className="text-sm text-gray-500 mt-2">
                  Coba ubah kategori atau kata kunci pencarian Anda
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-fundax-grayText">
                        <Clock size={12} />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-fundax-blue group-hover:text-fundax-lightBlue transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 mt-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-fundax-grayText mb-4">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full border-fundax-blue text-fundax-blue hover:bg-fundax-blue hover:text-white">
                      <Link to={`/berita/${article.id}`}>
                        Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Dapatkan Update Terbaru
            </h2>
            <p className="text-lg text-fundax-grayText mb-8 max-w-2xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan artikel terbaru dan tips keuangan langsung di inbox Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1"
              />
              <Button className="bg-fundax-blue hover:bg-fundax-blue/90">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Berita;