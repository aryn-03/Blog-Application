// src/styles/common.js
// MODERN MINIMALIST DESIGN SYSTEM
// Premium SaaS-inspired theme with elegant typography and subtle interactions
// Colors: Dark Olive Green #606C38, Deep Forest Green #283618, Cream #FEFAE0, Sand Orange #DDA15E, Burnt Brown #BC6C25

// ──────────── COLORS (Design Tokens) ────────────────
export const colors = {
  primary: "#606C38",      // Dark Olive Green
  dark: "#283618",         // Deep Forest Green
  background: "#FEFAE0",   // Cream
  accent: "#DDA15E",       // Sand Orange
  hover: "#BC6C25",        // Burnt Brown
  light: "#F8F6F0",        // Soft cream variant
  white: "#FFFFFF",
  text: "#283618",
  textMuted: "#6B7280",
  border: "#E5DDD0",
  error: "#DC2626",
  success: "#059669",
};

// ──────────── LAYOUT ────────────────────────────────
export const pageBackground = "bg-[#FEFAE0] min-h-screen";
export const pageWrapper = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16";
export const section = "mb-12 sm:mb-16";
export const container = "w-full max-w-5xl mx-auto";

// ──────────── CARDS ─────────────────────────────────
export const cardClass =
  "bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#E5DDD0]";
export const cardHover = "hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:scale-105 hover:translate-y-[-2px]";

// ──────────── TYPOGRAPHY ────────────────────────────
export const pageTitleClass = "text-4xl sm:text-5xl lg:text-6xl font-bold text-[#283618] tracking-tight leading-tight mb-4";
export const headingClass = "text-3xl sm:text-4xl font-bold text-[#283618] tracking-tight mb-2";
export const subHeadingClass = "text-xl sm:text-2xl font-semibold text-[#283618] mb-2";
export const heading3 = "text-lg sm:text-xl font-semibold text-[#283618]";
export const bodyText = "text-base text-[#6B7280] leading-relaxed";
export const mutedText = "text-sm text-[#9CA3AF]";
export const smallText = "text-xs sm:text-sm text-[#9CA3AF]";
export const linkClass = "text-[#606C38] hover:text-[#BC6C25] transition-colors duration-200 font-medium";

// ──────────── BUTTONS ───────────────────────────────
export const primaryBtn =
  "inline-flex items-center justify-center bg-[#606C38] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#283618] transition-all duration-200 cursor-pointer text-sm sm:text-base tracking-normal hover:shadow-lg hover:scale-105 active:scale-95";

export const secondaryBtn =
  "inline-flex items-center justify-center bg-white border-2 border-[#606C38] text-[#606C38] font-semibold px-6 py-3 rounded-xl hover:bg-[#F8F6F0] transition-all duration-200 cursor-pointer text-sm sm:text-base";

export const accentBtn =
  "inline-flex items-center justify-center bg-[#DDA15E] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#BC6C25] transition-all duration-200 cursor-pointer text-sm sm:text-base hover:shadow-lg";

export const ghostBtn =
  "inline-flex items-center justify-center text-[#606C38] font-medium hover:text-[#BC6C25] transition-colors duration-200 cursor-pointer text-sm sm:text-base hover:bg-[#FEFAE0] px-4 py-2 rounded-lg";

export const dangerBtn =
  "inline-flex items-center justify-center bg-[#DC2626] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#B91C1C] transition-all duration-200 cursor-pointer text-sm sm:text-base";

// ──────────── FORMS ─────────────────────────────────
export const formCard = "bg-white rounded-3xl p-8 sm:p-12 max-w-md sm:max-w-xl mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E5DDD0]";
export const formTitle = "text-2xl sm:text-3xl font-bold text-[#283618] tracking-tight text-center mb-2";
export const formSubtitle = "text-sm sm:text-base text-[#6B7280] text-center mb-8";
export const labelClass = "text-sm font-semibold text-[#283618] mb-2.5 block";
export const inputClass =
  "w-full bg-[#F8F6F0] border-2 border-[#E5DDD0] rounded-xl px-4 py-3 text-[#283618] text-sm sm:text-base placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#606C38] focus:ring-2 focus:ring-[#606C38]/20 transition-all duration-200";
export const inputError = "border-2 border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20";
export const formGroup = "mb-6";
export const submitBtn =
  "w-full bg-[#606C38] text-white font-semibold py-3 rounded-xl hover:bg-[#283618] transition-all duration-200 cursor-pointer mt-4 text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95";

// ──────────── NAVIGATION ────────────────────────────
export const navbarClass =
  "bg-white/95 backdrop-blur-md border-b border-[#E5DDD0] px-4 sm:px-8 h-16 sm:h-20 flex items-center sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]";
export const navContainerClass = "max-w-7xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-lg sm:text-xl font-bold text-[#606C38] tracking-tight";
export const navLinksClass = "hidden md:flex items-center gap-8";
export const navLinkClass = "text-sm text-[#6B7280] hover:text-[#606C38] transition-colors duration-200 font-medium";
export const navLinkActiveClass = "text-sm text-[#606C38] font-bold border-b-2 border-[#606C38]";

// ──────────── ARTICLE / BLOG ────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8";
export const articleCardClass =
  "bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-300 border border-[#E5DDD0] flex flex-col cursor-pointer hover:scale-105 hover:translate-y-[-4px]";
export const articleTitle = "text-lg sm:text-xl font-bold text-[#283618] leading-snug tracking-tight";
export const articleExcerpt = "text-sm sm:text-base text-[#6B7280] leading-relaxed";
export const articleMeta = "text-xs sm:text-sm text-[#9CA3AF]";
export const articleBody = "text-base text-[#6B7280] leading-[1.8] max-w-3xl";
export const timestampClass = "text-xs sm:text-sm text-[#9CA3AF] flex items-center gap-2";
export const tagClass = "inline-block text-xs font-semibold text-white bg-[#DDA15E] px-3 py-1 rounded-full w-fit";

// ──────────── ARTICLE PAGE ─────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16";
export const articleHeader = "mb-10 flex flex-col gap-4";
export const articleCategory = "text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#DDA15E]";
export const articleMainTitle = "text-3xl sm:text-4xl lg:text-5xl font-bold text-[#283618] leading-tight tracking-tight";
export const articleAuthorRow =
  "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-b border-[#E5DDD0] py-6 text-sm text-[#6B7280]";
export const authorInfo = "flex items-center gap-2 font-semibold text-[#283618]";
export const articleContent = "text-[#283618] leading-[1.9] text-base sm:text-lg whitespace-pre-line mt-8";
export const articleFooter = "border-t border-[#E5DDD0] mt-12 pt-8 text-sm text-[#9CA3AF]";

// ──────────── ARTICLE ACTIONS ─────────────────────
export const articleActions = "flex gap-3 mt-8 flex-wrap";
export const editBtn = "bg-[#606C38] text-white text-sm px-6 py-2.5 rounded-lg hover:bg-[#283618] transition-all duration-200 font-semibold";
export const deleteBtn = "bg-[#DC2626] text-white text-sm px-6 py-2.5 rounded-lg hover:bg-[#B91C1C] transition-all duration-200 font-semibold";

// ──────────── DASHBOARD ────────────────────────────
export const dashboardContainer = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12";
export const dashboardGrid = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6";
export const statCard = "bg-white rounded-2xl p-6 border border-[#E5DDD0] shadow-sm";
export const statNumber = "text-2xl sm:text-3xl font-bold text-[#606C38]";
export const statLabel = "text-sm text-[#9CA3AF] mt-1";

// ──────────── FEEDBACK / ALERTS ────────────────────
export const errorClass =
  "bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] rounded-xl px-4 py-3 text-sm";
export const successClass =
  "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] rounded-xl px-4 py-3 text-sm";
export const warningClass =
  "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] rounded-xl px-4 py-3 text-sm";
export const infoClass =
  "bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] rounded-xl px-4 py-3 text-sm";
export const loadingClass = "text-[#606C38]/60 text-sm animate-pulse text-center py-12";
export const emptyStateClass = "text-center text-[#9CA3AF] py-16 text-base";

// ──────────── DIVIDER ───────────────────────────────
export const divider = "border-t border-[#E5DDD0] my-8 sm:my-12";
