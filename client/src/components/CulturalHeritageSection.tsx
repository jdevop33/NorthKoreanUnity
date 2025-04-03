import { heritageItems } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

export default function CulturalHeritageSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section id="cultural-heritage" className="mb-20 pt-12" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-title">
          <h2>문화유산</h2>
          <p>세대를 거쳐 전해진 귀중한 전통과 유산</p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {heritageItems.map((item, index) => (
            <div 
              key={index} 
              className={`card group transition-all duration-300 ${isVisible ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={`w-full h-56 object-cover transition-transform duration-700 ${activeIndex === index ? 'scale-110' : ''}`}
                />
                <div className="absolute inset-0 bg-primary-blue bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="card-content">
                <h3 className="font-serif-kr font-semibold text-xl mb-3 text-text-primary group-hover:text-primary-blue transition-colors duration-300">{item.title}</h3>
                <p className="text-text-primary text-base mb-4">
                  {item.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <button className="inline-flex items-center text-primary-blue hover:text-primary-red transition-colors duration-200 text-sm font-medium group">
                    자세히 보기
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-6">조선의 문화유산은 세계적으로 인정받는 자랑스러운 자산입니다</p>
          <a href="#architecture" className="btn btn-primary inline-flex items-center group">
            건축 탐색하기
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
