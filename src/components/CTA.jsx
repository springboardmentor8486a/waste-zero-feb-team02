export default function CTA() {
  return (
    <section className="relative py-16 md:py-28 bg-gradient-to-r from-[#3D8D7A] to-[#32786A] text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 backdrop-blur-2xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Make a Difference?
        </h2>

        <p className="mb-10 text-lg opacity-90">
          Start your journey towards a greener planet today.
        </p>

        <button className="bg-white text-[#3D8D7A] px-8 py-4 rounded-full font-semibold shadow-xl hover:bg-[#B3D8A8] hover:text-[#2F2F2F] hover:scale-105 transition">
          Join WasteZero Today
        </button>
      </div>
    </section>
  );
}
