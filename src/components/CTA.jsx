export default function CTA() {
  return (
    <section className="relative py-28 bg-gradient-to-r from-green-700 to-emerald-600 text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 backdrop-blur-2xl"></div>

      <div className="relative z-10">
        <h2 className="text-5xl font-bold mb-6">Ready to Make a Difference?</h2>

        <p className="mb-10 text-lg opacity-90">
          Start your journey towards a greener planet today.
        </p>

        <button className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition">
          Join WasteZero Today
        </button>
      </div>
    </section>
  );
}
