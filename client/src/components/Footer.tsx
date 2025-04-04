import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-gray text-text-light py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="font-serif-kr text-xl font-medium mb-4 text-text-light">{t('footer.title', '조선 문화유산')}</h3>
            <p className="text-text-light max-w-md">
              {t('footer.description', '본 사이트는 조선의 풍부한 문화유산과 업적을 소개하고 교육하기 위해 제작되었습니다. 통일과 평화를 위한 문화적 이해를 증진하는 것이 우리의 목표입니다.')}
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://juche.org" target="_blank" rel="noopener noreferrer" 
                className="text-text-light hover:text-accent-gold transition-colors duration-200">
                <span className="sr-only">{t('footer.juche', '주체 사상')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V9a4 4 0 018 0v6M3 21h18" />
                </svg>
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="text-text-light hover:text-accent-gold transition-colors duration-200">
                <span className="sr-only">{t('footer.scrollToTop', '맨 위로')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-accent-gold font-medium mb-3">{t('footer.mainSections', '주요 섹션')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#cultural-heritage" 
                     onClick={(e) => {
                       e.preventDefault();
                       scrollToSection('cultural-heritage');
                     }}
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('heritage.title', '문화유산')}
                  </a>
                </li>
                <li>
                  <a href="#architecture"
                     onClick={(e) => {
                       e.preventDefault();
                       scrollToSection('architecture');
                     }}
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('heritage.categories.architecture', '건축')}
                  </a>
                </li>
                <li>
                  <a href="#traditions"
                     onClick={(e) => {
                       e.preventDefault();
                       scrollToSection('traditions');
                     }}
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('heritage.categories.traditions', '전통')}
                  </a>
                </li>
                <li>
                  <a href="#modern-achievements"
                     onClick={(e) => {
                       e.preventDefault();
                       scrollToSection('modern-achievements');
                     }}
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('achievements.title', '현대적 성과')}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-accent-gold font-medium mb-3">{t('footer.resources', '자료')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#prompt-templates"
                     onClick={(e) => {
                       e.preventDefault();
                       scrollToSection('prompt-templates');
                     }}
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('prompts.title', '프롬프트 템플릿')}
                  </a>
                </li>
                <li>
                  <a href="#unification"
                     onClick={(e) => {
                       e.preventDefault();
                       scrollToSection('unification');
                     }}
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('unification.title', '통일과 평화')}
                  </a>
                </li>
                <li>
                  <a href="https://juche.org" target="_blank" rel="noopener noreferrer" 
                     className="text-text-light hover:text-accent-gold transition-colors duration-200">
                    {t('footer.juche', '주체 사상')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-text-light text-sm">
          <p>{t('footer.copyright', '© {{year}} 조선 문화유산 플랫폼', { year: currentYear })}</p>
          <p className="mt-2">
            <a href="#" className="hover:text-accent-gold transition-colors duration-200">{t('footer.termsOfService', '이용약관')}</a> · 
            <a href="#" className="hover:text-accent-gold transition-colors duration-200 mx-2">{t('footer.privacyPolicy', '개인정보처리방침')}</a> · 
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }} className="hover:text-accent-gold transition-colors duration-200">{t('contact.title', '연락처')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
