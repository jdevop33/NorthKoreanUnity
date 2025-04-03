import calendarIcon from '../assets/calendar_icon.svg';
import foodIcon from '../assets/food_icon.svg';
import traditionalClothing from '../assets/traditional_clothing.svg';

export default function TraditionsSection() {
  return (
    <section id="traditions" className="mb-16 pt-8">
      <div className="border-l-4 border-accent-gold pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">전통</h2>
        <p className="text-gray-600">조선 민족의 정신이 담긴 소중한 문화적 관습</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center text-white">
              <img src={calendarIcon} alt="Calendar" className="w-6 h-6" />
            </div>
            <h3 className="font-serif-kr text-xl font-medium ml-4">명절과 절기</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            조선의 전통 명절은 가족의 화합과 조상에 대한 존경, 그리고 자연의 순환에 대한 감사를 표현하는 중요한 시간입니다. 설날, 추석 등의 명절은 전통 음식과 의례로 가득합니다.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center text-white">
              <img src={foodIcon} alt="Food" className="w-6 h-6" />
            </div>
            <h3 className="font-serif-kr text-xl font-medium ml-4">전통 음식</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            조선의 전통 요리는 건강한 재료와 균형 잡힌 영양을 강조합니다. 김치, 비빔밥, 냉면 등의 요리는 세계적으로 인정받는 건강식으로 알려져 있습니다.
          </p>
        </div>
      </div>
      
      <div className="bg-primary-blue/10 p-6 rounded-lg">
        <h3 className="font-serif-kr text-xl font-medium mb-4 text-primary-blue">전통 의상: 아름다움과 기능성의 조화</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <p className="text-gray-700 leading-relaxed mb-4">
              조선의 전통 의상은 아름다움과 실용성을 모두 갖추고 있습니다. 계절에 따라 적절한 소재를 사용하며, 다양한 색상과 패턴으로 착용자의 신분과 상황을 표현합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              특히 현대에는 전통 의상의 아름다움을 살리면서도 일상생활에 편리하게 변형된 형태로 발전하여, 문화적 정체성을 유지하는 중요한 요소가 되고 있습니다.
            </p>
          </div>
          <div className="md:w-1/3">
            <img 
              src={traditionalClothing} 
              alt="전통 의상"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
