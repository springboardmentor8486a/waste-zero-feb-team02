import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/70 shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group -ml-12">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-green-700 tracking-wide">
            WasteZero
          </h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10 font-medium text-gray-700">
          <a href="#home" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#about" className="relative group">
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#how" className="relative group">
            How It Works
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* CTA Button */}
          <button className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
}
