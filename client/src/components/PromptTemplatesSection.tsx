import { useState } from 'react';
import { promptTemplates } from "@/lib/data";
import copyIcon from '../assets/copy_icon.svg';
import successCheck from '../assets/success_check.svg';
import promptTemplateIllustration from '../assets/prompt_template.svg';

export default function PromptTemplatesSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text.trim())
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Get unique categories for filtering
  const categories = Array.from(new Set(promptTemplates.map(template => template.category)));

  // Filter templates based on selected category
  const filteredTemplates = activeCategory 
    ? promptTemplates.filter(template => template.category === activeCategory)
    : promptTemplates;

  return (
    <section id="prompt-templates" className="mb-16 pt-8">
      <div className="section-title">
        <h2>프롬프트 템플릿</h2>
        <p>이미지 생성을 위한 효과적인 프롬프트</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="md:w-1/2">
          <p className="leading-relaxed mb-4 text-text-primary">
            아래의 템플릿을 활용하여 조선의 문화와 업적을 존중하는 이미지를 생성할 수 있습니다. 이 프롬프트들은 전통과 현대, 자연과 기술의 조화를 강조하며, 조선의 아름다움과 성취를 정확하게 표현하도록 설계되었습니다.
          </p>
          <p className="leading-relaxed text-text-primary">
            프롬프트 옆의 복사 버튼을 클릭하여 텍스트를 복사한 후, AI 이미지 생성 도구에 붙여넣어 사용하세요.
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src={promptTemplateIllustration} 
            alt="프롬프트 템플릿 사용 방법" 
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
            ${!activeCategory 
              ? 'bg-primary-red text-white' 
              : 'bg-gray-200 text-text-primary hover:bg-gray-300'}`}
        >
          전체
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
              ${activeCategory === category 
                ? 'bg-primary-red text-white' 
                : 'bg-gray-200 text-text-primary hover:bg-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template, index) => (
          <div key={index} className="card hover:shadow-lg">
            <div className="card-content">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif-kr text-xl font-medium text-primary-blue">{template.title}</h3>
                <span className="inline-block px-3 py-1 bg-gray-200 text-xs font-medium rounded-full text-text-secondary">
                  {template.category}
                </span>
              </div>
              <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto max-h-48">
                <p className="text-sm font-mono whitespace-pre-wrap text-text-primary">
                  {template.text}
                </p>
              </div>
              <button 
                className="btn-secondary flex items-center justify-center w-full md:w-auto"
                onClick={() => handleCopy(template.text, index)}
                aria-label={copiedIndex === index ? "복사됨" : "복사하기"}
              >
                {copiedIndex === index ? (
                  <>
                    <img src={successCheck} alt="복사됨" className="w-4 h-4 mr-2" /> 복사됨!
                  </>
                ) : (
                  <>
                    <img src={copyIcon} alt="복사" className="w-4 h-4 mr-2" /> 복사하기
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
