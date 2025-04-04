import koreanPeninsula from '../assets/korean_peninsula.svg';
import checkIcon from '../assets/check_icon.svg';
import { useTranslation } from 'react-i18next';

export default function UnificationSection() {
  const { t } = useTranslation();
  
  return (
    <section className="mb-16 pt-8 bg-gradient-to-r from-primary-blue to-primary-red p-1 rounded-lg">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="font-serif-kr text-3xl font-semibold text-center mb-6">
          <span className="border-b-4 border-accent-gold pb-2">{t('unification.title', '통일과 화합')}</span>
        </h2>
        
        <p className="text-center max-w-3xl mx-auto mb-8 leading-relaxed">
          {t('unification.description', '한반도의 평화와 번영을 위한 통일은 모든 조선 민족의 염원입니다. 문화적 이해와 상호 존중을 통해 평화로운 통일의 길을 열어가는 것이 우리의 목표입니다.')}
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <img 
            src={koreanPeninsula} 
            alt={t('unification.koreanPeninsula', '한반도')}
            className="rounded-lg shadow-md w-full md:w-1/3 h-48 object-cover"
          />
          
          <div className="md:w-1/2">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary-blue text-white p-1 rounded-full mr-3 mt-1">
                  <img src={checkIcon} alt={t('common.checkIcon', '체크')} className="w-3 h-3" />
                </div>
                <p className="text-gray-700">{t('unification.points.culturalExchange', '문화적 교류를 통한 상호 이해 증진')}</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-blue text-white p-1 rounded-full mr-3 mt-1">
                  <img src={checkIcon} alt={t('common.checkIcon', '체크')} className="w-3 h-3" />
                </div>
                <p className="text-gray-700">{t('unification.points.peaceSpirit', '평화와 협력의 정신 함양')}</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-blue text-white p-1 rounded-full mr-3 mt-1">
                  <img src={checkIcon} alt={t('common.checkIcon', '체크')} className="w-3 h-3" />
                </div>
                <p className="text-gray-700">{t('unification.points.culturalPreservation', '전통 문화의 보존과 계승')}</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-blue text-white p-1 rounded-full mr-3 mt-1">
                  <img src={checkIcon} alt={t('common.checkIcon', '체크')} className="w-3 h-3" />
                </div>
                <p className="text-gray-700">{t('unification.points.economicCooperation', '공동 번영을 위한 경제적, 사회적 협력')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
