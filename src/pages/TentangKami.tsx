import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Users, Award, Building2, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// Team images
import managementTeam from '../assets/images/team/management-team.svg';
import loanAdvisersTeam from '../assets/images/team/loan-advisers-team.svg';
import customerServiceTeam from '../assets/images/team/customer-service-team.svg';
import fundaxTeamAbout from '../assets/images/general/fundax-team-about.svg';

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
                Tentang Kami
              </h2>
              <div className="space-y-4 text-fundax-grayText leading-relaxed">
                <p>
                  Berawal dari sebuah perbincangan santai antara dua sahabat yang memiliki visi yang sama — membantu memperkuat perputaran roda perekonomian nasional melalui pembiayaan yang sehat, terukur, dan berkelanjutan — lahirlah sebuah komitmen untuk membangun solusi finansial yang lebih bermakna dan berorientasi pada hasil nyata.
                </p>
                <p>
                  Dengan pengalaman lebih dari 15 tahun di dunia perbankan dan lembaga keuangan, kami telah melalui berbagai dinamika dan perubahan lanskap industri — mulai dari era konvensional hingga transformasi digital yang kini menjadi tulang punggung sistem keuangan modern.
                </p>
                <p>
                  Kami memiliki keahlian mendalam dalam pengelolaan kredit, Special Asset Management, dan penanganan Non-Performing Loan (NPL). Melalui pengalaman di berbagai kondisi bisnis, kami memahami bahwa setiap tantangan memiliki karakteristik unik, dan setiap solusi membutuhkan pendekatan yang cermat, strategis, serta berbasis data dan integritas.
                </p>
                <p>
                  Fokus utama kami adalah mendukung pertumbuhan dan keberlanjutan bisnis, baik di sektor UMKM (Usaha Mikro, Kecil, dan Menengah), SME (Small and Medium Enterprises), Consumer Banking, hingga Corporate Banking. Kami percaya bahwa kolaborasi dan strategi pembiayaan yang tepat dapat menjadi katalis bagi kemajuan ekonomi yang inklusif dan produktif.
                </p>
                <p>
                  Dengan mengedepankan profesionalisme, integritas, dan orientasi pada pemecahan masalah, kami berkomitmen menjadi mitra terpercaya bagi para pelaku usaha, investor, dan institusi keuangan dalam mengoptimalkan potensi bisnis sekaligus menjaga kualitas aset.
                </p>
                <p>
                  Kami tidak hanya melihat angka dan laporan keuangan — kami melihat potensi, semangat, dan nilai yang bisa dikembangkan bersama. Itulah yang membedakan kami dalam setiap langkah dan keputusan yang kami ambil.
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
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm">Tahun Pengalaman</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-6xl">
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