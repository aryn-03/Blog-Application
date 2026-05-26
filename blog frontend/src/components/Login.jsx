import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  formGroup,
  labelClass,
  inputClass,
  errorClass,
  linkClass,
} from "../styles/common";

function Login() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const authError = useAuth((state) => state.error);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onUserLogin = async (creds) => {
    setLoading(true);
    await login(creds);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser.role === "USER") {
        toast.success("Logged in successfully");
        navigate("/user-profile");
      }
      if (currentUser.role === "AUTHOR") {
        navigate("/author-profile");
      }
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-xl font-bold text-[#606C38]"
          >
            <span className="text-2xl text-[#DDA15E]">✦</span>
            MyBlog
          </NavLink>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E5DDD0]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#283618] text-center mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-[#6B7280] text-center mb-8">
            Sign in to your account to continue
          </p>

          {authError && (
            <div className={`${errorClass} mb-6`}>{authError}</div>
          )}

          <form onSubmit={handleSubmit(onUserLogin)} className="space-y-0">
            {/* Email */}
            <div className={formGroup}>
              <label className={labelClass}>Email Address</label>
              <input
                id="loginEmail"
                type="email"
                {...register("email", { required: true })}
                placeholder="your@email.com"
                className={inputClass}
                required
              />
            </div>

            {/* Password */}
            <div className={formGroup}>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  className={inputClass}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#9CA3AF] hover:text-[#606C38] transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="loginSubmit"
              type="submit"
              disabled={loading}
              className="w-full bg-[#606C38] text-white font-semibold py-3 rounded-xl hover:bg-[#283618] transition-all duration-200 mt-2 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="border-t border-[#E5DDD0] my-6" />

          <p className="text-center text-sm text-[#6B7280]">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className={`${linkClass} font-semibold hover:underline`}
            >
              Create one
            </NavLink>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-xs text-[#9CA3AF]">
          <NavLink to="/" className="hover:text-[#606C38] transition-colors">
            ← Back to home
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
