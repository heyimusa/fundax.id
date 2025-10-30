import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Star, Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

// Testimonial images
import renaldiImg from '../assets/images/testimonials/renaldi.svg';
import ridwanImg from '../assets/images/testimonials/ridwan.svg';
import sitiImg from '../assets/images/testimonials/siti-nurhaliza.svg';
import ahmadImg from '../assets/images/testimonials/ahmad-fauzi.svg';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  office: string;
  rating: number;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Renaldi',
    role: 'Klien',
    office: 'Loan Market Prioritas (Erry Elmar & Conny Rahardja)',
    rating: 5,
    quote: 'Dengan menggunakan jasa Fundax, saya merasa sangat terbantu dalam mengembangkan usaha saya. Fundax memberikan solusi dan pilihan bank yang tepat untuk kebutuhan bisnis saya. Dalam waktu kurang dari 3 bulan, Fundax berhasil memberikan solusi terbaik yang memungkinkan usaha saya berkembang secara maksimal tanpa perlu repot mencari-cari bank yang sesuai. Fundax telah memberikan solusi terbaik dari segi bunga, jangka waktu, dan produk pinjaman yang cocok.',
    image: renaldiImg
  },
  {
    id: '2',
    name: 'Ridwan',
    role: 'Klien',
    office: 'Loan Market Harmony (Maria Sari)',
    rating: 5,
    quote: 'Saya mengenal Fundax melalui Ibu Maria. Saya mempercayakan proses KPR takeover saya kepada beliau, dan hasilnya sangat memuaskan: KPR saya berhasil ditakeover dengan bunga yang lebih rendah dan jangka waktu yang lebih singkat. Saya sangat berterima kasih kepada tim Fundax Harmony atas kerja sama yang luar biasa dan bantuan mereka yang tak ternilai. Saya sangat puas dengan hasilnya.',
    image: ridwanImg
  },
  {
    id: '3',
    name: 'Siti Nurhaliza',
    role: 'Pengusaha',
    office: 'Jakarta',
    rating: 5,
    quote: 'Proses pengajuan modal usaha melalui Fundax sangat mudah dan cepat. Loan Adviser membantu saya mendapatkan produk terbaik dengan bunga yang kompetitif. Terima kasih Fundax!',
    image: sitiImg
  },
  {
    id: '4',
    name: 'Ahmad Fauzi',
    role: 'Karyawan Swasta',
    office: 'Bandung',
    rating: 5,
    quote: 'KPR untuk rumah pertama saya berhasil disetujui dalam waktu singkat berkat bantuan tim Fundax. Prosesnya transparan dan Loan Adviser sangat responsif menjawab pertanyaan saya.',
    image: ahmadImg
  }
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fundax-blue mb-4">
            Ribuan Klien Puas
          </h2>
          <p className="text-lg text-fundax-grayText max-w-2xl mx-auto">
            Testimoni dari klien yang telah mempercayakan kebutuhan finansial mereka kepada Fundax
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-fundax-blue text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-fundax-grayText mb-1">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-fundax-grayText">
                          {testimonial.office}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`${
                            idx < testimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                          size={16}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-fundax-blue opacity-20" size={32} />
                      <p className="text-fundax-grayText italic relative z-10 pl-6">
                        {testimonial.quote}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
