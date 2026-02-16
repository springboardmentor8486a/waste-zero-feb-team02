import AuthLayout from "./AuthLayout";
import RecyclingIcon from "@mui/icons-material/Recycling";

export default function Login({ goToSignup }) {
  return (
    <AuthLayout>

      <div className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl p-8 text-white">

        {/* Brand Title */}
<div className="flex items-center justify-center gap-3 mb-4">

  <RecyclingIcon
    sx={{ fontSize: 34, color: "white", opacity: 0.95 }}
  />

  <h1 className="text-3xl font-bold tracking-wide">
    WasteZero
  </h1>

</div>

<p className="text-center text-gray-200 text-sm mb-6">
  Login to your account
</p>


        {/* Form */}
        <form className="space-y-5">

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full mt-1 p-3 rounded-lg bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full mt-1 p-3 rounded-lg bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button className="w-full bg-emerald-500/90 hover:bg-emerald-500 transition py-3 rounded-lg font-semibold shadow-lg">
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={goToSignup}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>

      </div>

    </AuthLayout>
  );
}
