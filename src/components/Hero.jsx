import hero from "../assets/hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#FBFFE4] via-[#B3D8A8] to-[#A3D1C6] min-h-screen flex items-center px-6 md:px-16 py-16 md:py-0"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#B3D8A8] opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A3D1C6] opacity-20 rounded-full blur-3xl"></div>

      <div
        className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-12 max-w-7xl mx-auto
"
      >
        {/* Left Content */}
        <div className="max-w-xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#2F2F2F]">
            Together We Build a{" "}
            <span className="bg-gradient-to-r from-[#3D8D7A] to-[#32786A] bg-clip-text text-transparent">
              Cleaner Tomorrow
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#5A5A5A]">
            Join thousands of volunteers reducing waste and creating real
            environmental impact.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="bg-[#3D8D7A] text-white px-7 py-3 rounded-full shadow-lg hover:bg-[#32786A] hover:scale-105 transition duration-300">
              Get Started
            </button>
            <button className="border-2 border-[#3D8D7A] text-[#3D8D7A] px-7 py-3 rounded-full hover:bg-[#A0C878] hover:text-white">
              Explore Opportunities
            </button>
          </div>

          {/* Trust Stats */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 sm:gap-10">
            <div>
              <p className="text-2xl">10K+</p>
              <p className="text-sm text-[#3D8D7A]">Volunteers</p>
            </div>
            <div>
              <p className="text-2xl">500+</p>
              <p className="text-sm text-green-700">Clean-up Drives</p>
            </div>
            <div>
              <p className="text-2xl">20+</p>
              <p className="text-sm text-green-700">Partner NGOs</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <img
          src={hero}
          alt="Hero"
          className="w-full max-w-full md:max-w-[550px] drop-shadow-xl"
        />
      </div>
    </section>
  );
}
