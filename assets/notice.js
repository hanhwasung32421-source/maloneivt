function getParam(name) {
  const url = new URL(location.href);
  return url.searchParams.get(name);
}

async function loadNotices(basePath) {
  const res = await fetch(basePath + "data/notices.json", { cache: "no-store" });
  if (!res.ok) throw new Error("공지 데이터를 불러오지 못했습니다.");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function sortNotices(list) {
  return [...list].sort((a, b) => {
    const ap = a?.pinned ? 1 : 0;
    const bp = b?.pinned ? 1 : 0;
    if (ap !== bp) return bp - ap;
    const ad = String(a?.date || "");
    const bd = String(b?.date || "");
    if (ad !== bd) return bd.localeCompare(ad);
    return String(b?.id || "").localeCompare(String(a?.id || ""));
  });
}

function renderList(list) {
  const wrap = document.querySelector("[data-notice-list]");
  if (!wrap) return;
  wrap.innerHTML = "";

  if (!list.length) {
    wrap.innerHTML =
      '<div class="border border-slate-200 rounded-2xl p-6 text-slate-600 bg-white">등록된 공지사항이 없습니다.</div>';
    return;
  }

  const frag = document.createDocumentFragment();
  list.forEach((n) => {
    const a = document.createElement("a");
    a.className =
      "block border border-slate-200 rounded-2xl p-5 bg-white hover:shadow-md transition-shadow";
    a.href = "./detail.html?id=" + encodeURIComponent(n.id);

    const left = document.createElement("div");
    const title = document.createElement("b");
    title.className = "block text-base font-black text-slate-900";
    title.textContent = n.title || "(제목 없음)";
    const meta = document.createElement("small");
    meta.className = "block text-xs text-slate-500 mt-2";
    meta.textContent = (n.date || "").replaceAll("-", ".") + "  ·  ID " + (n.id || "");
    left.appendChild(title);
    left.appendChild(meta);

    a.appendChild(left);
    if (n.pinned) {
      const pin = document.createElement("span");
      pin.className = "badge-pin mt-3";
      pin.textContent = "고정";
      a.appendChild(pin);
    }

    frag.appendChild(a);
  });
  wrap.appendChild(frag);
}

function renderDetail(n) {
  const titleEl = document.querySelector("[data-notice-title]");
  const metaEl = document.querySelector("[data-notice-meta]");
  const contentEl = document.querySelector("[data-notice-content]");
  if (!titleEl || !metaEl || !contentEl) return;

  if (!n) {
    titleEl.textContent = "공지사항을 찾을 수 없습니다.";
    metaEl.textContent = "";
    contentEl.textContent = "주소가 올바른지 확인해 주세요.";
    return;
  }

  titleEl.textContent = n.title || "(제목 없음)";
  metaEl.textContent = (n.date || "").replaceAll("-", ".") + "  ·  ID " + (n.id || "");

  const lines = Array.isArray(n.content) ? n.content : [String(n.content || "")];
  contentEl.textContent = lines.join("\n");
}

async function bootNoticeList() {
  const basePath = document.body.getAttribute("data-base") || "../";
  const notices = await loadNotices(basePath);
  renderList(sortNotices(notices));
}

async function bootNoticeDetail() {
  const basePath = document.body.getAttribute("data-base") || "../";
  const id = getParam("id");
  const notices = await loadNotices(basePath);
  const found = notices.find((n) => String(n.id) === String(id));
  renderDetail(found);
}

document.addEventListener("DOMContentLoaded", () => {
  const mode = document.body.getAttribute("data-notice-mode");
  if (mode === "list") bootNoticeList().catch((e) => console.error(e));
  if (mode === "detail") bootNoticeDetail().catch((e) => console.error(e));
});
