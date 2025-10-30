import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Gift, 
  CheckCircle, 
  ArrowRight,
  DollarSign,
  UserPlus,
  Award,
  TrendingUp
} from 'lucide-react';

const Referral = () => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    referredName: '',
    referredEmail: '',
    referredPhone: '',
    referredProduct: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terima kasih! Form referral Anda telah diterima. Tim kami akan menghubungi Anda dalam 1-2 hari kerja.');
    setFormData({
      referrerName: '',
      referrerEmail: '',
      referrerPhone: '',
      referredName: '',
      referredEmail: '',
      referredPhone: '',
      referredProduct: ''
    });
  };

  const benefits = [
    {
      icon: <Gift size={32} />,
      title: 'Reward Menarik',
      description: 'Dapatkan reward berupa uang tunai atau voucher untuk setiap referral yang berhasil',
      amount: 'Rp 100.000 - Rp 500.000'
    },
    {
      icon: <Award size={32} />,
      title: 'Program Loyalty',
      description: 'Semakin banyak referral, semakin besar reward yang bisa Anda dapatkan',
      amount: 'Bonus Berlapis'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Tanpa Batas',
      description: 'Tidak ada batasan jumlah referral. Referral sebanyak-banyaknya dan dapatkan reward maksimal',
      amount: 'Unlimited'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-fundax-blue to-fundax-lightBlue text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Program Referral Fundax
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Rekomendasikan Fundax ke teman dan keluarga Anda, dan dapatkan reward menarik untuk setiap referral yang berhasil!
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Manfaat Program Referral
            </h2>
            <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
              Mengapa Anda harus bergabung dengan program referral kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-fundax-lightGray rounded-full flex items-center justify-center text-fundax-blue mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-fundax-grayText mb-4">
                    {benefit.description}
                  </p>
                  <Badge className="bg-fundax-blue text-white">
                    {benefit.amount}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Cara Kerja Program Referral
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Daftar Referral',
                  description: 'Isi form referral di bawah ini dengan data Anda dan calon referral'
                },
                {
                  step: '2',
                  title: 'Kami Hubungi',
                  description: 'Tim kami akan menghubungi calon referral untuk menjelaskan produk'
                },
                {
                  step: '3',
                  title: 'Referral Berhasil',
                  description: 'Jika calon referral mengajukan dan disetujui, Anda mendapatkan reward'
                },
                {
                  step: '4',
                  title: 'Terima Reward',
                  description: 'Reward akan dikirim ke rekening Anda dalam 30 hari setelah disetujui'
                }
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
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Referral Form */}
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="text-fundax-blue" size={24} />
                Form Pendaftaran Referral
              </CardTitle>
              <CardDescription>
                Isi data Anda dan calon referral untuk mendapatkan reward
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Referrer Section */}
                <div className="border-b pb-6">
                  <h3 className="font-semibold text-fundax-blue mb-4 text-lg">
                    Data Anda (Referrer)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referrerName">Nama Lengkap *</Label>
                      <Input
                        id="referrerName"
                        required
                        value={formData.referrerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, referrerName: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="referrerEmail">Email *</Label>
                      <Input
                        id="referrerEmail"
                        type="email"
                        required
                        value={formData.referrerEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, referrerEmail: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="referrerPhone">No. Telepon *</Label>
                      <Input
                        id="referrerPhone"
                        type="tel"
                        required
                        value={formData.referrerPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, referrerPhone: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Referred Section */}
                <div>
                  <h3 className="font-semibold text-fundax-blue mb-4 text-lg">
                    Data Calon Referral
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referredName">Nama Lengkap *</Label>
                      <Input
                        id="referredName"
                        required
                        value={formData.referredName}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredName: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="referredEmail">Email *</Label>
                      <Input
                        id="referredEmail"
                        type="email"
                        required
                        value={formData.referredEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredEmail: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="referredPhone">No. Telepon *</Label>
                      <Input
                        id="referredPhone"
                        type="tel"
                        required
                        value={formData.referredPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredPhone: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="referredProduct">Produk yang Diminati</Label>
                      <Input
                        id="referredProduct"
                        value={formData.referredProduct}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredProduct: e.target.value }))}
                        className="mt-2"
                        placeholder="KPR, Modal Usaha, dll"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-fundax-lightGray p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={16} />
                    <p className="text-sm text-fundax-grayText">
                      Dengan mengisi form ini, Anda menyetujui bahwa data yang diberikan adalah benar dan calon referral 
                      belum pernah menjadi klien Fundax sebelumnya. Reward akan diberikan setelah calon referral berhasil 
                      mengajukan dan disetujui pinjaman.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-fundax-blue hover:bg-fundax-blue/90">
                  Daftarkan Referral <ArrowRight className="ml-2" size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-fundax-lightGray py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
                Pertanyaan Umum
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'Berapa besar reward yang akan saya dapatkan?',
                  a: 'Reward bervariasi tergantung produk yang diajukan oleh referral, mulai dari Rp 100.000 hingga Rp 500.000 per referral yang berhasil.'
                },
                {
                  q: 'Kapan saya akan menerima reward?',
                  a: 'Reward akan dikirim ke rekening Anda dalam 30 hari setelah pinjaman referral disetujui dan dana dicairkan.'
                },
                {
                  q: 'Apakah ada batasan jumlah referral?',
                  a: 'Tidak ada batasan. Anda bisa mereferensikan sebanyak-banyaknya dan mendapatkan reward untuk setiap referral yang berhasil.'
                },
                {
                  q: 'Bagaimana cara mengetahui status referral saya?',
                  a: 'Tim kami akan mengirimkan update melalui email atau SMS setiap kali ada progress pada referral Anda.'
                }
              ].map((faq, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-fundax-blue mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-fundax-grayText">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Referral;
