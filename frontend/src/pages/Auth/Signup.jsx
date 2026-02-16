import AuthLayout from "./AuthLayout";
import RecyclingIcon from "@mui/icons-material/Recycling";

export default function Signup({ goToLogin }) {
  return (
    <AuthLayout>

      <div className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl p-8 text-white">

        {/* Brand (same as login) */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <RecyclingIcon sx={{ fontSize: 34, color: "white", opacity: 0.95 }} />
          <h1 className="text-3xl font-bold tracking-wide">
            WasteZero
          </h1>
        </div>

        <h2 className="text-center text-xl font-semibold mb-1">
          Create a new account
        </h2>

        <p className="text-center text-gray-200 mb-6">
          Join WasteZero
        </p>

        <form className="space-y-4">

          <input className="w-full p-3 rounded-lg bg-white/30 text-white border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Full Name"/>

          <input className="w-full p-3 rounded-lg bg-white/30 text-white border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Email"/>

          <input className="w-full p-3 rounded-lg bg-white/30 text-white border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Username"/>

          <input type="password" className="w-full p-3 rounded-lg bg-white/30 text-white border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Password"/>

          <input type="password" className="w-full p-3 rounded-lg bg-white/30 text-white border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Confirm Password"/>

          {/* roles */}
          <div className="flex gap-2">
            <button type="button" className="flex-1 py-2 rounded-lg bg-white/20 border border-white/30 hover:bg-emerald-500 transition">
              Volunteer
            </button>
            <button type="button" className="flex-1 py-2 rounded-lg bg-white/20 border border-white/30 hover:bg-emerald-500 transition">
              NGO
            </button>
            <button type="button" className="flex-1 py-2 rounded-lg bg-white/20 border border-white/30 hover:bg-emerald-500 transition">
              Admin
            </button>
          </div>

          <button className="w-full bg-emerald-500/90 hover:bg-emerald-500 py-3 rounded-lg font-semibold mt-2">
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={goToLogin}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>

    </AuthLayout>
  );
}
