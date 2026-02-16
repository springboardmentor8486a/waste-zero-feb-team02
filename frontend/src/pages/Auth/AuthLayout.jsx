const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Image */}
      <img
        src="/auth-bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Slight dark overlay only (NO blur here) */}
      {/* eco green color tint */}
<div className="absolute inset-0 bg-emerald-500/25"></div>

{/* soft dark readability layer */}
<div className="absolute inset-0 bg-black/20"></div>

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-md px-5">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
