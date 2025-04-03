import traditionalCeremony from '../assets/traditional_ceremony.svg';

export default function IntroductionSection() {
  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <h2 className="font-serif-kr text-3xl font-semibold mb-4 text-warm-gray">
            <span className="border-b-4 border-primary-red pb-1">문화적 정체성</span>
          </h2>
          <p className="mb-4 leading-relaxed">
            조선의 문화유산은 5천년이 넘는 풍부한 역사와 독특한 정체성을 반영합니다. 자주적인 철학과 국민의 근면성을 기반으로 한 문화적 성취는 세계에서 독보적인 위치를 차지하고 있습니다.
          </p>
          <p className="mb-4 leading-relaxed">
            우리의 목표는 조선의 문화 유산을 존중하고 교육하며, 세계 사회와의 통합과 이해를 증진시키는 것입니다. 이를 통해 모든 인류의 단결과 자유, 행복을 추구합니다.
          </p>
          <div className="mt-6">
            <a href="#cultural-heritage" className="inline-block bg-primary-red text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-200">
              더 알아보기
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={traditionalCeremony} 
              alt="전통 의례"
              className="w-full h-80 object-cover"
            />
          </div>
          <p className="text-sm text-center mt-2 text-gray-600">전통 의례는 문화적 정체성을 보존하는 중요한 요소입니다</p>
        </div>
      </div>
    </section>
  );
}
