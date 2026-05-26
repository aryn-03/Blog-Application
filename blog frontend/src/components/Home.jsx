import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";

const features = [
  {
    icon: "✍️",
    title: "Write & Publish",
    desc: "Create compelling articles with a clean, intuitive editor. Publish your thoughts and reach an engaged audience.",
    badge: "For Authors",
    color: "from-[#606C38]/10 to-[#606C38]/5",
    border: "border-[#606C38]/20",
  },
  {
    icon: "📖",
    title: "Discover & Learn",
    desc: "Browse curated articles on technology, programming, and innovation. Find voices that inspire you.",
    badge: "For Readers",
    color: "from-[#DDA15E]/10 to-[#DDA15E]/5",
    border: "border-[#DDA15E]/20",
  },
  {
    icon: "💬",
    title: "Engage & Connect",
    desc: "Leave thoughtful comments, share feedback, and build meaningful conversations with authors.",
    badge: "Community",
    color: "from-[#BC6C25]/10 to-[#BC6C25]/5",
    border: "border-[#BC6C25]/20",
  },
];

const categories = ["Technology", "Programming", "AI", "Web Development"];

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  return (
    <div className="bg-[#FEFAE0]">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#DDA15E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#606C38]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center relative z-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-full border border-[#E5DDD0] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#DDA15E] animate-pulse" />
            <p className="text-xs font-semibold text-[#283618] uppercase tracking-widest">
              Welcome to MyBlog
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#283618] tracking-tight leading-[1.1] mb-6">
            Read, Write
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#606C38] to-[#DDA15E]">
              &amp; Inspire
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed mb-10">
            A beautifully designed space for authors to share their insights and readers to discover stories across technology, programming, AI, and web development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/register"
                  className="inline-flex items-center justify-center bg-[#606C38] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#283618] transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 text-base"
                >
                  Get Started Free
                  <span className="ml-2">→</span>
                </NavLink>
                <NavLink
                  to="/login"
                  className="inline-flex items-center justify-center bg-white border-2 border-[#E5DDD0] text-[#283618] font-semibold px-8 py-3.5 rounded-xl hover:border-[#606C38] hover:bg-[#F8F6F0] transition-all duration-200 text-base"
                >
                  Sign In
                </NavLink>
              </>
            ) : (
              <NavLink
                to={user?.role === "AUTHOR" ? "/author-profile" : "/user-profile"}
                className="inline-flex items-center justify-center bg-[#606C38] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#283618] transition-all duration-200 hover:shadow-lg text-base"
              >
                Go to Your Dashboard
                <span className="ml-2">→</span>
              </NavLink>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-medium text-[#606C38] bg-[#606C38]/10 border border-[#606C38]/20 px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#DDA15E] uppercase tracking-widest mb-3">
            What You Can Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#283618] tracking-tight">
            Everything you need
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`bg-gradient-to-br ${f.color} border ${f.border} rounded-2xl p-7 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-4xl mb-5">{f.icon}</div>
              <h3 className="text-lg font-bold text-[#283618] mb-3">{f.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-5">{f.desc}</p>
              <span className="inline-block text-xs font-bold text-[#606C38] bg-white border border-[#E5DDD0] px-3 py-1 rounded-full uppercase tracking-wider">
                {f.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      {!isAuthenticated && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-br from-[#283618] to-[#606C38] rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#DDA15E]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <p className="text-[#DDA15E] text-xs font-bold uppercase tracking-widest mb-4">
                Start Today
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of writers and readers sharing their passion for great content.
              </p>
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center bg-white text-[#606C38] font-bold px-8 py-3.5 rounded-xl hover:bg-[#FEFAE0] transition-all duration-200 hover:shadow-lg text-base"
              >
                Create Free Account
                <span className="ml-2">→</span>
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;