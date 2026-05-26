import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";

function Footer() {
  const currentYear = new Date().getFullYear();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  return (
    <footer className="bg-[#283618] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#DDA15E] text-2xl">✦</span>
              <h3 className="text-lg font-bold text-white">MyBlog</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              A modern platform for writers and readers to share ideas and inspire communities worldwide.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-[#DDA15E] uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink to="/" className="text-white/60 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <NavLink to="/register" className="text-white/60 hover:text-white transition-colors">
                      Get Started
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="text-white/60 hover:text-white transition-colors">
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <li>
                  <NavLink
                    to={user?.role === "AUTHOR" ? "/author-profile" : "/user-profile"}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    My Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h4 className="text-xs font-semibold text-[#DDA15E] uppercase tracking-widest mb-4">
              Built With
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>React + Vite</li>
              <li>TailwindCSS v4</li>
              <li>Node.js + Express</li>
              <li>MongoDB Atlas</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} MyBlog. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Designed with care & passion ✦
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;