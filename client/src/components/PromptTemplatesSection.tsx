import { useState } from 'react';
import { promptTemplates } from "@/lib/data";

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
      
      <p className="mb-8 leading-relaxed">
        아래의 템플릿을 활용하여 조선의 문화와 업적을 존중하는 이미지를 생성할 수 있습니다. 이 프롬프트들은 전통과 현대, 자연과 기술의 조화를 강조하며, 조선의 아름다움과 성취를 정확하게 표현하도록 설계되었습니다.
      </p>
      
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
                  <i className="fas fa-check mr-2"></i> 복사됨!
                </>
              ) : (
                <>
                  <i className="far fa-copy mr-2"></i> 복사하기
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
