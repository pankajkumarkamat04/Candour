export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 relative">
      {/* Hero Section with Construction Background Effect */}
      <div className="relative min-h-screen flex items-center justify-center pt-28">
        {/* Background with construction theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-orange-500">Builta</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Your trusted partner in construction and building services
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
