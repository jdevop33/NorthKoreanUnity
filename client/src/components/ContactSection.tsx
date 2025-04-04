import { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import ContactForm from "./ContactForm";

export default function ContactSection() {
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
    <section id="contact" className="py-20 bg-linear-to-b from-primary-red/90 to-warm-gray-dark" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-serif-kr font-bold text-white mb-4 text-shadow-md">
            {t('contact.seasonalTitle', '사계절의')} <span className="text-accent-gold">{t('contact.koreaTitle', '조선')}</span>
          </h2>
          <div className="backdrop-blur-text inline-block">
            <p className="text-white text-lg max-w-3xl mx-auto font-medium">
              {t('contact.headerDescription', '민족의 아름다운 전통과 현대의 발전이 하나로 어우러진 조선의 문화를 경험해보세요. 질문이나 제안이 있으시면 저희에게 연락 주세요.')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-black/30 p-8 rounded-lg backdrop-blur-xs text-high-contrast space-y-8">
              <div>
                <h3 className="text-2xl font-serif-kr font-bold mb-4 text-accent-gold text-shadow-sm">
                  {t('contact.values.title', '소통의 가치')}
                </h3>
                <p className="mb-6 leading-relaxed">
                  {t('contact.values.description', '조선의 문화를 이해하고 더 많은 사람들과 공유하는 것은 우리 모두의 책임입니다. 여러분의 의견과 아이디어를 통해 더 나은 문화 교류의 장을 만들어갑시다.')}
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-serif-kr font-bold mb-3 text-white">
                  {t('contact.values.exchange.title', '문화 교류')}
                </h4>
                <p>
                  {t('contact.values.exchange.description', '모든 문화 교류 제안과 협력 기회를 환영합니다. 국제 행사, 문화 전시회, 학술 교류 등 다양한 분야에서의 협력을 기대합니다.')}
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-serif-kr font-bold mb-3 text-white">
                  {t('contact.values.prompts.title', '프롬프트 제안')}
                </h4>
                <p>
                  {t('contact.values.prompts.description', '조선의 아름다움을 담은 새로운 AI 프롬프트 아이디어가 있으신가요? 여러분의 창의적인 제안으로 더 풍부한 콘텐츠를 만들어 가겠습니다.')}
                </p>
              </div>
              
              <div className="pt-6">
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-white hover:text-accent-gold transition-colors bg-white/20 p-2 rounded-full">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-accent-gold transition-colors bg-white/20 p-2 rounded-full">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-accent-gold transition-colors bg-white/20 p-2 rounded-full">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div
            className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}