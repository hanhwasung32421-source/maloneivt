function setActiveNav() {
  const here = location.pathname.replace(/\\/g, "/");
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").replace(/\\/g, "/");
    if (!href) return;
    const isActive =
      here === href ||
      (href !== "/" && here.endsWith(href)) ||
      (href.includes("/pages/support-notice.html") && here.includes("/pages/notice-detail.html"));
    if (isActive) a.classList.add("active");
  });
}

function setYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setYear();
});

