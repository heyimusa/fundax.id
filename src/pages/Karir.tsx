import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Target,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Loan Adviser',
    department: 'Sales & Advisory',
    location: 'Jakarta, Bandung, Surabaya',
    type: 'Full-time',
    salary: 'Rp 5.000.000 - Rp 15.000.000 + Komisi',
    description: 'Kami mencari Loan Adviser profesional yang memiliki passion untuk membantu masyarakat mendapatkan solusi finansial terbaik. Sebagai Loan Adviser, Anda akan membantu klien menemukan produk pinjaman yang sesuai dengan kebutuhan mereka.',
    requirements: [
      'Minimal S1 dari jurusan apapun',
      'Memiliki pengalaman di bidang sales/financial advisory (preferable)',
      'Memiliki kemampuan komunikasi yang baik',
      'Memiliki kemampuan negosiasi',
      'Memiliki SIM C aktif',
      'Bersedia ditempatkan di berbagai kota'
    ],
    benefits: [
      'Gaji pokok + komisi menarik',
      'Pelatihan berkala',
      'Kesempatan karier yang jelas',
      'Asuransi kesehatan',
      'Bonus dan insentif'
    ]
  },
  {
    id: '2',
    title: 'Customer Service Representative',
    department: 'Customer Service',
    location: 'Jakarta',
    type: 'Full-time',
    salary: 'Rp 4.500.000 - Rp 6.500.000',
    description: 'Mencari Customer Service Representative yang ramah dan responsif untuk membantu klien melalui berbagai channel komunikasi. Anda akan menjadi frontline dalam memberikan layanan terbaik kepada klien.',
    requirements: [
      'Minimal D3 atau S1',
      'Memiliki pengalaman di bidang customer service (preferable)',
      'Memiliki kemampuan komunikasi yang baik',
      'Menguasai bahasa Inggris (communicative)',
      'Ramah dan sabar dalam melayani klien',
      'Bersedia bekerja shift'
    ],
    benefits: [
      'Gaji pokok + tunjangan',
      'Asuransi kesehatan',
      'Bonus kinerja',
      'Pelatihan berkala',
      'Kesempatan berkembang'
    ]
  },
  {
    id: '3',
    title: 'Business Development Manager',
    department: 'Business Development',
    location: 'Jakarta',
    type: 'Full-time',
    salary: 'Rp 10.000.000 - Rp 20.000.000',
    description: 'Mencari Business Development Manager yang berpengalaman untuk mengembangkan kemitraan dengan bank dan lembaga keuangan. Anda akan bertanggung jawab untuk membangun dan memelihara hubungan dengan partner.',
    requirements: [
      'Minimal S1 dari jurusan Business, Marketing, atau terkait',
      'Memiliki pengalaman minimal 3 tahun di bidang business development',
      'Memiliki network di industri perbankan/finansial',
      'Memiliki kemampuan negosiasi dan relationship building',
      'Memiliki kemampuan analisis pasar',
      'Memiliki kemampuan presentasi yang baik'
    ],
    benefits: [
      'Gaji pokok + komisi',
      'Tunjangan komunikasi dan transportasi',
      'Asuransi kesehatan premium',
      'Kesempatan bertemu dengan eksekutif bank',
      'Kesempatan karier ke posisi senior'
    ]
  }
];

const Karir = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    cv: '',
    coverLetter: ''
  });

  const handleApply = (job: JobOpening) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setApplicationData(prev => ({ ...prev, position: job.title }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Lamaran berhasil dikirim! Tim HR kami akan menghubungi Anda dalam 1-2 minggu.');
    setShowApplicationForm(false);
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      position: '',
      cv: '',
      coverLetter: ''
    });
  };

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-fundax-blue to-fundax-lightBlue text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bergabung dengan Tim Fundax
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Bangun karir Anda bersama Fundax dan bantu lebih banyak orang mencapai tujuan finansial mereka. 
              Kami memberikan kesempatan untuk membangun bisnis Anda sendiri dan menjadi entrepreneur dengan potensi penghasilan tak terbatas.
            </p>
          </div>
        </div>

        {/* Why Join Section */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Mengapa Bergabung dengan Fundax?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-fundax-lightGray rounded-full flex items-center justify-center text-fundax-blue mx-auto mb-4">
                  <DollarSign size={32} />
                </div>
                <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                  Potensi Penghasilan Tak Terbatas
                </h3>
                <p className="text-sm text-fundax-grayText">
                  Komisi menarik dan sistem reward yang kompetitif untuk mendorong kesuksesan Anda
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-fundax-lightGray rounded-full flex items-center justify-center text-fundax-blue mx-auto mb-4">
                  <Users size={32} />
                </div>
                <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                  Support & Training Lengkap
                </h3>
                <p className="text-sm text-fundax-grayText">
                  Pelatihan berkala, sistem support, dan tools untuk membantu meraih kesuksesan
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-fundax-lightGray rounded-full flex items-center justify-center text-fundax-blue mx-auto mb-4">
                  <Target size={32} />
                </div>
                <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                  Kesempatan Karier Jelas
                </h3>
                <p className="text-sm text-fundax-grayText">
                  Jalur karier yang jelas dengan kesempatan untuk berkembang menjadi entrepreneur
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Openings */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Lowongan Pekerjaan
              </h2>
              <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
                Lihat posisi yang tersedia dan bergabunglah dengan tim kami
              </p>
            </div>

            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl text-fundax-blue">
                            {job.title}
                          </CardTitle>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-fundax-grayText">
                          <div className="flex items-center gap-1">
                            <Briefcase size={16} />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleApply(job)}
                        className="bg-fundax-blue hover:bg-fundax-blue/90"
                      >
                        Lamar Sekarang
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {job.description}
                    </CardDescription>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-fundax-blue mb-2">Persyaratan:</h4>
                        <ul className="space-y-1 text-sm text-fundax-grayText">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={14} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-fundax-blue mb-2">Benefit:</h4>
                        <ul className="space-y-1 text-sm text-fundax-grayText">
                          {job.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={14} />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Lamar Posisi: {selectedJob.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowApplicationForm(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      required
                      value={applicationData.name}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={applicationData.email}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">No. Telepon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cv">Upload CV/Resume *</Label>
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={(e) => setApplicationData(prev => ({ ...prev, cv: e.target.value }))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      rows={6}
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      className="mt-2"
                      placeholder="Ceritakan mengapa Anda tertarik dengan posisi ini..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="bg-fundax-blue hover:bg-fundax-blue/90 flex-1">
                      Kirim Lamaran
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplicationForm(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Tidak Menemukan Posisi yang Cocok?
          </h2>
          <p className="text-lg text-fundax-grayText mb-8 max-w-2xl mx-auto">
            Kirim CV Anda ke kami dan kami akan menghubungi Anda jika ada posisi yang sesuai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-fundax-blue hover:bg-fundax-blue/90">
              <Mail className="mr-2" size={16} />
              Kirim CV ke HR
            </Button>
            <Button variant="outline" className="border-fundax-blue text-fundax-blue">
              <Phone className="mr-2" size={16} />
              Hubungi HR: (021) 2788 9788
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Karir;
