import axios from "axios";

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Centralized Axios instance for all API calls
 * Includes CORS credentials support by default
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * Request interceptor for adding auth tokens or logging
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add any custom headers or auth tokens here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Could trigger logout action here
      console.warn("Unauthorized - Please login again");
    }
    return Promise.reject(error);
  }
);

// ==================== Common API Routes ====================
export const commonAPI = {
  login: (credentials) => apiClient.post("/common-api/login", credentials),
  logout: () => apiClient.get("/common-api/logout"),
  checkAuth: () => apiClient.get("/common-api/check-auth"),
};

// ==================== User API Routes ====================
export const userAPI = {
  register: (userData) => apiClient.post("/user-api/users", userData),
  getAllArticles: () => apiClient.get("/user-api/articles"),
  getArticleById: (id) => apiClient.get(`/user-api/article/${id}`),
  postComment: (articleId, commentObj) =>
    apiClient.post(`/user-api/comment/${articleId}`, commentObj),
};

// ==================== Author API Routes ====================
export const authorAPI = {
  register: (userData) => apiClient.post("/author-api/users", userData),
  createArticle: (articleData) =>
    apiClient.post("/author-api/article", articleData),
  getAuthorArticles: (authorId) =>
    apiClient.get(`/author-api/articles/${authorId}`),
  getArticleById: (id) => apiClient.get(`/author-api/article/${id}`),
  updateArticle: (id, articleData) =>
    apiClient.put(`/author-api/article/${id}`, articleData),
  deleteArticle: (id) => apiClient.delete(`/author-api/article/${id}`),
  restoreArticle: (id) => apiClient.put(`/author-api/article/${id}/restore`),
};

// Export raw apiClient for special cases
export default apiClient;
