import { useEffect, useState } from "react";
import { authorAPI } from "../services/apiClient.js";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  loadingClass,
  errorClass,
  emptyStateClass,
  tagClass,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "active" | "deleted"

  useEffect(() => {
    if (!user) return;
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await authorAPI.getAuthorArticles(user._id);
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });

  const filtered = articles.filter((a) => {
    if (filter === "active") return a.isArticleActive;
    if (filter === "deleted") return !a.isArticleActive;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-[#606C38] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#606C38] font-medium">Loading your articles...</p>
      </div>
    );
  }

  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#E5DDD0]">
        <p className="text-5xl mb-4">📝</p>
        <p className="text-lg font-semibold text-[#283618] mb-2">
          No articles yet
        </p>
        <p className="text-sm text-[#9CA3AF] mb-6">
          Start writing and share your ideas with the community!
        </p>
        <button
          onClick={() => navigate("/author-profile/write-article")}
          className="inline-flex items-center gap-2 bg-[#606C38] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#283618] transition-all duration-200 text-sm"
        >
          Write Your First Article →
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-[#283618]">My Articles</h2>
          <p className="text-sm text-[#9CA3AF] mt-0.5">{articles.length} total articles</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-[#F8F6F0] border border-[#E5DDD0] rounded-xl p-1 self-start sm:self-auto">
          {["all", "active", "deleted"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                filter === f
                  ? "bg-white text-[#606C38] shadow-sm border border-[#E5DDD0]"
                  : "text-[#6B7280] hover:text-[#606C38]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DDD0]">
          <p className="text-sm text-[#9CA3AF]">
            No {filter} articles found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article) => (
            <div
              key={article._id}
              className={`${articleCardClass} p-6 group cursor-pointer relative`}
              onClick={() => openArticle(article)}
            >
              {/* Deleted badge */}
              {!article.isArticleActive && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-600 rounded-full border border-red-200">
                    Deleted
                  </span>
                </div>
              )}

              {/* Category */}
              <div className="mb-3">
                <span className={tagClass}>{article.category}</span>
              </div>

              {/* Title */}
              <h3
                className={`${articleTitle} group-hover:text-[#606C38] transition-colors line-clamp-2 mb-2`}
              >
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className={`${articleExcerpt} line-clamp-2 mb-4`}>
                {article.content.slice(0, 100)}...
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-3 border-t border-[#F0EBE0]">
                <span>{formatDate(article.createdAt)}</span>
                <span>
                  {article.comments?.length || 0}{" "}
                  {article.comments?.length === 1 ? "comment" : "comments"}
                </span>
              </div>

              {/* Read more */}
              <button
                className="mt-3 text-sm font-semibold text-[#606C38] hover:text-[#BC6C25] transition-colors inline-flex items-center gap-1 group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openArticle(article);
                }}
              >
                View Article
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorArticles;
