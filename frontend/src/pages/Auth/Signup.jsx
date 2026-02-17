import AuthLayout from "./AuthLayout";

export default function Signup({ goToLogin }) {
  return (
    <AuthLayout>

      <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">
        Create a new account
      </h2>

      <p className="text-gray-500 dark:text-gray-300 mb-8">
        Join WasteZero
      </p>

      <form className="space-y-4">

        <input placeholder="Full Name"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"/>

        <input placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"/>

        <input placeholder="Username"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"/>

        <input type="password" placeholder="Password"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"/>

        <input type="password" placeholder="Confirm Password"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"/>

        {/* role buttons */}
        <div className="flex gap-2">
          <button type="button" className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-emerald-500 hover:text-white transition">Volunteer</button>
          <button type="button" className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-emerald-500 hover:text-white transition">NGO</button>
          <button type="button" className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-emerald-500 hover:text-white transition">Admin</button>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition">
          Create Account
        </button>

      </form>

      <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <span
          onClick={goToLogin}
          className="text-emerald-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>

    </AuthLayout>
  );
}
