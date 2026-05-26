import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { userAPI } from "../services/apiClient.js";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleBody,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  headingClass,
  mutedText,
  primaryBtn,
  divider,
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const user = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await userAPI.getAllArticles();

        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div>
      {error && <p className={errorClass}>{error}</p>}

      {/* User Info Card */}
      <div className="bg-[#f5f5f7] rounded-2xl p-7 mt-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={user.firstName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#d2d2d7]"
            />
          ) : (
            <span className="w-16 h-16 rounded-full bg-[#0066cc] text-white text-xl font-bold flex items-center justify-center">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </span>
          )}
          <div>
            <p className={headingClass}>
              {user?.firstName} {user?.lastName}
            </p>
            <p className={mutedText}>{user?.email}</p>
            <span className="inline-block mt-1.5 text-[0.65rem] font-semibold text-[#0066cc] uppercase tracking-widest bg-[#0066cc]/[0.08] px-2.5 py-0.5 rounded-full">
              {user?.role}
            </span>
          </div>
        </div>
        <button className={primaryBtn} onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div className={articleCardClass} key={articleObj._id}>
            <div className="flex flex-col h-full">
              {/* Top Content */}
              <div>
                <p className={articleTitle}>{articleObj.title}</p>

                <p>{articleObj.content.slice(0, 20)}...</p>

                <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
              </div>

              {/* Button at bottom */}
              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleByID(articleObj)}>
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
