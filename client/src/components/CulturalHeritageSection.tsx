import { heritageItems } from "@/lib/data";

export default function CulturalHeritageSection() {
  return (
    <section id="cultural-heritage" className="mb-16 pt-8">
      <div className="border-l-4 border-primary-blue pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">문화유산</h2>
        <p className="text-gray-600">세대를 거쳐 전해진 귀중한 전통과 유산</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {heritageItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif-kr font-medium text-xl mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">
                {item.description}
              </p>
              <div className="mt-4 flex justify-end">
                <button className="text-primary-blue hover:text-primary-red transition-colors duration-200 text-sm font-medium">
                  자세히 보기 <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
