import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  divider,
  linkClass,
} from "../styles/common";
import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const navigate = useNavigate();

  // console.log("Is Authenticated :", isAuthenticated);
  // console.log("Current usr", currentUser);
 // console.log("error is ", error);
  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser.role === "USER") {
        toast.success("Loggedin successfully");
        navigate("/user-profile");
      }
      if (currentUser.role === "AUTHOR") {
        navigate("/author-profile");
      }
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Sign In</h2>

        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserLogin)}>
          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input type="email" {...register("email")} placeholder="you@example.com" className={inputClass} />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className={inputClass}
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                id="loginShowPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
                className="accent-violet-600 w-4 h-4"
              />
              <label htmlFor="loginShowPassword" className="text-sm text-stone-600">
                Show password
              </label>
            </div>
          </div>

          {/* Forgot password */}
          {/* <div className="text-right -mt-2 mb-4">
            <a href="/forgot-password" className={`${linkClass} text-xs`}>
              Forgot password?
            </a>
          </div> */}

          {/* Submit */}
          <button type="submit" className={submitBtn}>
            Sign In
          </button>
        </form>

        {/* Footer note */}
        <p className={`${mutedText} text-center mt-5`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
