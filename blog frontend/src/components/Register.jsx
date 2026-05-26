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
  loadingClass,
} from "../styles/common";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { userAPI, authorAPI } from "../services/apiClient.js";
import { useNavigate } from "react-router";

function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); //const []=useState()

  const { onChange: profilePicOnChange, ...profilePicRegister } = register("profilePic");

  const onUserRegister = async (newUser) => {
    setLoading(true);
    try {
      // Create form data object
      const formData = new FormData();
      //get user object
      let { role, profilePic, ...userObj } = newUser;
      //add all fields except profilePic to FormData object
      Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
      });
      // add profilePic to Formdata object
      if (profilePic && profilePic[0]) {
        formData.append("profilePic", profilePic[0]);
      }

      if (role === "user") {
        //make API req to user-api
        let resObj = await userAPI.register(formData);
        if (resObj.status === 201) {
          //navigate to login
          navigate("/login");
        }
      }
      if (role === "author") {
        //make API req to author-api
        let resObj = await authorAPI.register(formData);
        console.log("res obj is ", resObj);
        if (resObj.status === 201) {
          //navigate to login
          navigate("/login");
        }
      }
    } catch (err) {
      // console.log("err is ", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  //cleanup (remove preview img from browser memeory)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  //loading
  if (loading === true) {
    return <p className={loadingClass}></p>;
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Create an Account</h2>
        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserRegister)}>
          {/* Role Selection */}
          <div className="mb-5">
            <p className={labelClass}>Register as</p>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("role")}
                  id="user"
                  value="user"
                  className="accent-violet-600 w-4 h-4"
                />
                <span className="text-sm text-stone-700 font-medium">User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("role")}
                  id="author"
                  value="author"
                  className="accent-violet-600 w-4 h-4"
                />
                <span className="text-sm text-stone-700 font-medium">Author</span>
              </label>
            </div>
          </div>

          <div className={divider} />

          {/* First & Last Name — side by side */}
          <div className="sm:flex gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>First Name</label>
              <input type="text" {...register("firstName")} placeholder="First name" className={inputClass} />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Last Name</label>
              <input type="text" {...register("lastName")} placeholder="Last name" className={inputClass} />
            </div>
          </div>

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
              placeholder="Min. 8 characters"
              className={inputClass}
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                id="registerShowPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
                className="accent-violet-600 w-4 h-4"
              />
              <label htmlFor="registerShowPassword" className="text-sm text-stone-600">
                Show password
              </label>
            </div>
          </div>

          {/* Profile Image URL */}
          <div className={formGroup}>
            <label className={labelClass}>Profile Image (optional)</label>
            <input
              id="profilePic"
              type="file"
              accept="image/png, image/jpeg"
              {...profilePicRegister}
              className="hidden"
              onChange={(e) => {
                // call react-hook-form's onChange first
                profilePicOnChange(e);

                //get image file
                const file = e.target.files[0];
                // validation for image format
                if (file) {
                  if (!["image/jpeg", "image/png"].includes(file.type)) {
                    setError("Only JPG or PNG allowed");
                    return;
                  }
                  //validation for file size
                  if (file.size > 2 * 1024 * 1024) {
                    setError("File size must be less than 2MB");
                    return;
                  }
                  //Converts file → temporary browser URL(create preview URL)
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                  setError(null);
                }
              }}
            />
            <label
              htmlFor="profilePic"
              className="inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 cursor-pointer"
            >
              Upload profile image
            </label>
            <p className="text-sm text-stone-500 mt-2">PNG or JPG, max 2MB.</p>

            {/* Render preview image here */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className={submitBtn}>
            Create Account
          </button>
        </form>

        {/* Footer note */}
        <p className={`${mutedText} text-center mt-5`}>
          Already have an account?{" "}
          <NavLink to="/login" className="text-violet-600 hover:text-violet-500 font-medium">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;


//res.data
//err.response.