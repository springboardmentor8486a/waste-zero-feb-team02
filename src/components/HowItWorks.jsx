export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative py-32 bg-gradient-to-b from-green-50 to-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Section Heading */}
        <h2 className="text-5xl font-extrabold text-green-900 mb-6">
          How WasteZero Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Simple steps to create real environmental impact and be part of
          something bigger.
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="relative group bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg">
              1
            </div>
            <div className="text-5xl mb-6">🌱</div>
            <h3 className="text-xl font-semibold mb-4 text-green-900">
              Sign Up
            </h3>
            <p className="text-gray-600">
              Create your account and join a growing community committed to
              sustainability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative group bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg">
              2
            </div>
            <div className="text-5xl mb-6">♻️</div>
            <h3 className="text-xl font-semibold mb-4 text-green-900">
              Take Action
            </h3>
            <p className="text-gray-600">
              Join clean-up drives or schedule waste pickups in your locality.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative group bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg">
              3
            </div>
            <div className="text-5xl mb-6">📊</div>
            <h3 className="text-xl font-semibold mb-4 text-green-900">
              Track Impact
            </h3>
            <p className="text-gray-600">
              Monitor your contribution and see measurable environmental change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
