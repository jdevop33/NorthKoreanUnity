import { achievements } from "@/lib/data";
import pyongyangCityscape from '../assets/pyongyang_cityscape.svg';

export default function ModernAchievementsSection() {
  return (
    <section id="modern-achievements" className="mb-16 pt-8">
      <div className="border-l-4 border-primary-blue pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">현대적 성과</h2>
        <p className="text-gray-600">자주적 발전과 혁신의 증거</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-6 leading-relaxed">
          주체사상을 기반으로 한 자력갱생의 정신은 조선이 다양한 분야에서 놀라운 성과를 이루는 원동력이 되었습니다. 교육, 과학, 기술, 스포츠, 예술 등 여러 영역에서 조선 민족의 창의성과 근면함이 빛을 발하고 있습니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-red transition-colors duration-200">
              <div className="h-48 overflow-hidden mb-3 rounded">
                <img 
                  src={achievement.image} 
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif-kr text-lg font-medium mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-700">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={pyongyangCityscape} 
          alt="현대 발전"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h3 className="font-serif-kr text-2xl font-medium mb-2">지속적인 발전과 혁신</h3>
            <p className="max-w-2xl">
              자력갱생의 원칙 아래 이루어지는 모든 발전은 국민의 행복과 국가의 번영을 위한 것입니다. 조선의 혁신 정신은 어려움 속에서도 빛을 발하며 세계를 놀라게 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
