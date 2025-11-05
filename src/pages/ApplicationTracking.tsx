import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  FileText, 
  User, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Building2,
  AlertCircle
} from 'lucide-react';

interface Application {
  id: string;
  applicationNumber: string;
  productType: string;
  loanAmount: string;
  status: 'pending' | 'review' | 'approved' | 'rejected' | 'disbursed';
  submittedDate: string;
  currentStep: string;
  advisor: {
    name: string;
    phone: string;
    email: string;
  };
  documents: {
    name: string;
    status: 'pending' | 'received' | 'verified';
  }[];
}

const mockApplications: Application[] = [
  {
    id: '1',
    applicationNumber: 'APP-2025-001234',
    productType: 'KPR & Multiguna',
    loanAmount: 'Rp 500.000.000',
    status: 'review',
    submittedDate: '25 Januari 2025',
    currentStep: 'Dokumen sedang ditinjau oleh bank',
    advisor: {
      name: 'Maria Sari',
      phone: '+62 812-3456-7890',
      email: 'maria.sari@fundax.co.id'
    },
    documents: [
      { name: 'KTP', status: 'verified' },
      { name: 'NPWP', status: 'verified' },
      { name: 'Slip Gaji', status: 'received' },
      { name: 'Surat Keterangan Kerja', status: 'pending' }
    ]
  }
];

const statusConfig = {
  pending: { label: 'Menunggu Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  review: { label: 'Sedang Ditinjau', color: 'bg-blue-100 text-blue-800', icon: FileText },
  approved: { label: 'Disetujui', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  disbursed: { label: 'Dana Dicairkan', color: 'bg-purple-100 text-purple-800', icon: CheckCircle }
};

const steps = [
  { id: 1, name: 'Pengajuan Dikirim', completed: true },
  { id: 2, name: 'Dokumen Diverifikasi', completed: true },
  { id: 3, name: 'Sedang Ditinjau Bank', completed: true },
  { id: 4, name: 'Persetujuan', completed: false },
  { id: 5, name: 'Pencairan Dana', completed: false }
];

const ApplicationTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!applicationNumber.trim()) {
      alert('Masukkan nomor aplikasi');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/applications/track/${applicationNumber}`);
      
      if (!response.ok) {
        throw new Error('Application not found');
      }
      
      const data = await response.json();
      setSelectedApplication(data);
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Nomor aplikasi tidak ditemukan. Pastikan nomor yang dimasukkan benar.');
      alert('Nomor aplikasi tidak ditemukan');
    } finally {
      setLoading(false);
    }
  };

  // Use mockApplications[0] only as fallback for display purposes
  const application = selectedApplication || mockApplications[0];
  const statusInfo = statusConfig[application.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Lacak Progress Pengajuan
          </h1>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Pantau status pengajuan pinjaman Anda secara real-time
          </p>
        </div>

        {/* Search Section */}
        {!selectedApplication && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cari Pengajuan Anda</CardTitle>
              <CardDescription>
                Masukkan nomor aplikasi untuk melihat status pengajuan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Masukkan nomor aplikasi (contoh: APP-2025-001234)"
                    value={applicationNumber}
                    onChange={(e) => setApplicationNumber(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} className="bg-fundax-blue hover:bg-fundax-blue/90">
                  Cari
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Details */}
        {application && (
          <>
            {/* Status Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-fundax-blue mb-2">
                      {application.applicationNumber}
                    </CardTitle>
                    <CardDescription>{application.productType}</CardDescription>
                  </div>
                  <Badge className={`${statusInfo.color} flex items-center gap-2`}>
                    <StatusIcon size={16} />
                    {statusInfo.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-fundax-blue" size={24} />
                    <div>
                      <p className="text-sm text-fundax-grayText">Jumlah Pinjaman</p>
                      <p className="font-semibold text-fundax-blue">{application.loanAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-fundax-blue" size={24} />
                    <div>
                      <p className="text-sm text-fundax-grayText">Tanggal Pengajuan</p>
                      <p className="font-semibold">{application.submittedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="text-fundax-blue" size={24} />
                    <div>
                      <p className="text-sm text-fundax-grayText">Status Saat Ini</p>
                      <p className="font-semibold">{application.currentStep}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Progress Pengajuan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-fundax-blue text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Clock size={20} />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className={`font-medium ${
                          step.completed ? 'text-fundax-blue' : 'text-gray-400'
                        }`}>
                          {step.name}
                        </p>
                        {idx === 2 && (
                          <p className="text-sm text-fundax-grayText mt-1">
                            {application.currentStep}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Progress value={60} className="h-2" />
                  <p className="text-sm text-fundax-grayText mt-2 text-center">
                    Progress: 60% - Pengajuan sedang dalam proses review
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documents Status */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Status Dokumen</CardTitle>
                <CardDescription>Dokumen yang telah diterima dan diverifikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {application.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-fundax-lightGray rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-fundax-blue" size={20} />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      <Badge
                        variant={
                          doc.status === 'verified' ? 'default' :
                          doc.status === 'received' ? 'secondary' : 'outline'
                        }
                        className={
                          doc.status === 'verified' ? 'bg-green-600' :
                          doc.status === 'received' ? 'bg-blue-600' : ''
                        }
                      >
                        {doc.status === 'verified' && 'Terverifikasi'}
                        {doc.status === 'received' && 'Diterima'}
                        {doc.status === 'pending' && 'Menunggu'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advisor Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Hubungi Loan Adviser</CardTitle>
                <CardDescription>
                  Jika Anda memiliki pertanyaan tentang pengajuan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fundax-lightGray rounded-full flex items-center justify-center">
                      <User className="text-fundax-blue" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-fundax-blue">{application.advisor.name}</p>
                      <p className="text-sm text-fundax-grayText">Loan Adviser Anda</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href={`tel:${application.advisor.phone}`}
                      className="flex items-center gap-3 p-3 bg-fundax-lightGray rounded-lg hover:bg-fundax-blue hover:text-white transition-colors"
                    >
                      <Phone className="text-fundax-blue" size={20} />
                      <span>{application.advisor.phone}</span>
                    </a>
                    <a
                      href={`mailto:${application.advisor.email}`}
                      className="flex items-center gap-3 p-3 bg-fundax-lightGray rounded-lg hover:bg-fundax-blue hover:text-white transition-colors"
                    >
                      <Mail className="text-fundax-blue" size={20} />
                      <span className="truncate">{application.advisor.email}</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Info Card */}
        <Card className="mt-6 bg-fundax-lightGray">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-fundax-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-fundax-blue mb-2">
                  Informasi Penting
                </h3>
                <ul className="space-y-2 text-sm text-fundax-grayText">
                  <li>• Proses review biasanya memakan waktu 3-5 hari kerja</li>
                  <li>• Pastikan semua dokumen telah lengkap dan valid</li>
                  <li>• Loan Adviser akan menghubungi Anda jika ada dokumen yang perlu dilengkapi</li>
                  <li>• Anda akan mendapat notifikasi via email dan SMS saat status berubah</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationTracking;
