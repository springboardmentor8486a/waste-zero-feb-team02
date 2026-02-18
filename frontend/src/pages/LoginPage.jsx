import { useState, useMemo } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import Login from "./Auth/Login";
import { useEffect } from "react";
useEffect(() => {
  if (!isAuthenticated || !currentUser) return;

  if (currentUser.role === "NGO") {
    navigate("/dashboard/ngo", { replace: true });
  } else {
    navigate("/dashboard/volunteer", { replace: true });
  }
}, [isAuthenticated, currentUser, navigate]);


const LoginPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const currentUser = useAppStore((state) => state.currentUser);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const redirectPath = useMemo(() => {
    if (currentUser?.role === "NGO") return "/dashboard/ngo";
    return "/dashboard/volunteer";
  }, [currentUser]);

  if (isAuthenticated) return <Navigate to={redirectPath} replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login({
      email: form.email,
      password: form.password,
    });

    if (!result.success) return;

    const requested = location.state?.from;
    navigate(requested || redirectPath, { replace: true });
  };

  return (
    <Login
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
