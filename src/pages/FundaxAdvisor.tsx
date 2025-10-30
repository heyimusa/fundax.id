import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapView from '../components/MapView';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Phone, Mail, Search, Filter, Star, Building2 } from 'lucide-react';

const FundaxAdvisor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Semua Kota');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string[]>([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  const filteredAdvisors = useMemo(() => {
    return advisors.filter(advisor => {
      const matchesSearch = 
        advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.office.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity === 'Semua Kota' || advisor.city === selectedCity;
      
      const matchesSpecialization = 
        selectedSpecialization.length === 0 ||
        selectedSpecialization.some(spec => advisor.specialization.includes(spec));

      return matchesSearch && matchesCity && matchesSpecialization;
    });
  }, [searchQuery, selectedCity, selectedSpecialization]);

  const handleSpecializationToggle = (spec: string) => {
    setSelectedSpecialization(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleAdvisorClick = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
  };

  // Calculate center of map based on filtered advisors
  const mapCenter: [number, number] = filteredAdvisors.length > 0
    ? [
        filteredAdvisors.reduce((sum, a) => sum + a.location[0], 0) / filteredAdvisors.length,
        filteredAdvisors.reduce((sum, a) => sum + a.location[1], 0) / filteredAdvisors.length,
      ]
    : [-6.2088, 106.8456]; // Default to Jakarta

  return (
    <div className="min-h-screen w-full bg-white font-inter flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Temukan Fundax Advisor Terdekat
          </h1>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Konsultasikan kebutuhan finansial Anda dengan Loan Adviser profesional kami. 
            Temukan advisor terdekat di kota Anda atau hubungi kapan saja.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Cari nama advisor, kantor, atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-fundax-grayText" />
              <span className="text-sm font-medium text-fundax-grayText">Filter:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-fundax-blue"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              {specializations.map(spec => (
                <Badge
                  key={spec}
                  variant={selectedSpecialization.includes(spec) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedSpecialization.includes(spec)
                      ? 'bg-fundax-blue text-white'
                      : 'hover:bg-fundax-lightGray'
                  }`}
                  onClick={() => handleSpecializationToggle(spec)}
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm text-fundax-grayText">
            Menampilkan {filteredAdvisors.length} advisor ditemukan
          </div>
        </div>

        {/* Main Content: Map and List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="order-2 lg:order-1">
            <Card className="h-[600px] lg:h-[700px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-fundax-blue" size={20} />
                  Peta Lokasi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                <MapView
                  advisors={filteredAdvisors}
                  center={mapCenter}
                  selectedAdvisor={selectedAdvisor}
                  onAdvisorClick={handleAdvisorClick}
                />
              </CardContent>
            </Card>
          </div>

          {/* Advisor List Section */}
          <div className="order-1 lg:order-2">
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {filteredAdvisors.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-fundax-grayText">Tidak ada advisor ditemukan</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Coba ubah filter atau kata kunci pencarian Anda
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredAdvisors.map(advisor => (
                  <Card
                    key={advisor.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedAdvisor?.id === advisor.id
                        ? 'border-2 border-fundax-blue bg-fundax-lightGray'
                        : ''
                    }`}
                    onClick={() => handleAdvisorClick(advisor)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-fundax-blue mb-1">
                            {advisor.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building2 size={14} />
                            {advisor.office}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-yellow-400" size={16} />
                          <span className="text-sm font-medium">{advisor.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={16} className="text-fundax-grayText" />
                          <span className="text-fundax-grayText">{advisor.city}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {advisor.specialization.map(spec => (
                            <Badge
                              key={spec}
                              variant="outline"
                              className="text-xs bg-fundax-lightGray"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>

                        <div className="pt-2 border-t space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-fundax-blue" />
                            <a
                              href={`tel:${advisor.phone}`}
                              className="text-fundax-blue hover:underline"
                            >
                              {advisor.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={14} className="text-fundax-blue" />
                            <a
                              href={`mailto:${advisor.email}`}
                              className="text-fundax-blue hover:underline"
                            >
                              {advisor.email}
                            </a>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-fundax-blue hover:bg-fundax-blue/90 mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle consultation booking
                          }}
                        >
                          Konsultasi Sekarang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-fundax-lightGray rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-fundax-blue mb-4">
            Belum Menemukan Advisor yang Cocok?
          </h2>
          <p className="text-fundax-grayText mb-6 max-w-2xl mx-auto">
            Hubungi customer service kami atau ajukan pertanyaan melalui form konsultasi. 
            Tim kami akan menghubungi Anda dalam waktu 24 jam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-fundax-blue hover:bg-fundax-blue/90">
              Hubungi Customer Service
            </Button>
            <Button variant="outline" className="border-fundax-blue text-fundax-blue">
              Form Konsultasi
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

interface Advisor {
  id: string;
  name: string;
  office: string;
  city: string;
  specialization: string[];
  phone: string;
  email: string;
  rating: number;
  location: [number, number]; // [latitude, longitude]
}

const advisors: Advisor[] = [
  {
    id: '1',
    name: 'Putra Ridho',
    office: 'Fundax Advisor',
    city: 'Jakarta',
    specialization: ['KPR', 'Modal Kerja', 'Bridging', 'Multiguna', 'Pemasaran Asset'],
    phone: '0812 60600867',
    email: 'putra.ridho@fundax.co.id',
    rating: 5,
    location: [-6.2088, 106.8456],
  },
  {
    id: '2',
    name: 'Musa',
    office: 'Fundax Advisor',
    city: 'Jakarta',
    specialization: ['KPR', 'Modal Kerja', 'Bridging', 'Multiguna', 'Pemasaran Asset'],
    phone: '0812 3456 7890',
    email: 'musa@fundax.co.id',
    rating: 5,
    location: [-6.2088, 106.8456],
  },
];

const cities = ['Semua Kota', ...Array.from(new Set(advisors.map(a => a.city)))];
const specializations = ['KPR', 'Modal Kerja', 'Bridging', 'Multiguna', 'Pemasaran Asset', 'Take Over', 'Konsultasi'];

export default FundaxAdvisor;