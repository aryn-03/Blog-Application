import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageWrapper,
  pageTitleClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
  cardClass,
  headingClass,
  mutedText,
  divider,
} from "../styles/common";

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  return (
    <div className={pageWrapper}>
      {/* Hero */}
      <div className="text-center py-16">
        <p className="text-xs font-semibold text-[#0066cc] uppercase tracking-widest mb-4">
          Welcome to MyBlog
        </p>
        <h1 className={`${pageTitleClass} text-center`}>
          Read. Write. Inspire.
        </h1>
        <p className={`${bodyText} text-center max-w-xl mx-auto mt-4`}>
          A clean space for authors to share their ideas and readers to discover
          stories across technology, programming, AI, and web development.
        </p>

        {/* CTA */}
        <div className="flex gap-3 justify-center mt-8">
          {!isAuthenticated ? (
            <>
              <NavLink to="/register" className={primaryBtn}>
                Get Started
              </NavLink>
              <NavLink to="/login" className={secondaryBtn}>
                Sign In
              </NavLink>
            </>
          ) : (
            <NavLink
              to={user?.role === "AUTHOR" ? "/author-profile" : "/user-profile"}
              className={primaryBtn}
            >
              Go to Profile
            </NavLink>
          )}
        </div>
      </div>

      <div className={divider}></div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
        <div className={cardClass}>
          <p className="text-2xl mb-3">✍️</p>
          <p className={headingClass}>Write Articles</p>
          <p className={`${mutedText} mt-2`}>
            Authors can create, edit, and manage their articles with a simple editor.
          </p>
        </div>

        <div className={cardClass}>
          <p className="text-2xl mb-3">📖</p>
          <p className={headingClass}>Read & Explore</p>
          <p className={`${mutedText} mt-2`}>
            Browse articles across categories like technology, AI, and programming.
          </p>
        </div>

        <div className={cardClass}>
          <p className="text-2xl mb-3">💬</p>
          <p className={headingClass}>Engage & Comment</p>
          <p className={`${mutedText} mt-2`}>
            Users can read articles and leave comments to engage with authors.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;