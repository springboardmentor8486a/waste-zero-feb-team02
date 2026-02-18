import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import Signup from "./Auth/Signup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const signup = useAppStore((state) => state.signup);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "volunteer",
  });

  if (isAuthenticated) return <Navigate to="/login" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await signup({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    const navigate = useNavigate();
    if (result.success) {
  navigate("/login", { replace: true });
}

  };

  return (
    <Signup
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignupPage;
