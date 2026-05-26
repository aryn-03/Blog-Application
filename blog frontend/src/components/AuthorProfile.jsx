import { NavLink, Outlet } from "react-router";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function AuthorProfile() {
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const tabActive =
    "text-sm font-semibold text-[#606C38] border-b-2 border-[#606C38] pb-3 transition-colors";
  const tabInactive =
    "text-sm font-medium text-[#6B7280] hover:text-[#606C38] pb-3 border-b-2 border-transparent transition-colors";

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-[#283618] to-[#606C38] py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user?.firstName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-[#DDA15E] shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DDA15E] text-white text-2xl font-bold flex items-center justify-center shadow-lg border-4 border-white/30">
                {user?.firstName?.[0]?.toUpperCase() || "A"}
              </div>
            )}
            <div>
              <p className="text-[#DDA15E] text-xs font-semibold uppercase tracking-widest mb-1">
                Author Dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="self-start sm:self-auto text-sm font-semibold px-5 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5DDD0] sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex gap-8">
            <NavLink
              to="articles"
              className={({ isActive }) => (isActive ? tabActive : tabInactive)}
            >
              📄 My Articles
            </NavLink>
            <NavLink
              to="write-article"
              className={({ isActive }) => (isActive ? tabActive : tabInactive)}
            >
              ✍️ Write Article
            </NavLink>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;