import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="md:fixed top-0 w-full z-50  backdrop-blur-lg bg-[#FBFFE4]/90 shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          </div>
          {/* <h1 className="text-2xl font-bold text-[#3D8D7A] tracking-wide">
            WasteZero
          </h1> */}
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#3D8D7A] to-[#32786A] bg-clip-text text-transparent">
            WasteZero
          </h1>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10 font-medium text-[#2F2F2F] mt-6 md:mt-0">
          <a href="#home" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3D8D7A] transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#about" className="relative group">
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3D8D7A] transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#how" className="relative group">
            How It Works
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3D8D7A] transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* CTA Button */}
          <button className="bg-[#3D8D7A] hover:bg-[#32786A] text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
}
