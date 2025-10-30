import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Users, Award, TrendingUp, Globe, Building2, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// Team images
import managementTeam from '../assets/images/team/management-team.svg';
import loanAdvisersTeam from '../assets/images/team/loan-advisers-team.svg';
import customerServiceTeam from '../assets/images/team/customer-service-team.svg';
import fundaxTeamAbout from '../assets/images/general/fundax-team-about.svg';

const timeline = [
  {
    year: '2020',
    title: 'Awal Perjalanan',
    description: 'Fundax didirikan dengan visi menjadi platform finansial terpercaya di Indonesia, menghubungkan masyarakat dengan berbagai solusi pinjaman terbaik.',
    icon: <Building2 className="text-fundax-blue" size={32} />
  },
  {
    year: '2021',
    title: 'Ekspansi ke Kota Besar',
    description: 'Membuka cabang pertama di Jakarta dan mulai membangun jaringan dengan berbagai bank dan lembaga keuangan terpercaya di Indonesia.',
    icon: <MapPin className="text-fundax-blue" size={32} />
  },
  {
    year: '2022',
    title: 'Sertifikasi ISO 27001',
    description: 'Mendapatkan sertifikasi ISO 27001:2022 sebagai bukti komitmen kami terhadap keamanan data dan informasi klien.',
    icon: <Award className="text-fundax-blue" size={32} />
  },
  {
    year: '2023',
    title: 'Ekspansi Nasional',
    description: 'Mengembangkan jaringan ke 24 kantor cabang di berbagai kota besar di Indonesia, menjangkau lebih banyak masyarakat.',
    icon: <Globe className="text-fundax-blue" size={32} />
  },
  {
    year: '2024',
    title: '10.000+ Klien',
    description: 'Mencapai milestone dengan melayani lebih dari 10.000 klien dan membangun kemitraan dengan 30+ bank dan lembaga keuangan.',
    icon: <Users className="text-fundax-blue" size={32} />
  },
  {
    year: '2025',
    title: 'Terdaftar di OJK',
    description: 'Mendapatkan registrasi resmi dari Otoritas Jasa Keuangan (OJK) dengan nomor S-194/IK.01/2025, memperkuat posisi sebagai platform finansial terpercaya.',
    icon: <TrendingUp className="text-fundax-blue" size={32} />
  }
];

const values = [
  {
    title: 'Integritas',
    description: 'Kami menjunjung tinggi kejujuran, transparansi, dan etika dalam setiap interaksi dengan klien dan partner.',
    icon: <Award size={40} />
  },
  {
    title: 'Inovasi',
    description: 'Terus berinovasi untuk memberikan solusi terbaik dan proses yang lebih mudah bagi klien.',
    icon: <Target size={40} />
  },
  {
    title: 'Pelayanan',
    description: 'Komitmen memberikan pelayanan terbaik dengan pendampingan profesional dari awal hingga akhir.',
    icon: <Users size={40} />
  },
  {
    title: 'Kepercayaan',
    description: 'Membangun kepercayaan melalui transparansi, keamanan data, dan hasil yang terukur.',
    icon: <Building2 size={40} />
  }
];

const team = [
  {
    name: 'Management Team',
    description: 'Tim manajemen berpengalaman dengan track record di industri finansial',
    image: managementTeam
  },
  {
    name: 'Loan Advisers',
    description: 'Lebih dari 100 Loan Adviser profesional siap membantu Anda',
    image: loanAdvisersTeam
  },
  {
    name: 'Customer Service',
    description: 'Tim customer service yang responsif dan siap membantu 24/7',
    image: customerServiceTeam
  }
];

const TentangKami = () => {
  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-fundax-blue to-fundax-lightBlue text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang Fundax
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Platform finansial terpercaya yang menghubungkan Anda dengan berbagai solusi pinjaman terbaik di Indonesia
            </p>
          </div>
        </div>

        {/* Company Overview */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-fundax-blue mb-6">
                Kisah Kami
              </h2>
              <div className="space-y-4 text-fundax-grayText leading-relaxed">
                <p>
                  Fundax adalah perusahaan aggregator pinjaman dari Australia yang merupakan bagian dari ekosistem finansial terpercaya. 
                  Kami hadir di Indonesia dengan misi membantu masyarakat mendapatkan akses ke berbagai produk pinjaman terbaik dengan 
                  proses yang mudah, cepat, dan transparan.
                </p>
                <p>
                  Sebagai platform yang independen dan tidak dimiliki oleh bank tertentu, kami memberikan kebebasan kepada klien untuk 
                  membandingkan berbagai produk dari 30+ bank dan lembaga keuangan terpercaya. Tim Loan Adviser profesional kami siap 
                  memberikan konsultasi dan panduan untuk menemukan solusi finansial yang tepat sesuai kebutuhan Anda.
                </p>
                <p>
                  Dengan jaringan 24 kantor cabang yang tersebar di kota-kota besar di Indonesia, kami memastikan pelayanan yang mudah 
                  diakses dan personal. Komitmen kami terhadap keamanan data dibuktikan dengan sertifikasi ISO 27001:2022 dan registrasi 
                  resmi di Otoritas Jasa Keuangan (OJK).
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={fundaxTeamAbout} 
                alt="Fundax Team" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-fundax-blue text-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-sm">Klien Puas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Perjalanan Kami
              </h2>
              <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
                Milestone penting dalam perjalanan Fundax membantu masyarakat Indonesia
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-fundax-blue transform md:-translate-x-1/2"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {timeline.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex items-center gap-8 ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-fundax-blue flex-shrink-0">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <Card className={`flex-1 ${idx % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                          <Calendar className="text-fundax-blue" size={20} />
                          <CardTitle className="text-fundax-blue">{item.year}</CardTitle>
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi dasar setiap keputusan dan tindakan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-fundax-lightGray rounded-full flex items-center justify-center text-fundax-blue mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-fundax-blue mb-3 text-lg">
                    {value.title}
                  </h3>
                  <p className="text-sm text-fundax-grayText">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Tim Kami
              </h2>
              <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
                Para profesional berpengalaman yang siap membantu Anda mencapai tujuan finansial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((teamMember, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={teamMember.image} 
                      alt={teamMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                      {teamMember.name}
                    </h3>
                    <p className="text-sm text-fundax-grayText">
                      {teamMember.description}
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
            Bergabung dengan Perjalanan Kami
          </h2>
          <p className="text-lg text-fundax-grayText mb-8 max-w-2xl mx-auto">
            Apakah Anda ingin menjadi bagian dari tim Fundax atau membutuhkan bantuan finansial? 
            Kami siap membantu Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-fundax-blue hover:bg-fundax-blue/90">
              <Link to="/karir">
                Lihat Lowongan Kerja
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-fundax-blue text-fundax-blue">
              <Link to="/fundax-advisor">
                Hubungi Advisor
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TentangKami;