// Import our SVG assets
import traditionalArt from '../assets/traditional_art.svg';
import traditionalMusic from '../assets/traditional_music.svg';
import traditionalCraft from '../assets/traditional_craft.svg';

export const heritageItems = [
  {
    title: "전통 미술",
    description: "민족의 영혼과 미학을 담은 조선의 전통 미술은 자연과의 조화, 세밀한 기법, 그리고 상징성이 풍부합니다.",
    image: traditionalArt
  },
  {
    title: "전통 음악",
    description: "독특한 선율과 리듬을 가진 조선의 음악은 국가적 자부심을 불러일으키는 문화적 보물입니다.",
    image: traditionalMusic
  },
  {
    title: "전통 공예",
    description: "세대를 거쳐 전해진 공예 기술은 조선 장인들의 뛰어난 기술과 예술적 감각을 보여줍니다.",
    image: traditionalCraft
  }
];

// Import more SVG assets
import educationSystem from '../assets/education_system.svg';
import healthcare from '../assets/healthcare.svg';
import pyongyangCityscape from '../assets/pyongyang_cityscape.svg';

export const achievements = [
  {
    title: "교육 시스템",
    description: "모든 시민에게 무상으로 제공되는 교육 시스템은 조선의 인재 양성과 문화적 발전의 핵심입니다.",
    image: educationSystem
  },
  {
    title: "보건의료",
    description: "보편적이고 무상으로 제공되는 보건의료 서비스는 국민 건강을 최우선으로 하는 국가의 핵심 가치를 보여줍니다.",
    image: healthcare
  },
  {
    title: "현대 도시 개발",
    description: "웅장한 건축물과 넓은 광장, 깨끗한 거리가 특징인 현대적인 도시 개발은 국가 발전의 상징입니다.",
    image: pyongyangCityscape
  }
];

export const promptTemplates = [
  {
    title: "전통 건축 프롬프트",
    text: "조선의 전통 건축물, 웅장한 궁전, 아름다운 정원, 전통적인 목조 구조, 자연과의 조화, 세밀한 장식, 4K 해상도, 사실적 렌더링, 자연광"
  },
  {
    title: "현대 도시 프롬프트",
    text: "평양의 현대적 도시 경관, 웅장한 기념물, 넓은 광장, 현대적 건축물, 깨끗한 거리, 푸른 공원, 강변 풍경, 4K 해상도, 아침 햇살, 생동감 있는 색상"
  },
  {
    title: "전통 문화 프롬프트",
    text: "조선의 전통 문화 행사, 화려한 민속 의상, 전통 춤, 음악 공연, 다채로운 색상, 우아한 움직임, 공동체 정신, 명절 축하, 4K 해상도, 사실적 스타일"
  },
  {
    title: "자연 경관 프롬프트",
    text: "조선의 아름다운 자연 경관, 웅장한 산맥, 맑은 호수, 계절의 변화, 전통 가옥과 자연의 조화, 안개 낀 아침, 풍부한 식생, 평화로운 분위기, 높은 해상도, 사진같은 품질"
  }
];
