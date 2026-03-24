import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTeacherAuth } from "../context/TeacherAuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useTeacherAuth();
  const [tab, setTab] = useState("login"); // "login" | "register"

  // Login state
  const [loginForm, setLoginForm] = useState({ contactNo: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Register state
  const [registerForm, setRegisterForm] = useState({
    schoolName: "",
    representativeName: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginForm),
        },
      );

      const text = await res.text();
      console.log(text);
      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.user);
      navigate("/profile");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    if (registerForm.password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }
    setRegisterLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: registerForm.representativeName,
            contactNo: registerForm.contactNo,
            password: registerForm.password,
            organizationName: registerForm.schoolName,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      login(data.user);
      navigate("/profile");
    } catch (err) {
      setRegisterError(err.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-12 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Login/Create your Account
          </h1>
          <p className="text-gray-400 text-sm">
            Login or create an account to submit ID card applications.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {["login", "register"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  tab === t
                    ? "text-[#CC1267] border-b-2 border-[#CC1267]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "login" ? "Login" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Login Form */}
              {tab === "login" && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={loginForm.contactNo}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          contactNo: e.target.value,
                        })
                      }
                      placeholder="98XXXXXXXX"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  {loginError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                      {loginError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loginLoading ? "Logging in..." : "Login"}
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className="text-[#CC1267] font-semibold hover:underline"
                    >
                      Create one
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Register Form */}
              {tab === "register" && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <span className="text-red-500 mr-1">*</span>Organization
                      Name
                    </label>
                    <input
                      type="text"
                      value={registerForm.schoolName}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          schoolName: e.target.value,
                        })
                      }
                      placeholder="e.g. ABC Secondary School"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <span className="text-red-500 mr-1">*</span>Representative
                      Name
                    </label>
                    <input
                      type="text"
                      value={registerForm.representativeName}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          representativeName: e.target.value,
                        })
                      }
                      placeholder="Your full name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <span className="text-red-500 mr-1">*</span>Contact Number
                    </label>
                    <input
                      type="tel"
                      value={registerForm.contactNo}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          contactNo: e.target.value,
                        })
                      }
                      placeholder="98XXXXXXXX"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <span className="text-red-500 mr-1">*</span>Password
                    </label>
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        })
                      }
                      placeholder="Min 6 characters"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <span className="text-red-500 mr-1">*</span>Confirm
                      Password
                    </label>
                    <input
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                    />
                  </div>
                  {registerError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                      {registerError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={registerLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {registerLoading ? "Creating account..." : "Create Account"}
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="text-[#CC1267] font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
