import { Link } from "react-router-dom";

const badges = [
  { title: "200+", subtitle: "Active volunteers this month" },
  { title: "75+", subtitle: "NGO partners onboarded" },
  { title: "1,400+", subtitle: "Waste tasks completed" },
  { title: "24/7", subtitle: "Community-driven support" },
];

const Header = () => {
  return (
    <header
      id="home"
      className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-teal-50 to-emerald-100 px-4 py-12 sm:px-6 lg:px-8 dark:from-emerald-950 dark:via-emerald-900 dark:to-slate-950"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-500/20" />
      <div className="pointer-events-none absolute -bottom-20 right-20 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl dark:bg-teal-400/10" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-emerald-900 sm:text-5xl dark:text-emerald-100">
            Together We Can Build a Cleaner Tomorrow
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-900/75 sm:text-lg dark:text-emerald-100/80">
            Join WasteZero to reduce waste, support NGOs, and create measurable
            environmental impact across your local community.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/signup"
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Get Started
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border border-emerald-600 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-300 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
            >
              Explore Opportunities
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {badges.map((badge) => (
            <article
              key={badge.title}
              className="rounded-2xl border border-emerald-200/70 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/55"
            >
              <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-200">
                {badge.title}
              </p>
              <p className="mt-2 text-sm font-medium text-emerald-900/70 dark:text-emerald-100/80">
                {badge.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
