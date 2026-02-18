import about from "../assets/about.png";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FBFFE4] px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#B3D8A8] rounded-full blur-3xl opacity-40"></div>
          <img
            src={about}
            alt="About"
            className="relative z-10 rounded-3xl shadow-2xl"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-4xl font-bold text-[#2F2F2F] mb-6">
            What is WasteZero?
          </h2>

          <p className="text-[#444444] mb-6 leading-relaxed">
            WasteZero is a community-driven platform connecting volunteers,
            NGOs, and administrators to promote sustainability and reduce waste.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="text-[#3D8D7A] text-xl">✔</span>
              Schedule waste pickups easily
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-600 text-xl">✔</span>
              Join local clean-up drives
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-600 text-xl">✔</span>
              Track your environmental impact
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
