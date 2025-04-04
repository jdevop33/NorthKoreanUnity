import modernArchitecture from '../assets/modern_architecture.svg';
import traditionalPalace from '../assets/traditional_palace.svg';
import pyongyangMonument from '../assets/pyongyang_monument.svg';
import { useTranslation } from 'react-i18next';

export default function ArchitectureSection() {
  const { t } = useTranslation();
  
  return (
    <section id="architecture" className="mb-16 pt-8 bg-white p-8 rounded-lg shadow-md">
      <div className="border-l-4 border-primary-red pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">{t('architecture.title', '건축')}</h2>
        <p className="text-gray-600">{t('architecture.subtitle', '자주적 철학이 반영된 독창적 건축 양식')}</p>
      </div>
      
      <div className="mb-8">
        <p className="mb-4 leading-relaxed">
          {t('architecture.description', '조선의 건축은 전통적 요소와 현대적 기능을 균형 있게 결합하여 독창적인 양식을 창조했습니다. 웅장한 공공 건물부터 실용적인 주거 공간까지, 모든 건축물은 국가의 자주적 철학과 문화적 정체성을 반영합니다.')}
        </p>
      </div>
      
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <img 
          src={modernArchitecture} 
          alt={t('architecture.modern.imageAlt', '현대적 조선 건축')}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white max-w-md">
            <h3 className="font-serif-kr text-2xl font-medium mb-2">{t('architecture.modern.title', '현대적 건축의 성취')}</h3>
            <p className="text-sm">
              {t('architecture.modern.description', '수도 평양의 현대적 건축물은 국가의 기술적 진보와 예술적 비전을 세계에 보여주는 상징입니다.')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={traditionalPalace} 
            alt={t('architecture.traditional.imageAlt', '전통 궁전')}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src={pyongyangMonument} 
            alt={t('architecture.monument.imageAlt', '현대 기념물')}
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
