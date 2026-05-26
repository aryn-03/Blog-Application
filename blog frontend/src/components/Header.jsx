import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

    console.log("current user", user);
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {/* Logo */}
        <NavLink to="/" className={navBrandClass}>
          MyBlog
        </NavLink>

        <ul className={navLinksClass}>
          {/* Always visible */}
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Home
            </NavLink>
          </li>

          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) => `${isActive ? navLinkActiveClass : navLinkClass} flex items-center gap-2`}
                >
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.firstName}
                      className="w-7 h-7 rounded-full object-cover border border-[#d2d2d7]"
                    />
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-[#0066cc] text-white text-xs font-semibold flex items-center justify-center">
                      {user?.firstName?.[0]?.toUpperCase() || "U"}
                    </span>
                  )}
                  Profile
                </NavLink>
              </li>

              <li>
                <button className={navLinkClass} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
