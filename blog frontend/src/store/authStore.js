import { create } from "zustand";
import { commonAPI } from "../services/apiClient.js";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredWithRole) => {
    const { role, ...userCredObj } = userCredWithRole;
    try {
      //set loading true
      set({ loading: true, error: null });
      //make api call
      let res = await commonAPI.login(userCredObj);
      // console.log("res is ", res);
      //update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload, //{message:"",payload:}
      });
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        //error: err,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      //set loading state
      set({ loading: true, error: null });
      //make logout api req
      await commonAPI.logout();
      //update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      const res = await commonAPI.checkAuth();

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
    }
  },
}));
