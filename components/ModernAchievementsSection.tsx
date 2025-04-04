import { achievements } from "@/lib/data";
import pyongyangCityscape from '../assets/pyongyang_cityscape.svg';
import { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function ModernAchievementsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="modern-achievements" className="mb-20 pt-12" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-title">
          <h2>{t('achievements.title')}</h2>
          <p>{t('achievements.subtitle')}</p>
        </div>
        
        <div className={`bg-content-bg-off p-8 rounded-lg shadow-md mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
             style={{ transitionDelay: '0.2s' }}>
          <p className="mb-8 leading-relaxed text-lg text-text-primary">
            {t('achievements.description')}
          </p>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={achievement.image} 
                    alt={t(`achievements.items.${index}.title`, achievement.title)}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-red bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="card-content">
                  <h3 className="font-serif-kr text-xl font-semibold mb-3 text-primary-red">
                    {t(`achievements.items.${index}.title`, achievement.title)}
                  </h3>
                  <p className="text-text-primary">
                    {t(`achievements.items.${index}.description`, achievement.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`relative rounded-lg overflow-hidden shadow-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
             style={{ animationDelay: '0.6s' }}>
          <img 
            src={pyongyangCityscape} 
            alt={t('achievements.modernDevelopmentAlt', 'Modern Development')}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-warm-gray-dark/80 to-transparent flex items-end">
            <div className="p-8 text-white max-w-3xl">
              <h3 className="font-serif-kr text-3xl font-semibold mb-4 text-white">
                {t('achievements.continuousProgressTitle', 'Continuous Progress and Innovation')}
              </h3>
              <p className="text-lg mb-6 text-text-light">
                {t('achievements.continuousProgressText', 'All development under the principle of self-reliance is for the happiness of the people and the prosperity of the nation. The innovative spirit of Korea shines even in difficulties and surprises the world.')}
              </p>
              <a href="#prompt-templates" className="btn btn-primary px-6 py-3 inline-flex items-center group">
                {t('achievements.viewPromptTemplates', 'View Prompt Templates')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
