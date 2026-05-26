import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { userAPI, authorAPI } from "../services/apiClient.js";
import { useAuth } from "../store/authStore";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
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

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete article
  const deleteArticle = async () => {
    try {
      await authorAPI.deleteArticle(id);

      navigate("/author-profile");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const restoreArticle = async () => {
    try {
      const res = await authorAPI.restoreArticle(id);
      setArticle(res.data.payload);
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {article.author?.firstName || "Author"}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* Comments */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Comments</h3>
        {article.comments && article.comments.length > 0 ? (
          article.comments.map((c, idx) => (
            <div key={idx} style={{ marginBottom: 8, padding: 8, border: '1px solid #eee' }}>
              <strong>{c.user?.firstName || 'User'}</strong>
              <div>{c.comment}</div>
            </div>
          ))
        ) : (
          <div>No comments yet</div>
        )}

        {/* Comment form for logged-in users with role USER */}
        {user?.role === "USER" ? (
          <div style={{ marginTop: 12 }}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: 8 }}
              placeholder="Write a comment..."
            />
            <button
              onClick={async () => {
                if (!commentText.trim()) return;
                try {
                  setLoading(true);
                  const res = await userAPI.postComment(id, { comment: commentText });
                  setArticle(res.data.payload);
                  setCommentText("");
                } catch (err) {
                  setError(err.response?.data?.message || 'Failed to post comment');
                } finally {
                  setLoading(false);
                }
              }}
              style={{ marginTop: 8 }}
            >
              Post Comment
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 12 }}>Login as a user to post comments.</div>
        )}
      </div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          {article.isArticleActive ? (
            <>
              <button className={editBtn} onClick={() => editArticle(article)}>
                Edit
              </button>

              <button className={deleteBtn} onClick={deleteArticle}>
                Delete
              </button>
            </>
          ) : (
            <button className={editBtn} onClick={restoreArticle}>
              Restore
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;
