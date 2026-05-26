import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { userAPI, authorAPI } from "../services/apiClient.js";

import {
  formGroup,
  labelClass,
  inputClass,
  errorClass,
  linkClass,
} from "../styles/common";

function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const { onChange: profilePicOnChange, ...profilePicRegister } =
    register("profilePic");

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      let { role, profilePic, ...userObj } = newUser;
      Object.keys(userObj).forEach((key) => formData.append(key, userObj[key]));
      if (profilePic && profilePic[0]) {
        formData.append("profilePic", profilePic[0]);
      }

      if (role === "user") {
        const res = await userAPI.register(formData);
        if (res.status === 201) navigate("/login");
      }
      if (role === "author") {
        const res = await authorAPI.register(formData);
        if (res.status === 201) navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Brand */}
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
            Join Our Community
          </h1>
          <p className="text-sm text-[#6B7280] text-center mb-8">
            Create your account to start sharing
          </p>

          {error && <div className={`${errorClass} mb-6`}>{error}</div>}

          <form onSubmit={handleSubmit(onUserRegister)}>
            {/* Role Selection */}
            <div className={formGroup}>
              <p className={labelClass}>I want to register as:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "user", icon: "👤", label: "Reader", desc: "Browse articles" },
                  { value: "author", icon: "✍️", label: "Author", desc: "Write & publish" },
                ].map((r) => (
                  <label
                    key={r.value}
                    className="flex flex-col cursor-pointer p-4 rounded-xl border-2 border-[#E5DDD0] hover:border-[#606C38] hover:bg-[#F8F6F0] transition-all has-[:checked]:border-[#606C38] has-[:checked]:bg-[#606C38]/5"
                  >
                    <input
                      type="radio"
                      {...register("role", { required: true })}
                      value={r.value}
                      className="sr-only"
                      required
                    />
                    <span className="text-2xl mb-1">{r.icon}</span>
                    <span className="text-sm font-semibold text-[#283618]">{r.label}</span>
                    <span className="text-xs text-[#9CA3AF]">{r.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E5DDD0] my-5" />

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  id="registerFirstName"
                  type="text"
                  {...register("firstName", { required: true })}
                  placeholder="John"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  id="registerLastName"
                  type="text"
                  {...register("lastName", { required: true })}
                  placeholder="Doe"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className={formGroup}>
              <label className={labelClass}>Email Address</label>
              <input
                id="registerEmail"
                type="email"
                {...register("email", { required: true })}
                placeholder="you@email.com"
                className={inputClass}
                required
              />
            </div>

            {/* Password */}
            <div className={formGroup}>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input
                  id="registerPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 8 })}
                  placeholder="Min. 8 characters"
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

            {/* Profile Picture */}
            <div className={formGroup}>
              <label className={labelClass}>Profile Picture (Optional)</label>
              <input
                id="profilePic"
                type="file"
                accept="image/png, image/jpeg"
                {...profilePicRegister}
                className="hidden"
                onChange={(e) => {
                  profilePicOnChange(e);
                  const file = e.target.files[0];
                  if (file) {
                    if (!["image/jpeg", "image/png"].includes(file.type)) {
                      setError("Only JPG or PNG allowed");
                      return;
                    }
                    if (file.size > 2 * 1024 * 1024) {
                      setError("File size must be less than 2MB");
                      return;
                    }
                    setPreview(URL.createObjectURL(file));
                    setError(null);
                  }
                }}
              />

              {preview ? (
                <div className="flex items-center gap-4 p-4 bg-[#F8F6F0] rounded-xl border border-[#E5DDD0]">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#DDA15E] shadow"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#283618]">Photo selected</p>
                    <p className="text-xs text-[#9CA3AF]">Looks great!</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-200 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="profilePic"
                  className="flex flex-col items-center justify-center w-full px-4 py-5 border-2 border-dashed border-[#E5DDD0] rounded-xl bg-[#F8F6F0] hover:border-[#606C38] hover:bg-white transition-all duration-200 cursor-pointer"
                >
                  <span className="text-3xl mb-2">📸</span>
                  <span className="text-sm font-medium text-[#606C38]">
                    Upload a photo
                  </span>
                  <p className="text-xs text-[#9CA3AF] mt-1">PNG or JPG, max 2MB</p>
                </label>
              )}
            </div>

            {/* Submit */}
            <button
              id="registerSubmit"
              type="submit"
              disabled={loading}
              className="w-full bg-[#606C38] text-white font-semibold py-3 rounded-xl hover:bg-[#283618] transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="border-t border-[#E5DDD0] my-6" />

          <p className="text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className={`${linkClass} font-semibold hover:underline`}
            >
              Sign in
            </NavLink>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-[#9CA3AF]">
          <NavLink to="/" className="hover:text-[#606C38] transition-colors">
            ← Back to home
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;