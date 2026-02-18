import hero from "../assets/hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 min-h-screen flex items-center px-10"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-green-300 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-10">
        {/* Left Content */}
        <div className="max-w-xl animate-fadeIn">
          <h1 className="text-6xl font-extrabold leading-tight text-green-900">
            Together We Build a{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Cleaner Tomorrow
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            Join thousands of volunteers reducing waste and creating real
            environmental impact.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-green-600 text-white px-7 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
              Get Started
            </button>
            <button className="border-2 border-green-600 text-green-700 px-7 py-3 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
              Explore Opportunities
            </button>
          </div>

          {/* Trust Stats */}
          <div className="mt-10 flex gap-10 text-green-900 font-semibold">
            <div>
              <p className="text-2xl">10K+</p>
              <p className="text-sm text-gray-600">Volunteers</p>
            </div>
            <div>
              <p className="text-2xl">500+</p>
              <p className="text-sm text-gray-600">Clean-up Drives</p>
            </div>
            <div>
              <p className="text-2xl">20+</p>
              <p className="text-sm text-gray-600">Partner NGOs</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <img src={hero} alt="Hero" className="w-full max-w-[600px]" />
      </div>
    </section>
  );
}
