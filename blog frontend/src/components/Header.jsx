import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useState, useEffect, useRef } from "react";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/login");
  };

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR": return "/author-profile";
      case "ADMIN": return "/admin-profile";
      default: return "/user-profile";
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkBase = "text-sm font-medium transition-colors duration-200";
  const activeLink = `${linkBase} text-[#606C38] font-bold`;
  const inactiveLink = `${linkBase} text-[#6B7280] hover:text-[#606C38]`;

  return (
    <nav
      ref={menuRef}
      className="bg-white/95 backdrop-blur-md border-b border-[#E5DDD0] sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-[#606C38] tracking-tight hover:text-[#283618] transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-2xl">✦</span>
          MyBlog
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? activeLink : inactiveLink}>
              Home
            </NavLink>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="text-sm font-semibold bg-[#606C38] text-white px-5 py-2 rounded-xl hover:bg-[#283618] transition-all duration-200 hover:shadow-md"
                >
                  Sign In
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) => `${isActive ? activeLink : inactiveLink} flex items-center gap-2`}
                >
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#DDA15E]"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#606C38] to-[#283618] text-white text-xs font-bold flex items-center justify-center">
                      {user?.firstName?.[0]?.toUpperCase() || "U"}
                    </span>
                  )}
                  <span>{user?.firstName}</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-4 py-2 rounded-lg text-[#6B7280] hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#F8F6F0] transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#283618] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#283618] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#283618] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E5DDD0] bg-white px-4 py-4 space-y-1 shadow-lg">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-[#F8F6F0] text-[#606C38] font-bold" : "text-[#6B7280] hover:bg-[#F8F6F0] hover:text-[#606C38]"}`}
          >
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-[#F8F6F0] text-[#606C38] font-bold" : "text-[#6B7280] hover:bg-[#F8F6F0] hover:text-[#606C38]"}`}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block mt-2 text-center bg-[#606C38] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#283618] transition-all"
              >
                Sign In
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink
                to={getProfilePath()}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-[#F8F6F0] text-[#606C38] font-bold" : "text-[#6B7280] hover:bg-[#F8F6F0] hover:text-[#606C38]"}`}
              >
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt={user.firstName} className="w-7 h-7 rounded-full object-cover border-2 border-[#DDA15E]" />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-[#606C38] text-white text-xs font-bold flex items-center justify-center">
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
                {user?.firstName}'s Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
