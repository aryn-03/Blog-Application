import { useParams, useLocation, useNavigate, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { userAPI, authorAPI } from "../services/apiClient.js";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";

import {
  loadingClass,
  errorClass,
  inputClass,
  primaryBtn,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (article) return;
    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await userAPI.getArticleById(id);
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });

  const formatShortDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });

  const deleteArticle = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await authorAPI.deleteArticle(id);
      toast.success("Article deleted successfully");
      navigate("/author-profile");
    } catch (err) {
      toast.error("Failed to delete article");
    }
  };

  const restoreArticle = async () => {
    try {
      const res = await authorAPI.restoreArticle(id);
      setArticle(res.data.payload);
      toast.success("Article restored successfully");
    } catch (err) {
      toast.error("Failed to restore article");
    }
  };

  const editArticle = () => {
    navigate(`/edit-article/${article._id}`, { state: article });
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) {
      toast.error("Please write a comment");
      return;
    }
    try {
      setCommentLoading(true);
      const res = await userAPI.postComment(id, { comment: commentText });
      setArticle(res.data.payload);
      setCommentText("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-[#606C38] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#606C38] font-medium">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className={errorClass}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-sm text-[#606C38] hover:underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  if (!article) return null;

  const categoryColors = {
    technology: "bg-blue-100 text-blue-700",
    programming: "bg-purple-100 text-purple-700",
    ai: "bg-emerald-100 text-emerald-700",
    "web-development": "bg-orange-100 text-orange-700",
  };
  const catClass =
    categoryColors[article.category] || "bg-[#DDA15E]/20 text-[#BC6C25]";

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#606C38] transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>

        {/* Article Header */}
        <header className="mb-10">
          {/* Category + Status */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${catClass}`}>
              {article.category}
            </span>
            {!article.isArticleActive && (
              <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-600 rounded-full border border-red-200">
                Deleted
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#283618] leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Author Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-b border-[#E5DDD0] py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#606C38] to-[#283618] text-white text-sm font-bold flex items-center justify-center shadow">
                {article.author?.firstName?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-semibold text-[#283618] text-sm">
                  {article.author?.firstName || "Author"}
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  {formatDate(article.createdAt)}
                </p>
              </div>
            </div>

            {/* Read time estimate */}
            <div className="text-xs text-[#9CA3AF] flex items-center gap-1">
              <span>⏱</span>
              <span>{Math.ceil(article.content.split(" ").length / 200)} min read</span>
              <span className="mx-2">•</span>
              <span>{article.comments?.length || 0} comments</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="text-[#283618] leading-[1.9] text-base sm:text-lg whitespace-pre-line mb-16 font-[450]">
          {article.content}
        </article>

        {/* Author Actions (AUTHOR only) */}
        {user?.role === "AUTHOR" && (
          <div className="flex gap-3 mb-12 flex-wrap">
            {article.isArticleActive ? (
              <>
                <button
                  onClick={editArticle}
                  className="inline-flex items-center gap-2 bg-[#606C38] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#283618] transition-all duration-200"
                >
                  ✏️ Edit Article
                </button>
                <button
                  onClick={deleteArticle}
                  className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-all duration-200"
                >
                  🗑️ Delete
                </button>
              </>
            ) : (
              <button
                onClick={restoreArticle}
                className="inline-flex items-center gap-2 bg-[#DDA15E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#BC6C25] transition-all duration-200"
              >
                ↩️ Restore Article
              </button>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-[#E5DDD0] mb-12" />

        {/* Comments Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#283618] mb-8">
            Comments
            <span className="ml-2 text-base font-normal text-[#9CA3AF]">
              ({article.comments?.length || 0})
            </span>
          </h2>

          {/* Comments List */}
          <div className="space-y-4 mb-10">
            {article.comments && article.comments.length > 0 ? (
              article.comments.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-[#E5DDD0] shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DDA15E] to-[#BC6C25] text-white text-xs font-bold flex items-center justify-center">
                        {c.user?.firstName?.[0]?.toUpperCase() || "U"}
                      </div>
                      <p className="font-semibold text-[#283618] text-sm">
                        {c.user?.firstName || "User"}
                      </p>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">
                      {formatShortDate(c.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed pl-10">
                    {c.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-[#E5DDD0]">
                <p className="text-3xl mb-3">💬</p>
                <p className="text-sm text-[#9CA3AF]">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>

          {/* Comment Form — USER only */}
          {user?.role === "USER" ? (
            <div className="bg-white rounded-xl p-6 border border-[#E5DDD0] shadow-sm">
              <h3 className="font-semibold text-[#283618] mb-4 text-sm">
                Share Your Thoughts
              </h3>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                className={`${inputClass} w-full resize-none`}
                placeholder="Write a thoughtful comment..."
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-[#9CA3AF]">
                  {commentText.length} characters
                </p>
                <button
                  onClick={handlePostComment}
                  disabled={commentLoading || !commentText.trim()}
                  className="inline-flex items-center gap-2 bg-[#606C38] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#283618] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {commentLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#DDA15E]/10 to-[#DDA15E]/5 border border-[#DDA15E]/30 rounded-xl p-8 text-center">
              <p className="text-3xl mb-3">✍️</p>
              <p className="font-semibold text-[#283618] mb-2">
                Join the conversation
              </p>
              <p className="text-sm text-[#6B7280] mb-5">
                Sign in as a reader to post comments and engage with the author.
              </p>
              <NavLink
                to="/login"
                className="inline-flex items-center gap-2 bg-[#606C38] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#283618] transition-all duration-200 text-sm"
              >
                Sign In to Comment
              </NavLink>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="border-t border-[#E5DDD0] mt-12 pt-6">
          <p className="text-xs text-[#9CA3AF]">
            Last updated: {formatDate(article.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArticleByID;
