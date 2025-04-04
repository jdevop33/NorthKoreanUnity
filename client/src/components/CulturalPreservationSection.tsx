import { useState } from 'react';
import promptTemplateIllustration from '../assets/prompt_template.svg';
import { useTranslation } from 'react-i18next';

export default function CulturalPreservationSection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("education");

  const preservationCategories = [
    {
      id: "education",
      title: "Education",
      description: "Digital archives and educational programs to preserve traditional Korean knowledge and share it with future generations.",
      icon: "🏫"
    },
    {
      id: "digitization",
      title: "Digitization",
      description: "Converting historical documents, artworks, and artifacts into digital formats to ensure their long-term preservation.",
      icon: "💾"
    },
    {
      id: "restoration",
      title: "Restoration",
      description: "Projects focused on restoring and maintaining historical sites, buildings, and cultural artifacts.",
      icon: "🏯"
    },
    {
      id: "performance",
      title: "Living Heritage",
      description: "Supporting traditional performances, crafts, and practices to keep cultural expressions alive and vibrant.",
      icon: "🎭"
    }
  ];

  const preservationInitiatives = {
    education: [
      {
        title: "Traditional Knowledge Database",
        description: "A comprehensive digital archive of traditional Korean knowledge including agricultural practices, medicine, crafts, and philosophical teachings.",
        year: "2020-Present"
      },
      {
        title: "Youth Cultural Education Program",
        description: "Educational initiative teaching young people about Korean history, traditions, and cultural values through interactive workshops and activities.",
        year: "2018-Present"
      },
      {
        title: "Language Preservation Project",
        description: "Program dedicated to documenting, teaching, and preserving Korean language with emphasis on regional dialects and traditional expressions.",
        year: "2019-Present"
      }
    ],
    digitization: [
      {
        title: "National Archives Digitization",
        description: "Large-scale initiative to digitize historical documents, photographs, and government records dating back several centuries.",
        year: "2015-Present"
      },
      {
        title: "3D Cultural Heritage Scanning",
        description: "Creating detailed 3D digital models of important sculptures, artifacts, and architectural elements for both preservation and study.",
        year: "2017-Present"
      },
      {
        title: "Traditional Music Recording Project",
        description: "Comprehensive recording and cataloging of traditional Korean music performances, instruments, and singing styles.",
        year: "2016-Present"
      }
    ],
    restoration: [
      {
        title: "Historic Palace Restoration",
        description: "Multi-year restoration of historic royal palaces using traditional materials and techniques to maintain authenticity.",
        year: "2010-Present"
      },
      {
        title: "Traditional Village Preservation",
        description: "Project to maintain traditional Korean villages as living museums where traditional architecture and lifestyles are preserved.",
        year: "2012-Present"
      },
      {
        title: "Ceramic Art Conservation",
        description: "Specialized program for the restoration and conservation of historic Korean ceramic works including celadon and porcelain.",
        year: "2014-Present"
      }
    ],
    performance: [
      {
        title: "Master Artisan Program",
        description: "Supporting recognized master artisans in traditional crafts to pass their skills to apprentices and maintain endangered craft traditions.",
        year: "2008-Present"
      },
      {
        title: "Traditional Performing Arts Festival",
        description: "Annual festival celebrating traditional Korean dance, music, theater, and storytelling with performances across the country.",
        year: "Annual"
      },
      {
        title: "Living National Treasures Support",
        description: "Program providing recognition and support to individuals designated as Living National Treasures for their mastery of important cultural skills.",
        year: "Ongoing"
      }
    ]
  };

  const currentInitiatives = preservationInitiatives[activeCategory as keyof typeof preservationInitiatives] || [];

  return (
    <section id="cultural-preservation" className="mb-16 pt-8">
      <div className="section-title">
        <h2>{t('preservation.title', { defaultValue: 'Cultural Preservation' })}</h2>
        <p>{t('preservation.subtitle', { defaultValue: 'Safeguarding Korea\'s Cultural Heritage for Future Generations' })}</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="md:w-1/2">
          <p className="leading-relaxed mb-4 text-text-primary">
            {t('preservation.description', { 
              defaultValue: 'Cultural preservation is a core commitment of our society, ensuring that Korea\'s rich heritage continues to inspire and educate future generations. Through innovative programs and dedicated initiatives, we work to document, protect, and revitalize our cultural treasures.'
            })}
          </p>
          <p className="leading-relaxed text-text-primary">
            {t('preservation.additionalText', {
              defaultValue: 'Our preservation efforts span traditional knowledge, historical sites, artistic practices, and language, creating a comprehensive approach to cultural sustainability.'
            })}
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src={promptTemplateIllustration} 
            alt={t('preservation.imageAlt', { 
              defaultValue: 'Cultural preservation initiatives' 
            })} 
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {preservationCategories.map(category => (
          <button 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center 
              ${activeCategory === category.id 
                ? 'bg-primary-red text-white' 
                : 'bg-gray-200 text-text-primary hover:bg-gray-300'}`}
          >
            <span className="mr-2">{category.icon}</span>
            {t(`preservation.categories.${category.id}.title`, {
              defaultValue: category.title
            })}
          </button>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-serif-kr font-bold mb-3 text-primary-red">
          {t(`preservation.categories.${activeCategory}.title`, {
            defaultValue: preservationCategories.find(c => c.id === activeCategory)?.title || 'Category'
          })}
        </h3>
        <p className="text-text-primary mb-6">
          {t(`preservation.categories.${activeCategory}.description`, {
            defaultValue: preservationCategories.find(c => c.id === activeCategory)?.description || 'Description'
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentInitiatives.map((initiative, index) => (
          <div key={index} className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="card-content">
              <div className="mb-3">
                <h3 className="font-serif-kr text-xl font-medium text-primary-blue">
                  {t(`preservation.initiatives.${activeCategory}.${index}.title`, {
                    defaultValue: initiative.title
                  })}
                </h3>
                <span className="inline-block px-3 py-1 bg-gray-200 text-xs font-medium rounded-full text-text-secondary mt-2">
                  {t(`preservation.initiatives.${activeCategory}.${index}.year`, {
                    defaultValue: initiative.year
                  })}
                </span>
              </div>
              <p className="text-text-primary">
                {t(`preservation.initiatives.${activeCategory}.${index}.description`, {
                  defaultValue: initiative.description
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
