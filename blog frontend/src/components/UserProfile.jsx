import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { userAPI } from "../services/apiClient.js";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  loadingClass,
  errorClass,
  timestampClass,
  tagClass,
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

  const formatDateIST = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticle = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  if (loading) return <p className={loadingClass}>Loading your dashboard...</p>;

  const totalComments = articles.reduce(
    (sum, a) => sum + (a.comments?.length || 0),
    0
  );

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      {/* ── Profile Banner ───────────────────────────── */}
      <div className="bg-gradient-to-r from-[#283618] to-[#606C38] py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.firstName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-[#DDA15E] shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DDA15E] text-white text-2xl font-bold flex items-center justify-center shadow-lg border-4 border-white/30">
                {user?.firstName?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="text-[#DDA15E] text-xs font-semibold uppercase tracking-widest mb-1">
                Reader Dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="self-start sm:self-auto text-sm font-semibold px-5 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Articles Available", value: articles.length },
            { label: "Total Comments", value: totalComments },
            { label: "Role", value: "Reader" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl px-6 py-5 border border-[#E5DDD0] shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[#606C38]">
                {stat.value}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Articles ─────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        {error && <p className={`${errorClass} mb-6`}>{error}</p>}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#283618]">
            Discover Articles
          </h2>
          <span className="text-sm text-[#9CA3AF]">
            {articles.length} articles
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E5DDD0]">
            <p className="text-5xl mb-4">📖</p>
            <p className="text-lg font-semibold text-[#283618] mb-2">
              No articles yet
            </p>
            <p className="text-sm text-[#9CA3AF]">
              Check back soon for new content from our authors!
            </p>
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map((articleObj) => (
              <div
                key={articleObj._id}
                className={`${articleCardClass} p-6 group cursor-pointer`}
                onClick={() => navigateToArticle(articleObj)}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className={tagClass}>{articleObj.category}</span>
                  <span className={timestampClass}>
                    {formatDateIST(articleObj.createdAt)}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`${articleTitle} group-hover:text-[#606C38] transition-colors line-clamp-2`}
                >
                  {articleObj.title}
                </h3>

                {/* Excerpt */}
                <p className={`${articleExcerpt} line-clamp-3 my-3`}>
                  {articleObj.content.slice(0, 120)}...
                </p>

                {/* Author & Comments */}
                <div className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-2">
                  <span>by {articleObj.author?.firstName || "Author"}</span>
                  {articleObj.comments?.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{articleObj.comments.length} comments</span>
                    </>
                  )}
                </div>

                {/* Read More */}
                <button
                  className="text-sm font-semibold text-[#606C38] hover:text-[#BC6C25] transition-colors inline-flex items-center gap-1 group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToArticle(articleObj);
                  }}
                >
                  Continue Reading
                  <span className="group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
