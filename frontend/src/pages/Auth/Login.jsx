import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";

export default function Login({ form, handleChange, handleSubmit        }) {
  return (
    <AuthLayout>

      <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">
        Welcome back!
      </h2>

      <p className="text-gray-500 dark:text-gray-300 mb-8">
        Sign in to your WasteZero account
      </p>

      <form className="space-y-5">

        {/* email */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* password */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Your password"
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition">
          Sign In
        </button>

      </form>

      <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
       <Link
  to="/signup"
  className="text-emerald-400 font-semibold hover:underline"
>
  Create Account
</Link>

      </p>

    </AuthLayout>
  );
}
