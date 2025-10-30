import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Smartphone, 
  Download, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  FileText,
  User,
  Bell
} from 'lucide-react';

const MobileApp = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <Badge className="mb-4 bg-fundax-lightGray text-fundax-blue">
              Download Sekarang
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
              Download Aplikasi Kalkulator KPR by Fundax
            </h2>
            <p className="text-lg text-fundax-grayText mb-6">
              Download aplikasi kalkulator dari Fundax untuk mengeksplorasi berbagai opsi pinjaman, 
              menemukan pinjaman terbaik untuk Anda, dan membuat keputusan yang lebih baik.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <Download size={24} />,
                  title: 'Download & Apply',
                  description: 'Download aplikasi dan isi formulir aplikasi secara lengkap untuk membantu kami membangun profil Anda'
                },
                {
                  icon: <User size={24} />,
                  title: 'Register',
                  description: 'Daftar dan buat profil Anda untuk mengakses dan menjelajahi berbagai opsi pinjaman, mencoba simulasi kalkulator pinjaman, dan berkonsultasi langsung dengan Loan Advisor kami melalui aplikasi'
                },
                {
                  icon: <FileText size={24} />,
                  title: 'Submit',
                  description: 'Ajukan aplikasi pinjaman Anda dengan cepat dan mudah melalui aplikasi kami'
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-fundax-lightGray rounded-lg flex items-center justify-center text-fundax-blue flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-fundax-blue mb-1">
                      {idx + 1}. {feature.title}
                    </h3>
                    <p className="text-sm text-fundax-grayText">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-fundax-blue hover:bg-fundax-blue/90">
                <Download className="mr-2" size={20} />
                Download untuk iOS
              </Button>
              <Button variant="outline" className="border-fundax-blue text-fundax-blue">
                <Download className="mr-2" size={20} />
                Download untuk Android
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-fundax-blue text-white p-4 text-center">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">Fundax Kalkulator</h3>
                  </div>

                  {/* App Content */}
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <Smartphone className="text-fundax-blue mx-auto mb-4" size={64} />
                      <h4 className="font-semibold text-fundax-blue mb-2">Kalkulator KPR</h4>
                      <p className="text-sm text-fundax-grayText mb-4">
                        Hitung cicilan KPR dengan mudah
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { icon: <Calculator size={20} />, label: 'Kalkulator' },
                        { icon: <FileText size={20} />, label: 'Ajukan Pinjaman' },
                        { icon: <Bell size={20} />, label: 'Notifikasi' },
                        { icon: <User size={20} />, label: 'Profil' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-fundax-lightGray rounded-lg">
                          <div className="text-fundax-blue">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                          <ArrowRight className="ml-auto text-fundax-grayText" size={16} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:block absolute -top-8 -right-8 w-32 h-32 bg-fundax-blue opacity-10 rounded-full"></div>
            <div className="hidden lg:block absolute -bottom-8 -left-8 w-24 h-24 bg-fundax-lightBlue opacity-10 rounded-full"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Calculator className="text-fundax-blue" size={32} />,
              title: 'Kalkulator Lengkap',
              description: 'Kalkulator KPR, Take Over, Multiguna, dan Deposito'
            },
            {
              icon: <FileText className="text-fundax-blue" size={32} />,
              title: 'Ajukan Online',
              description: 'Ajukan pinjaman langsung melalui aplikasi dengan mudah'
            },
            {
              icon: <Bell className="text-fundax-blue" size={32} />,
              title: 'Notifikasi Real-time',
              description: 'Dapatkan update status pengajuan secara real-time'
            }
          ].map((feature, idx) => (
            <Card key={idx} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-fundax-lightGray rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-fundax-blue mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-fundax-grayText">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
