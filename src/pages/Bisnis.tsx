import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Briefcase, 
  TrendingUp, 
  Building2, 
  CheckCircle, 
  Users,
  DollarSign,
  ArrowRight,
  Zap,
  Shield,
  KeyRound
} from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    icon: <Briefcase className="text-fundax-blue" size={40} />,
    title: 'Modal Kerja',
    description: 'Dapatkan pendanaan untuk modal kerja, ekspansi bisnis, atau investasi peralatan dengan proses cepat dan fleksibel.',
    features: [
      'Plafon hingga Rp 2 Miliar',
      'Proses cepat 3-5 hari kerja',
      'Tenor fleksibel',
      'Cicilan fleksibel'
    ],
    link: '/produk'
  },
  {
    icon: <Building2 className="text-fundax-blue" size={40} />,
    title: 'Kredit Kepemilikan Rumah',
    description: 'Solusi pembiayaan properti untuk kantor, gudang, atau investasi properti bisnis dengan suku bunga kompetitif.',
    features: [
      'Plafon hingga 70% nilai properti',
      'Tenor hingga 20 tahun',
      'Suku bunga kompetitif',
      'Proses cepat dan mudah'
    ],
    link: '/produk'
  },
  {
    icon: <TrendingUp className="text-fundax-blue" size={40} />,
    title: 'Pinjaman Bridging',
    description: 'Pembiayaan jangka pendek untuk kebutuhan bridge financing dengan proses yang cepat dan fleksibel.',
    features: [
      'Proses cepat',
      'Jangka pendek',
      'Fleksibel',
      'Solusi bridge financing'
    ],
    link: '/produk'
  },
  {
    icon: <KeyRound className="text-fundax-blue" size={40} />,
    title: 'Kredit Multiguna',
    description: 'Pinjaman multiguna untuk berbagai kebutuhan keuangan bisnis Anda dengan jaminan properti.',
    features: [
      'Plafon hingga 70% nilai properti',
      'Tenor fleksibel hingga 20 tahun',
      'Bunga kompetitif',
      'Berbagai tujuan penggunaan'
    ],
    link: '/produk'
  }
];

const benefits = [
  {
    icon: <Zap className="text-fundax-blue" size={32} />,
    title: 'Proses Cepat',
    description: 'Dari pengajuan hingga pencairan dana dalam waktu singkat',
    stat: '3-5 Hari Kerja'
  },
  {
    icon: <Shield className="text-fundax-blue" size={32} />,
    title: 'Terpercaya',
    description: 'Tim profesional berpengalaman lebih dari 15 tahun di dunia perbankan dan keuangan',
    stat: '15+ Tahun Pengalaman'
  },
  {
    icon: <Users className="text-fundax-blue" size={32} />,
    title: 'Konsultasi Gratis',
    description: 'Tim Loan Adviser profesional siap membantu gratis',
    stat: 'Free Consultation'
  },
  {
    icon: <DollarSign className="text-fundax-blue" size={32} />,
    title: 'Bunga Kompetitif',
    description: 'Akses ke berbagai produk dengan bunga terbaik',
    stat: 'Best Rates'
  }
];

const testimonials = [
  {
    name: 'PT. ABC Makmur',
    industry: 'Manufaktur',
    quote: 'Dengan menggunakan jasa Fundax, kami berhasil mendapatkan modal usaha yang diperlukan untuk ekspansi. Prosesnya cepat dan tim advisor sangat membantu.',
    result: 'Mendapatkan Rp 500 Juta dalam 4 hari kerja'
  },
  {
    name: 'CV. XYZ Sejahtera',
    industry: 'Retail',
    quote: 'Solusi KPR untuk toko kami sangat membantu. Bunga yang ditawarkan lebih rendah dari bank biasa dan prosesnya tidak ribet.',
    result: 'Bunga 3.5% lebih rendah dari sebelumnya'
  }
];

const Bisnis = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-fundax-blue to-fundax-lightBlue text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solusi Finansial untuk Bisnis Anda
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Dukung pertumbuhan bisnis Anda dengan berbagai produk finansial terbaik. 
              Dari modal kerja hingga pinjaman bridging, kami siap membantu bisnis Anda berkembang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-fundax-blue hover:bg-gray-100">
                <Link to="/ajukan">
                  Ajukan Sekarang
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-2 border-white !text-white bg-transparent hover:!bg-white hover:!text-fundax-blue transition-all"
              >
                <Link to="/fundax-advisor" className="text-white hover:text-fundax-blue">
                  Konsultasi Gratis
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Solusi Finansial untuk Bisnis
            </h2>
            <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
              Pilih produk yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center text-fundax-blue mb-4">
                    {solution.icon}
                  </div>
                  <CardTitle className="text-2xl text-fundax-blue mb-2">
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-fundax-blue hover:bg-fundax-blue/90">
                    <Link to={solution.link}>
                      Pelajari Lebih Lanjut <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Mengapa Memilih Fundax untuk Bisnis?
              </h2>
              <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
                Keunggulan yang membuat kami menjadi partner finansial terpercaya untuk bisnis Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="text-center border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-fundax-blue rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-fundax-grayText mb-3">
                      {benefit.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {benefit.stat}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Testimoni Klien Bisnis
            </h2>
            <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
              Apa kata klien bisnis kami tentang layanan Fundax
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-l-4 border-l-fundax-blue">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">{testimonial.industry}</Badge>
                    <h3 className="font-semibold text-fundax-blue text-lg mb-2">
                      {testimonial.name}
                    </h3>
                  </div>
                  <p className="text-fundax-grayText mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="font-medium text-fundax-blue">
                        {testimonial.result}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Proses Mudah untuk Bisnis
              </h2>
              <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
                Langkah-langkah sederhana untuk mendapatkan solusi finansial terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Konsultasi', desc: 'Konsultasikan kebutuhan bisnis Anda dengan Loan Adviser' },
                { step: '2', title: 'Ajukan', desc: 'Ajukan produk yang sesuai dengan dokumen lengkap' },
                { step: '3', title: 'Review', desc: 'Tim kami akan review dan proses pengajuan Anda' },
                { step: '4', title: 'Cair', desc: 'Dana akan dicairkan setelah persetujuan' }
              ].map((item, idx) => (
                <Card key={idx} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-fundax-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-fundax-blue mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-fundax-grayText">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Siap Mengembangkan Bisnis Anda?
          </h2>
          <p className="text-lg text-fundax-grayText mb-8 max-w-2xl mx-auto">
            Hubungi Loan Adviser kami untuk konsultasi gratis dan temukan solusi finansial terbaik untuk bisnis Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-fundax-blue hover:bg-fundax-blue/90">
              <Link to="/fundax-advisor">
                Temukan Advisor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-fundax-blue text-fundax-blue">
              <Link to="/ajukan">
                Ajukan Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bisnis;