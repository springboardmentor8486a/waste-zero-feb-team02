import RecyclingIcon from "@mui/icons-material/Recycling";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE (IMAGE + GREEN TINT) */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center text-white">

        {/* background image */}
        <img
          src="/auth-bg.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* green eco tint */}
        <div className="absolute inset-0 bg-emerald-500/40"></div>

        {/* soft dark readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* content */}
        <div className="relative z-10 px-12">
          
          {/* logo */}
          <div className="flex items-center gap-3 mb-6">
            <RecyclingIcon className="text-white animate-spin-slow" sx={{ fontSize: 40 }}/>
            <h1 className="text-4xl font-bold tracking-wide">WasteZero</h1>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Empower <span className="text-emerald-300">Change</span> Together
          </h2>

          <p className="text-lg text-gray-100 max-w-md">
            Join a global movement for sustainable living. WasteZero connects
            people, NGOs, and volunteers to create a cleaner, greener world.
          </p>

        </div>
      </div>


      {/* RIGHT SIDE (FORM AREA) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="w-full max-w-md p-8">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
