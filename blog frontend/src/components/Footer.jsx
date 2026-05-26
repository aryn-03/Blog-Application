import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="border-t border-[#e8e8ed] bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-center">
          <p className="text-xs text-[#a1a1a6] text-center">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;