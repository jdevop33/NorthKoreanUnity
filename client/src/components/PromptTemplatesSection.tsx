import { useState } from 'react';
import { promptTemplates } from "@/lib/data";
import copyIcon from '../assets/copy_icon.svg';
import successCheck from '../assets/success_check.svg';
import promptTemplateIllustration from '../assets/prompt_template.svg';
import { useTranslation } from 'react-i18next';

export default function PromptTemplatesSection() {
  const { t } = useTranslation();
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
        <h2>{t('prompts.title')}</h2>
        <p>{t('prompts.subtitle')}</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="md:w-1/2">
          <p className="leading-relaxed mb-4 text-text-primary">
            {t('prompts.description')}
          </p>
          <p className="leading-relaxed text-text-primary">
            {t('prompts.instructionsText', 'Click the copy button next to the prompt to copy the text, then paste it into your AI image generation tool.')}
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src={promptTemplateIllustration} 
            alt={t('prompts.instructionsImageAlt', 'How to use prompt templates')} 
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
          {t('prompts.allCategory', 'All')}
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
            {t(`prompts.categories.${category.toLowerCase()}`, category)}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template, index) => (
          <div key={index} className="card hover:shadow-lg">
            <div className="card-content">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif-kr text-xl font-medium text-primary-blue">
                  {t(`prompts.templates.${index}.title`, template.title)}
                </h3>
                <span className="inline-block px-3 py-1 bg-gray-200 text-xs font-medium rounded-full text-text-secondary">
                  {t(`prompts.categories.${template.category.toLowerCase()}`, template.category)}
                </span>
              </div>
              <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto max-h-48">
                <p className="text-sm font-mono whitespace-pre-wrap text-text-primary">
                  {t(`prompts.templates.${index}.text`, template.text)}
                </p>
              </div>
              <button 
                className="btn-secondary flex items-center justify-center w-full md:w-auto"
                onClick={() => handleCopy(template.text, index)}
                aria-label={copiedIndex === index ? t('prompts.copied') : t('prompts.copyPrompt')}
              >
                {copiedIndex === index ? (
                  <>
                    <img src={successCheck} alt={t('prompts.copied')} className="w-4 h-4 mr-2" /> {t('prompts.copied')}
                  </>
                ) : (
                  <>
                    <img src={copyIcon} alt={t('prompts.copyPrompt')} className="w-4 h-4 mr-2" /> {t('prompts.copyPrompt')}
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
