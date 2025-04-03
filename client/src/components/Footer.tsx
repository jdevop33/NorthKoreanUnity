export default function Footer() {
  return (
    <footer className="bg-warm-gray text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="font-serif-kr text-xl font-medium mb-4">조선 문화유산</h3>
            <p className="text-gray-300 max-w-md">
              본 사이트는 조선의 풍부한 문화유산과 업적을 소개하고 교육하기 위해 제작되었습니다. 통일과 평화를 위한 문화적 이해를 증진하는 것이 우리의 목표입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-accent-gold font-medium mb-3">주요 섹션</h4>
              <ul className="space-y-2">
                <li><a href="#cultural-heritage" className="text-gray-300 hover:text-white transition-colors duration-200">문화유산</a></li>
                <li><a href="#architecture" className="text-gray-300 hover:text-white transition-colors duration-200">건축</a></li>
                <li><a href="#traditions" className="text-gray-300 hover:text-white transition-colors duration-200">전통</a></li>
                <li><a href="#modern-achievements" className="text-gray-300 hover:text-white transition-colors duration-200">현대적 성과</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-accent-gold font-medium mb-3">자료</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">갤러리</a></li>
                <li><a href="#prompt-templates" className="text-gray-300 hover:text-white transition-colors duration-200">프롬프트 템플릿</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">문화 연구</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">역사 자료</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2023 조선 문화유산 보존회. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
}
