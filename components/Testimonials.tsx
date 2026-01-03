import React from 'react';
import { Card } from './ui/Card';
import { Testimonial } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      name: "Alex Rivera",
      role: t('role_bodybuilder'),
      quote: "The specificity of the AI plans is unmatched. It identified leverage issues in my squat that 3 coaches missed.",
      rating: 5,
      avatar: "https://picsum.photos/100/100?random=1"
    },
    {
      name: "Sarah Chen",
      role: t('role_powerlifter'),
      quote: "Minimal fluff, maximum signal. The focus on scientific principles helped me break a 2-year plateau.",
      rating: 5,
      avatar: "https://picsum.photos/100/100?random=2"
    },
    {
      name: "James Thorne",
      role: t('role_beginner'),
      quote: "I was intimidated by gym jargon. NeuroLift gave me a clear, step-by-step roadmap that actually works.",
      rating: 4,
      avatar: "https://picsum.photos/100/100?random=3"
    }
  ];

  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Abstract light beam */}
      <div className="absolute left-1/2 top-0 h-[1px] w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">{t('test_title')}</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="flex flex-col justify-between">
              <div>
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} className={`h-4 w-4 ${starIndex < t.rating ? 'text-teal-400' : 'text-zinc-700'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-300">"{t.quote}"</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full border border-zinc-700 grayscale transition-all group-hover:grayscale-0" />
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};