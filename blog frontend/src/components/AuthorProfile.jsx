import { NavLink, Outlet } from "react-router";
import {
  pageWrapper,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common";

function AuthorProfile() {
  return (
    <div className={pageWrapper}>
      
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Write Article
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />

    </div>
  );
}

export default AuthorProfile;