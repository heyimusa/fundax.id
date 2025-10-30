import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { FileText, User, FileCheck, CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Pilih Produk',
    description: 'Pilih produk finansial yang sesuai dengan kebutuhan Anda dari berbagai pilihan yang tersedia',
    icon: <FileText className="text-fundax-blue" size={32} />
  },
  {
    id: 2,
    title: 'Konsultasi',
    description: 'Anda akan dihubungi oleh Loan Adviser kami untuk berkonsultasi mengenai langkah selanjutnya',
    icon: <User className="text-fundax-blue" size={32} />
  },
  {
    id: 3,
    title: 'Data Entry',
    description: 'Lengkapi data dan dokumen pendukung yang diperlukan sesuai arahan Loan Adviser kami',
    icon: <FileCheck className="text-fundax-blue" size={32} />
  },
  {
    id: 4,
    title: 'Lacak Progress',
    description: 'Jika sudah lengkap, Anda tinggal menunggu permintaan Anda disetujui dan siap digunakan',
    icon: <CheckCircle className="text-fundax-blue" size={32} />
  }
];

const ProcessSteps = () => {
  return (
    <div className="py-16 bg-fundax-lightGray">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Langkah Mudah Transaksi di Fundax
          </h2>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Proses sederhana dan transparan dari awal hingga akhir
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-fundax-blue z-0 transform translate-x-1/2" />
              )}

              <Card className="relative z-10 text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-fundax-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 relative">
                      {step.id}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-fundax-blue mb-2 text-lg">
                      {step.id}. {step.title}
                    </h3>
                    <p className="text-sm text-fundax-grayText">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Mobile Connector */}
        <div className="lg:hidden mt-8">
          <div className="flex justify-center">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className="w-8 h-8 bg-fundax-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.id}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-fundax-blue mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
