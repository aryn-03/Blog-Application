import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { authorAPI } from "../services/apiClient.js";
import { toast } from "react-hot-toast";

import {
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [articleData, setArticleData] = useState(location.state || null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadArticle = async () => {
      if (articleData || !id) return;
      try {
        const res = await authorAPI.getArticleById(id);
        setArticleData(res.data.payload);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to load article");
      }
    };
    loadArticle();
  }, [articleData, id]);

  useEffect(() => {
    if (!articleData) return;
    setValue("title", articleData.title);
    setValue("category", articleData.category);
    setValue("content", articleData.content);
  }, [articleData, setValue]);

  const updateArticle = async (data) => {
    setSaving(true);
    try {
      await authorAPI.updateArticle(id, data);
      toast.success("Article updated successfully!");
      navigate("/author-profile/articles");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update article");
    } finally {
      setSaving(false);
    }
  };

  if (!articleData) {
    return <p className={loadingClass}>Loading article...</p>;
  }

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 px-4">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#6B7280] hover:text-[#606C38] transition-colors flex items-center gap-2 mb-6 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>
        <h1 className={formTitle}>Edit Article</h1>
        <p className="text-sm text-[#6B7280] text-center mt-1">
          Update your article and republish to your readers.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E5DDD0]">
        <form onSubmit={handleSubmit(updateArticle)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Article Title</label>
            <input
              className={inputClass}
              placeholder="Enter article title..."
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className={`${errorClass} mt-2`}>{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select
              className={inputClass}
              {...register("category", { required: "Please select a category" })}
            >
              <option value="">Select a category</option>
              <option value="technology">🚀 Technology</option>
              <option value="programming">💻 Programming</option>
              <option value="ai">🤖 Artificial Intelligence</option>
              <option value="web-development">🌐 Web Development</option>
            </select>
            {errors.category && <p className={`${errorClass} mt-2`}>{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Article Content</label>
            <textarea
              rows="14"
              className={`${inputClass} resize-vertical`}
              placeholder="Write your article content here..."
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && <p className={`${errorClass} mt-2`}>{errors.content.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className={`${submitBtn} disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {saving ? "Saving..." : "Update Article"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/author-profile/articles")}
              className="w-full bg-white text-[#606C38] font-semibold py-3 rounded-xl border-2 border-[#606C38] hover:bg-[#F8F6F0] transition-all duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
