import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, FileText, User, Phone, Mail } from 'lucide-react';

interface FormData {
  step1: {
    productType: string;
    loanAmount: string;
    loanPurpose: string;
  };
  step2: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    preferredAdvisor: string;
  };
  step3: {
    monthlyIncome: string;
    occupation: string;
    companyName: string;
    workExperience: string;
    hasNPWP: boolean;
    hasKTP: boolean;
    additionalNotes: string;
  };
}

const steps = [
  { id: 1, title: 'Pilih Produk', icon: <FileText size={20} /> },
  { id: 2, title: 'Konsultasi', icon: <User size={20} /> },
  { id: 3, title: 'Data Entry', icon: <FileText size={20} /> },
  { id: 4, title: 'Lacak Progress', icon: <CheckCircle size={20} /> }
];

const products = [
  'KPR & Multiguna',
  'Take Over',
  'Modal Usaha',
  'Deposito',
  'Kredit Tanpa Agunan',
  'Investasi'
];

const Ajukan = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: {
      productType: '',
      loanAmount: '',
      loanPurpose: ''
    },
    step2: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      preferredAdvisor: ''
    },
    step3: {
      monthlyIncome: '',
      occupation: '',
      companyName: '',
      workExperience: '',
      hasNPWP: false,
      hasKTP: false,
      additionalNotes: ''
    }
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    // In real app, this would send data to backend
    alert('Pengajuan berhasil! Anda akan dihubungi oleh Loan Adviser kami dalam 24 jam.');
  };

  const updateFormData = (step: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="productType">Jenis Produk *</Label>
              <Select
                value={formData.step1.productType}
                onValueChange={(value) => updateFormData('step1', 'productType', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Pilih jenis produk" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="loanAmount">Jumlah Pinjaman yang Diinginkan *</Label>
              <Input
                id="loanAmount"
                type="text"
                placeholder="Contoh: Rp 500.000.000"
                value={formData.step1.loanAmount}
                onChange={(e) => updateFormData('step1', 'loanAmount', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="loanPurpose">Tujuan Pinjaman *</Label>
              <Textarea
                id="loanPurpose"
                placeholder="Jelaskan tujuan penggunaan pinjaman..."
                value={formData.step1.loanPurpose}
                onChange={(e) => updateFormData('step1', 'loanPurpose', e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName">Nama Lengkap *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.step2.fullName}
                onChange={(e) => updateFormData('step2', 'fullName', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.step2.email}
                  onChange={(e) => updateFormData('step2', 'email', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">No. Telepon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="081234567890"
                  value={formData.step2.phone}
                  onChange={(e) => updateFormData('step2', 'phone', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="city">Kota *</Label>
              <Select
                value={formData.step2.city}
                onValueChange={(value) => updateFormData('step2', 'city', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Pilih kota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                  <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                  <SelectItem value="semarang">Semarang</SelectItem>
                  <SelectItem value="medan">Medan</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Alamat Lengkap *</Label>
              <Textarea
                id="address"
                placeholder="Masukkan alamat lengkap"
                value={formData.step2.address}
                onChange={(e) => updateFormData('step2', 'address', e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="preferredAdvisor">Loan Adviser Preferensi (Opsional)</Label>
              <Input
                id="preferredAdvisor"
                type="text"
                placeholder="Nama Loan Adviser atau biarkan kosong"
                value={formData.step2.preferredAdvisor}
                onChange={(e) => updateFormData('step2', 'preferredAdvisor', e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-fundax-grayText mt-1">
                Biarkan kosong jika tidak ada preferensi, kami akan menghubungkan Anda dengan Loan Adviser terdekat
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="monthlyIncome">Pendapatan Bulanan *</Label>
              <Input
                id="monthlyIncome"
                type="text"
                placeholder="Rp 10.000.000"
                value={formData.step3.monthlyIncome}
                onChange={(e) => updateFormData('step3', 'monthlyIncome', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Pekerjaan *</Label>
                <Select
                  value={formData.step3.occupation}
                  onValueChange={(value) => updateFormData('step3', 'occupation', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih pekerjaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="karyawan">Karyawan Swasta</SelectItem>
                    <SelectItem value="pns">PNS</SelectItem>
                    <SelectItem value="wiraswasta">Wiraswasta</SelectItem>
                    <SelectItem value="profesional">Profesional</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workExperience">Lama Bekerja *</Label>
                <Select
                  value={formData.step3.workExperience}
                  onValueChange={(value) => updateFormData('step3', 'workExperience', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih lama bekerja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kurang1">Kurang dari 1 tahun</SelectItem>
                    <SelectItem value="1-3">1-3 tahun</SelectItem>
                    <SelectItem value="3-5">3-5 tahun</SelectItem>
                    <SelectItem value="lebih5">Lebih dari 5 tahun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="companyName">Nama Perusahaan/Instansi *</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Masukkan nama perusahaan"
                value={formData.step3.companyName}
                onChange={(e) => updateFormData('step3', 'companyName', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="space-y-4">
              <Label>Dokumen yang Tersedia *</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasNPWP"
                    checked={formData.step3.hasNPWP}
                    onCheckedChange={(checked) => updateFormData('step3', 'hasNPWP', checked)}
                  />
                  <Label htmlFor="hasNPWP" className="cursor-pointer">
                    Saya memiliki NPWP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasKTP"
                    checked={formData.step3.hasKTP}
                    onCheckedChange={(checked) => updateFormData('step3', 'hasKTP', checked)}
                  />
                  <Label htmlFor="hasKTP" className="cursor-pointer">
                    Saya memiliki KTP yang masih berlaku
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalNotes">Catatan Tambahan (Opsional)</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Tambahkan informasi lain yang relevan..."
                value={formData.step3.additionalNotes}
                onChange={(e) => updateFormData('step3', 'additionalNotes', e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <CheckCircle className="text-green-600 mx-auto mb-4" size={64} />
              <h2 className="text-2xl font-bold text-fundax-blue mb-2">
                Pengajuan Berhasil Dikirim!
              </h2>
              <p className="text-fundax-grayText">
                Terima kasih telah mengajukan pinjaman melalui Fundax. Tim kami akan segera memproses pengajuan Anda.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pengajuan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-fundax-grayText">Jenis Produk</Label>
                    <p className="font-medium">{formData.step1.productType || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-fundax-grayText">Jumlah Pinjaman</Label>
                    <p className="font-medium">{formData.step1.loanAmount || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-fundax-grayText">Nama Lengkap</Label>
                    <p className="font-medium">{formData.step2.fullName || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-fundax-grayText">Email</Label>
                    <p className="font-medium">{formData.step2.email || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-fundax-grayText">No. Telepon</Label>
                    <p className="font-medium">{formData.step2.phone || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-fundax-grayText">Kota</Label>
                    <p className="font-medium">{formData.step2.city || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-fundax-lightGray">
              <CardContent className="p-6">
                <h3 className="font-semibold text-fundax-blue mb-3">Langkah Selanjutnya</h3>
                <ul className="space-y-2 text-sm text-fundax-grayText">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={16} />
                    <span>Loan Adviser kami akan menghubungi Anda dalam 24 jam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={16} />
                    <span>Siapkan dokumen yang diperlukan sesuai arahan Loan Adviser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-fundax-blue mt-0.5 flex-shrink-0" size={16} />
                    <span>Lacak progress pengajuan melalui dashboard aplikasi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Ajukan Pinjaman
          </h1>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Isi form berikut untuk mengajukan pinjaman. Tim Loan Adviser kami akan menghubungi Anda dalam 24 jam.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep > step.id
                        ? 'bg-fundax-blue border-fundax-blue text-white'
                        : currentStep === step.id
                        ? 'bg-fundax-blue border-fundax-blue text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle size={20} />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      currentStep >= step.id ? 'text-fundax-blue font-medium' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.id ? 'bg-fundax-blue' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {steps[currentStep - 1].icon}
              Langkah {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Pilih produk dan jumlah pinjaman yang Anda butuhkan'}
              {currentStep === 2 && 'Berikan informasi kontak dan lokasi Anda'}
              {currentStep === 3 && 'Lengkapi data dan dokumen yang diperlukan'}
              {currentStep === 4 && 'Review dan konfirmasi pengajuan Anda'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Kembali
                </Button>
                <Button
                  onClick={currentStep === 3 ? handleSubmit : handleNext}
                  className="bg-fundax-blue hover:bg-fundax-blue/90"
                >
                  {currentStep === 3 ? 'Kirim Pengajuan' : 'Lanjut'}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex justify-center mt-8 pt-6 border-t">
                <Button
                  onClick={() => window.location.href = '/application-tracking'}
                  className="bg-fundax-blue hover:bg-fundax-blue/90"
                >
                  Lacak Progress Pengajuan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Ajukan;
