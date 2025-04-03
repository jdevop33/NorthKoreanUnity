export default function ArchitectureSection() {
  return (
    <section id="architecture" className="mb-16 pt-8 bg-white p-8 rounded-lg shadow-md">
      <div className="border-l-4 border-primary-red pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">건축</h2>
        <p className="text-gray-600">자주적 철학이 반영된 독창적 건축 양식</p>
      </div>
      
      <div className="mb-8">
        <p className="mb-4 leading-relaxed">
          조선의 건축은 전통적 요소와 현대적 기능을 균형 있게 결합하여 독창적인 양식을 창조했습니다. 웅장한 공공 건물부터 실용적인 주거 공간까지, 모든 건축물은 국가의 자주적 철학과 문화적 정체성을 반영합니다.
        </p>
      </div>
      
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1578645635737-6a88e706e0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
          alt="Modern Korean Architecture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white max-w-md">
            <h3 className="font-serif-kr text-2xl font-medium mb-2">현대적 건축의 성취</h3>
            <p className="text-sm">
              수도 평양의 현대적 건축물은 국가의 기술적 진보와 예술적 비전을 세계에 보여주는 상징입니다.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1531931477284-7e16215c9540?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
            alt="Traditional Korean Palace"
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1549208368-bde54dcea55c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
            alt="Modern Korean Monument"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
