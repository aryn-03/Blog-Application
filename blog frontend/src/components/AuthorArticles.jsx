import { useEffect, useState } from "react";
import { authorAPI } from "../services/apiClient.js";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {
      setLoading(true);

      try {
        const res = await authorAPI.getAuthorArticles(user._id);

        setArticles(res.data.payload);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any articles yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {articles.map((article) => (
        <div key={article._id} className={`${articleCardClass} flex flex-col`}>
          <div className="flex flex-col gap-2">
            <p className={articleMeta}>{article.category}</p>

            <p className={articleTitle}>{article.title}</p>

            <p className={articleExcerpt}>{article.content.slice(0, 60)}...</p>

            <p className={articleMeta}>{formatDate(article.createdAt)}</p>
          </div>

          <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => openArticle(article)}>
            Read Article →
          </button>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
