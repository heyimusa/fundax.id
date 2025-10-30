import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Shield, 
  Users, 
  Handshake, 
  Zap, 
  CheckCircle, 
  TrendingUp,
  Building2,
  Clock,
  FileCheck,
  Globe,
  Award,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: <Building2 className="text-fundax-blue" size={48} />,
    title: "Kami Bukan Bank",
    subtitle: "We're not a bank, nor are we owned by one",
    description: "Dapatkan berbagai penawaran pinjaman langsung dari bank-bank terpercaya tanpa harus mendatangi satu per satu. Kami adalah aggregator independen yang memudahkan Anda membandingkan dan memilih produk terbaik.",
    color: "bg-blue-50"
  },
  {
    icon: <Users className="text-fundax-blue" size={48} />,
    title: "Layanan Keluarga",
    subtitle: "Family taking care of family",
    description: "Kami melayani dengan tulus, layaknya keluarga, untuk memberikan solusi finansial terbaik. Tim Loan Adviser kami berkomitmen memberikan pelayanan yang personal dan memahami kebutuhan Anda.",
    color: "bg-purple-50"
  },
  {
    icon: <TrendingUp className="text-fundax-blue" size={48} />,
    title: "Kekuatan Negosiasi",
    subtitle: "Power to negotiate",
    description: "Dengan jaringan luas dengan 30+ bank dan lembaga keuangan, kami membantu Anda memilih dan menegosiasikan pinjaman terbaik dengan bunga dan syarat yang lebih menguntungkan.",
    color: "bg-green-50"
  },
  {
    icon: <Zap className="text-fundax-blue" size={48} />,
    title: "Proses Sederhana",
    subtitle: "Keeping it simple",
    description: "Mendapatkan pinjaman kini mudah dan jelas dengan panduan Loan Advisers kami, memastikan solusi finansial sesuai kebutuhan Anda tanpa kerumitan yang tidak perlu.",
    color: "bg-yellow-50"
  },
  {
    icon: <CheckCircle className="text-fundax-blue" size={48} />,
    title: "Proses Tanpa Hambatan",
    subtitle: "Seamless process",
    description: "Kami memastikan proses pengajuan pinjaman lancar dan bebas hambatan dengan dukungan Loan Advisers profesional, dari konsultasi hingga persetujuan dengan pendampingan penuh.",
    color: "bg-pink-50"
  },
  {
    icon: <Award className="text-fundax-blue" size={48} />,
    title: "Ahli Terpercaya",
    subtitle: "Expert guidance",
    description: "Tim Loan Adviser kami terdiri dari profesional berpengalaman yang telah membantu ribuan klien mendapatkan solusi finansial terbaik. Konsultasikan kebutuhan Anda dengan ahlinya.",
    color: "bg-indigo-50"
  }
];

const features = [
  {
    icon: <Shield size={32} />,
    title: "Aman & Terpercaya",
    description: "Terdaftar resmi di OJK dan memiliki sertifikasi ISO 27001:2022 untuk keamanan data",
    stat: "Sertifikasi ISO 27001:2022"
  },
  {
    icon: <Building2 size={32} />,
    title: "Akses ke 30+ Lender",
    description: "Ribuan produk pinjaman dari bank dan lembaga keuangan terpercaya",
    stat: "30+ Partner"
  },
  {
    icon: <Users size={32} />,
    title: "24 Kantor Cabang",
    description: "Tersebar di kota-kota besar di Indonesia untuk melayani Anda lebih dekat",
    stat: "24 Cabang"
  },
  {
    icon: <Clock size={32} />,
    title: "Proses Cepat",
    description: "Dari konsultasi hingga persetujuan dalam waktu singkat dengan proses yang efisien",
    stat: "3-5 Hari Kerja"
  },
  {
    icon: <FileCheck size={32} />,
    title: "Dokumen Lengkap",
    description: "Bantuan lengkap dalam menyiapkan dokumen dan formulir yang diperlukan",
    stat: "100% Guidance"
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Support 24/7",
    description: "Customer service siap membantu Anda kapan saja melalui berbagai channel",
    stat: "24/7 Support"
  }
];

const stats = [
  { number: "10K+", label: "Klien Puas" },
  { number: "30+", label: "Partner Lender" },
  { number: "24", label: "Kantor Cabang" },
  { number: "95%", label: "Tingkat Kepuasan" }
];

const WhyFundax = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-fundax-blue to-fundax-lightBlue text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mengapa Memilih Fundax?
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              <span className="font-semibold">#GakRibetGakPakeLama</span>
            </p>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Kami adalah partner finansial terpercaya yang membantu Anda mendapatkan solusi pinjaman terbaik 
              dengan proses yang mudah, cepat, dan transparan.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-fundax-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-fundax-grayText text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Benefits Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Keunggulan Fundax
              </h2>
              <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
                Inilah yang membuat Fundax berbeda dan menjadi pilihan utama ribuan klien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`w-20 h-20 rounded-full ${benefit.color} flex items-center justify-center mb-4`}>
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl text-fundax-blue mb-2">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-sm italic text-fundax-grayText mb-3">
                      {benefit.subtitle}
                    </CardDescription>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Layanan Terbaik untuk Anda
            </h2>
            <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
              Dukungan lengkap dari awal hingga akhir proses pengajuan pinjaman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border hover:border-fundax-blue transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-fundax-lightGray flex items-center justify-center text-fundax-blue flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-fundax-grayText mb-3">
                        {feature.description}
                      </p>
                      <div className="text-xs font-semibold text-fundax-blue">
                        {feature.stat}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Terpercaya & Terlisensi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Shield className="text-fundax-blue mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-fundax-blue mb-2">
                    Terdaftar di OJK
                  </h3>
                  <p className="text-fundax-grayText">
                    Fundax terdaftar resmi di Otoritas Jasa Keuangan (OJK) dengan nomor registrasi S-194/IK.01/2025
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Award className="text-fundax-blue mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-fundax-blue mb-2">
                    ISO 27001:2022 Certified
                  </h3>
                  <p className="text-fundax-grayText">
                    Kami memiliki sertifikasi ISO 27001:2022 untuk menjamin keamanan data dan informasi klien
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Siap Memulai Perjalanan Finansial Anda?
          </h2>
          <p className="text-lg text-fundax-grayText mb-8 max-w-2xl mx-auto">
            Temukan Loan Adviser terdekat atau konsultasikan kebutuhan finansial Anda sekarang
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-fundax-blue hover:bg-fundax-blue/90">
              <Link to="/fundax-advisor">
                Temukan Advisor
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

export default WhyFundax;