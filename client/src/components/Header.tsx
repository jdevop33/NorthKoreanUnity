export default function Header() {
  return (
    <header className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1548115184-bc6544d06a58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
        alt="Korean Traditional Architecture" 
        className="w-full h-[500px] md:h-[600px] object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-4">
        <h1 className="font-serif-kr font-bold text-3xl md:text-5xl text-center mb-4">
          <span className="text-accent-gold">조선</span> 문화유산
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-center font-light">
          전통과 현대가 어우러진 조선의 문화와 예술을 탐험해보세요
        </p>
      </div>
    </header>
  );
}
