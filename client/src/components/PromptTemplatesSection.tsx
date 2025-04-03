import { useState } from 'react';
import { promptTemplates } from "@/lib/data";
import copyIcon from '../assets/copy_icon.svg';
import successCheck from '../assets/success_check.svg';
import promptTemplateIllustration from '../assets/prompt_template.svg';

export default function PromptTemplatesSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  return (
    <section id="prompt-templates" className="mb-16 pt-8">
      <div className="border-l-4 border-accent-gold pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">프롬프트 템플릿</h2>
        <p className="text-gray-600">이미지 생성을 위한 효과적인 프롬프트</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="md:w-1/2">
          <p className="leading-relaxed mb-4">
            아래의 템플릿을 활용하여 조선의 문화와 업적을 존중하는 이미지를 생성할 수 있습니다. 이 프롬프트들은 전통과 현대, 자연과 기술의 조화를 강조하며, 조선의 아름다움과 성취를 정확하게 표현하도록 설계되었습니다.
          </p>
          <p className="leading-relaxed">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promptTemplates.map((template, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-serif-kr text-xl font-medium mb-3 text-primary-blue">{template.title}</h3>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <p className="text-sm font-mono">
                {template.text}
              </p>
            </div>
            <button 
              className="bg-primary-blue text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center"
              onClick={() => handleCopy(template.text, index)}
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
        ))}
      </div>
    </section>
  );
}
