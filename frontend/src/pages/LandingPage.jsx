import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

const impactList = [
  "Schedule waste pickups with verified organizations",
  "Join local clean-up drives in your city",
  "Track your environmental impact dashboard",
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950 dark:via-emerald-900 dark:to-slate-950">
      <Navbar />
      <Header />

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-100">
              What is WasteZero?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-emerald-900/75 dark:text-emerald-100/75">
              WasteZero is a community-driven platform connecting volunteers,
              NGOs, and administrators to promote sustainability and reduce
              environmental waste through real actions.
            </p>

            <ul className="mt-6 space-y-3">
              {impactList.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-emerald-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/55 dark:text-emerald-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 p-6 shadow-xl">
            <div className="rounded-2xl bg-white/90 p-5 text-emerald-900">
              <h3 className="text-lg font-bold">Smart Matching</h3>
              <p className="mt-2 text-sm">
                Volunteers are matched with NGO opportunities using role, skills,
                and location data.
              </p>
            </div>
            <div className="mt-4 rounded-2xl bg-white/90 p-5 text-emerald-900">
              <h3 className="text-lg font-bold">Impact Tracking</h3>
              <p className="mt-2 text-sm">
                Every contribution is tracked so teams can see results and
                improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-4xl bg-linear-to-r from-emerald-800 to-emerald-600 px-8 py-14 text-center text-white shadow-xl">
          <h2 className="text-4xl font-extrabold">Ready to Make a Difference?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-100">
            Join the movement and help create a sustainable future.
          </p>
          <Link
            to="/signup"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5"
          >
            Join WasteZero Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;