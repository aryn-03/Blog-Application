import { useForm } from "react-hook-form";
import { useState } from "react";
import { authorAPI } from "../services/apiClient.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  formGroup,
  labelClass,
  inputClass,
  errorClass,
  loadingClass,
} from "../styles/common";

const CATEGORIES = [
  { value: "technology", label: "🚀 Technology" },
  { value: "programming", label: "💻 Programming" },
  { value: "ai", label: "🤖 Artificial Intelligence" },
  { value: "web-development", label: "🌐 Web Development" },
];

function WriteArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: { title: "", category: "", content: "" } });

  const contentValue = watch("content", "");

  const submitArticle = async (articleObj) => {
    setLoading(true);
    articleObj.author = currentUser._id;
    try {
      await authorAPI.createArticle(articleObj);
      toast.success("Article published successfully!");
      reset();
      navigate("/author-profile/articles");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-[#606C38] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#606C38] font-medium">Publishing your article...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#DDA15E] uppercase tracking-widest mb-2">
          New Article
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#283618]">
          Publish Your Article
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Share your thoughts and inspire the community.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5DDD0]">
        <form onSubmit={handleSubmit(submitArticle)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Article Title</label>
            <input
              type="text"
              className={`${inputClass} ${errors.title ? "border-red-400 focus:border-red-400" : ""}`}
              placeholder="e.g., Getting Started with React Hooks"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" },
                maxLength: { value: 100, message: "Title must be less than 100 characters" },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1.5">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select
              className={`${inputClass} ${errors.category ? "border-red-400" : ""}`}
              {...register("category", { required: "Please select a category" })}
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1.5">{errors.category.message}</p>
            )}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <div className="flex items-center justify-between mb-2.5">
              <label className={labelClass} style={{ marginBottom: 0 }}>
                Article Content
              </label>
              <span className="text-xs text-[#9CA3AF]">
                {contentValue.length} chars
              </span>
            </div>
            <textarea
              rows="14"
              className={`${inputClass} resize-y ${errors.content ? "border-red-400" : ""}`}
              placeholder="Write your article content here... Share your knowledge, ideas, and insights with the community."
              {...register("content", {
                required: "Content is required",
                minLength: { value: 50, message: "Content must be at least 50 characters" },
              })}
            />
            {errors.content ? (
              <p className="text-red-500 text-xs mt-1.5">{errors.content.message}</p>
            ) : (
              <p className="text-xs text-[#9CA3AF] mt-1.5">
                Tip: Write naturally and proofread before publishing.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#606C38] text-white font-semibold py-3 rounded-xl hover:bg-[#283618] transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Publish Article ✦
            </button>
            <button
              type="button"
              onClick={() => navigate("/author-profile/articles")}
              className="flex-1 bg-white text-[#606C38] font-semibold py-3 rounded-xl border-2 border-[#606C38] hover:bg-[#F8F6F0] transition-all duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Tips Card */}
      <div className="mt-6 bg-[#DDA15E]/10 border border-[#DDA15E]/30 rounded-2xl p-5">
        <p className="text-sm font-semibold text-[#283618] mb-2">✦ Writing Tips</p>
        <ul className="text-xs text-[#6B7280] space-y-1.5">
          <li>• Use a clear, attention-grabbing title.</li>
          <li>• Structure content with short paragraphs for readability.</li>
          <li>• Add examples, use cases, or code snippets where relevant.</li>
          <li>• Proofread carefully before publishing.</li>
        </ul>
      </div>
    </div>
  );
}

export default WriteArticle;