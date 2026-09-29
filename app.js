/**
 * 美港股日報 — vanilla JS
 * 所有數字為示範數據，非即時行情
 * Posts load from ./data/posts.json (prefer serving via python3 -m http.server).
 */

/** Last-resort demo data when fetch fails (e.g. file:// without a local server). */
const LAST_RESORT = [
  {
    id: "2026-09-18",
    date: "2026-09-18",
    dateLabel: "2026年9月18日（五）",
    title: "科技股回調後企穩，港股科網板塊跟進美股情緒",
    excerpt:
      "美股科技權重震盪整理，NVDA、TSLA 成交活躍；港股阿里巴巴、中芯國際受資金輪動影響。示範簡報，數字僅供示意。",
    markets: ["us", "hk"],
    source: "demo",
    us: {
      summary:
        "隔夜美股三大指數窄幅震盪。科技權重股在近期回調後出現技術性反彈跡象，市場焦點仍在大型半導體與電動車板塊的成交與資金流向。整體風險偏好偏中性，等待下一輪宏觀數據。",
      themes: ["半導體", "電動車", "利率預期", "科技權重"],
      tickers: [
        { sym: "NVDA", note: "成交活躍，短線震盪後企穩（示範）", chg: "+1.8%", up: true },
        { sym: "TSLA", note: "波動加大，資金關注交付預期（示範）", chg: "-0.6%", up: false },
        { sym: "AAPL", note: "走勢相對平穩，權重支撐指數（示範）", chg: "+0.4%", up: true },
      ],
    },
    hk: {
      summary:
        "港股早段跟隨美股科技情緒開高，其後高開低走整理。科網與半導體相關股份成交靠前；南向資金呈淨流入跡象（示範描述）。整體氣氛審慎樂觀。",
      themes: ["科網", "半導體", "南向資金", "成交輪動"],
      tickers: [
        { sym: "9988.HK", note: "阿里巴巴 — 跟隨美股科網情緒（示範）", chg: "+1.2%", up: true },
        { sym: "0981.HK", note: "中芯國際 — 半導體主題受關注（示範）", chg: "+2.1%", up: true },
        { sym: "0700.HK", note: "騰訊 — 權重股穩定大市（示範）", chg: "+0.5%", up: true },
      ],
    },
  },
  {
    id: "2026-09-17",
    date: "2026-09-17",
    dateLabel: "2026年9月17日（四）",
    title: "美債息率波動牽動估值，港股金融與地產分化",
    excerpt:
      "美債收益率波動令成長股估值承壓；港股銀行股相對抗跌，地產板塊成交偏淡。示範數據。",
    markets: ["us", "hk"],
    source: "demo",
    us: {
      summary:
        "美債息率震盪上行，成長股估值壓力再現。大型科技股普遍回吐部分漲幅，防禦性板塊相對抗跌。市場關注後續通脹與就業數據對政策路徑的暗示。",
      themes: ["美債息率", "成長股估值", "防禦板塊"],
      tickers: [
        { sym: "NVDA", note: "隨息率上升出現回調（示範）", chg: "-1.4%", up: false },
        { sym: "MSFT", note: "雲端與軟件需求仍受關注（示範）", chg: "-0.8%", up: false },
        { sym: "JPM", note: "金融股相對受惠息率環境（示範）", chg: "+0.9%", up: true },
      ],
    },
    hk: {
      summary:
        "港股受外圍息率情緒影響偏弱。銀行及保險股表現分化；地產相關股份成交偏淡。科技股跟隨美股回調，整體交投一般。",
      themes: ["銀行", "地產", "息率傳導"],
      tickers: [
        { sym: "1398.HK", note: "工商銀行 — 金融股相對穩健（示範）", chg: "+0.3%", up: true },
        { sym: "0016.HK", note: "新鴻基地產 — 成交偏淡（示範）", chg: "-1.1%", up: false },
        { sym: "9988.HK", note: "阿里巴巴 — 跟隨美股科網回調（示範）", chg: "-1.5%", up: false },
      ],
    },
  },
  {
    id: "2026-09-16",
    date: "2026-09-16",
    dateLabel: "2026年9月16日（三）",
    title: "風險偏好回升：美股科技領漲，港股南向資金活躍",
    excerpt:
      "美股科技板塊帶動大市；港股科網與消費股受南向資金青睞。示範簡報。",
    markets: ["us", "hk"],
    source: "demo",
    us: {
      summary:
        "風險偏好回升，科技與成長股領漲。半導體與軟件板塊資金流入明顯，市場對中期盈利前景略為樂觀。成交量較前數日放大（示範描述）。",
      themes: ["風險偏好", "半導體", "資金流入"],
      tickers: [
        { sym: "NVDA", note: "領漲半導體板塊（示範）", chg: "+2.6%", up: true },
        { sym: "TSLA", note: "動能股資金回流（示範）", chg: "+1.9%", up: true },
        { sym: "AMZN", note: "電商與雲業務情緒改善（示範）", chg: "+1.1%", up: true },
      ],
    },
    hk: {
      summary:
        "港股受美股帶動高開高走，科網與消費股表現突出。南向資金活躍，成交額較近期均值上升。市場氣氛轉趨積極（示範）。",
      themes: ["南向資金", "科網", "消費"],
      tickers: [
        { sym: "9988.HK", note: "阿里巴巴 — 南向資金青睞（示範）", chg: "+2.4%", up: true },
        { sym: "0981.HK", note: "中芯國際 — 半導體情緒回暖（示範）", chg: "+3.0%", up: true },
        { sym: "3690.HK", note: "美團 — 消費股跟漲（示範）", chg: "+1.7%", up: true },
      ],
    },
  },
  {
    id: "2026-09-15",
    date: "2026-09-15",
    dateLabel: "2026年9月15日（一）",
    title: "週初觀望氣氛濃厚，美港股交投偏淡",
    excerpt:
      "節後首個交易日資金觀望，指數窄幅波動；焦點等待本週數據與企業消息。示範內容。",
    markets: ["us", "hk"],
    source: "demo",
    us: {
      summary:
        "週一美股交投偏淡，指數窄幅整理。投資者等待本週宏觀日程，大型科技股未現明顯方向。整體以觀望為主。",
      themes: ["觀望", "窄幅震盪", "宏觀日程"],
      tickers: [
        { sym: "SPY", note: "大盤 ETF 成交一般（示範）", chg: "+0.1%", up: true },
        { sym: "NVDA", note: "橫盤整理（示範）", chg: "-0.2%", up: false },
        { sym: "TSLA", note: "波動收窄（示範）", chg: "+0.3%", up: true },
      ],
    },
    hk: {
      summary:
        "港股週初氣氛審慎，藍籌股窄幅上落。科技股跟隨外圍略為波動，資金未見大舉進出。成交額低於近月平均（示範）。",
      themes: ["藍籌", "成交偏淡", "審慎"],
      tickers: [
        { sym: "2800.HK", note: "盈富基金 — 大市交投一般（示範）", chg: "0.0%", up: true },
        { sym: "0700.HK", note: "騰訊 — 窄幅波動（示範）", chg: "+0.2%", up: true },
        { sym: "9988.HK", note: "阿里巴巴 — 觀望為主（示範）", chg: "-0.4%", up: false },
      ],
    },
  },
];

let POSTS = [];

const grid = document.getElementById("post-grid");
const detailSection = document.getElementById("post-detail");
const detailContent = document.getElementById("detail-content");
const backBtn = document.getElementById("back-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function marketsOf(post) {
  const fromField = Array.isArray(post.markets)
    ? post.markets.map((m) => String(m).toLowerCase())
    : [];
  const out = [];
  if (fromField.includes("us") || post.us) out.push("us");
  if (fromField.includes("hk") || post.hk) out.push("hk");
  return out.length ? [...new Set(out)] : fromField;
}

function postMatchesFilter(post, filter) {
  if (filter === "all") return true;
  return marketsOf(post).includes(filter);
}

function chipFor(m) {
  const key = String(m).toLowerCase();
  if (key === "us") return '<span class="chip chip-us">美股</span>';
  if (key === "hk") return '<span class="chip chip-hk">港股</span>';
  return "";
}

function excerptFor(post, filter) {
  if (filter === "us" && post.us && post.us.summary) {
    const s = post.us.summary.replace(/\s+/g, " ").trim();
    return s.length > 120 ? s.slice(0, 120) + "…" : s;
  }
  if (filter === "hk" && post.hk && post.hk.summary) {
    const s = post.hk.summary.replace(/\s+/g, " ").trim();
    return s.length > 120 ? s.slice(0, 120) + "…" : s;
  }
  return post.excerpt;
}

function normalizePostsPayload(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.posts)) return data.posts;
  return null;
}

async function loadPosts() {
  try {
    const res = await fetch("./data/posts.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = normalizePostsPayload(data);
    if (!posts || !posts.length) throw new Error("empty posts");
    return posts;
  } catch (err) {
    console.warn(
      "[美港股日報] Failed to fetch ./data/posts.json; using LAST_RESORT demo data.",
      "Prefer: python3 -m http.server from the project root.",
      err
    );
    return LAST_RESORT;
  }
}

function renderHero() {
  const post = POSTS[0];
  if (!post) return;

  const eyebrow = document.querySelector(".hero .eyebrow");
  const heading = document.getElementById("hero-heading");
  const lead = document.querySelector(".hero .hero-lead");
  const tags = document.querySelector(".hero .hero-tags");

  if (eyebrow) eyebrow.textContent = `今日焦點 · ${post.date}`;
  if (heading) heading.textContent = post.title;
  if (lead) lead.textContent = post.excerpt;
  if (tags) {
    const markets = marketsOf(post);
    let show;
    if (currentFilter === "us" || currentFilter === "hk") {
      show = markets.filter((m) => m === currentFilter);
    } else if (markets.length === 2) {
      show = ["both"];
    } else {
      show = markets;
    }
    tags.innerHTML = show
      .map((m) =>
        m === "both"
          ? '<span class="chip chip-both">美港股</span>'
          : chipFor(m)
      )
      .join("");
  }
}

function renderCards() {
  const visible = POSTS.filter((post) => postMatchesFilter(post, currentFilter));
  if (!visible.length) {
    grid.innerHTML =
      '<p class="empty-filter">呢個市場暫時未有簡報。</p>';
    return;
  }

  grid.innerHTML = visible
    .map((post) => {
      const markets = marketsOf(post);
      const showMarkets =
        currentFilter === "all"
          ? markets
          : markets.filter((m) => m === currentFilter);
      const badges = (showMarkets.length ? showMarkets : markets)
        .map(chipFor)
        .join("");
      const excerpt = excerptFor(post, currentFilter);
      return `
      <button type="button" class="post-card" data-id="${post.id}" data-markets="${markets.join(",")}" aria-label="閱讀：${post.title}">
        <div class="post-card-meta">
          <time class="post-date" datetime="${post.date}">${post.date}</time>
          <div class="post-badges">${badges}</div>
        </div>
        <h3>${post.title}</h3>
        <p class="post-excerpt">${excerpt}</p>
        <span class="post-cta">閱讀全文 <span aria-hidden="true">→</span></span>
      </button>
    `;
    })
    .join("");

  grid.querySelectorAll(".post-card").forEach((card) => {
    card.addEventListener("click", () => openPost(card.dataset.id));
  });
}

function applyFilter(filter) {
  currentFilter = filter;
  filterBtns.forEach((btn) => {
    const active = btn.dataset.filter === filter;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  renderHero();
  renderCards();
  if (document.body.classList.contains("showing-detail")) {
    const openId = location.hash.match(/^#post\/(.+)$/);
    if (openId) openPost(openId[1]);
  }
}

function marketBlock(label, chipClass, data) {
  if (!data) return "";
  const themes = data.themes
    .map((t) => `<span class="theme-tag">${t}</span>`)
    .join("");
  const tickers = data.tickers
    .map(
      (t) => `
      <li>
        <span class="ticker-sym">${t.sym}</span>
        <span class="ticker-note">${t.note}</span>
        <span class="ticker-chg ${t.up ? "up" : "down"}">${t.chg}</span>
      </li>`
    )
    .join("");

  return `
    <section class="market-section">
      <h3><span class="chip ${chipClass}">${label}</span></h3>
      <p>${data.summary}</p>
      <div class="themes">${themes}</div>
      <ul class="ticker-list">${tickers}</ul>
    </section>
  `;
}

function openPost(id) {
  const post = POSTS.find((p) => p.id === id);
  if (!post) return;

  const markets = marketsOf(post);
  const showUs =
    currentFilter !== "hk" && (currentFilter === "us" || !!post.us);
  const showHk =
    currentFilter !== "us" && (currentFilter === "hk" || !!post.hk);
  const badgeMarkets =
    currentFilter === "us"
      ? ["us"]
      : currentFilter === "hk"
        ? ["hk"]
        : markets;
  const badges = badgeMarkets.map(chipFor).join(" ");

  detailContent.innerHTML = `
    <header class="detail-header">
      <time class="post-date" datetime="${post.date}">${post.dateLabel}</time>
      <h2>${post.title}</h2>
      <div class="post-badges">${badges}</div>
      <p class="detail-disclaimer">⚠️ 內容來自美股／港股助手簡報彙整，分析≠投資建議。</p>
    </header>
    ${showUs ? marketBlock("美股簡報", "chip-us", post.us) : ""}
    ${showHk ? marketBlock("港股簡報", "chip-hk", post.hk) : ""}
  `;

  document.body.classList.add("showing-detail");
  detailSection.hidden = false;
  history.replaceState(null, "", `#post/${id}`);
  backBtn.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closePost() {
  document.body.classList.remove("showing-detail");
  detailSection.hidden = true;
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

backBtn.addEventListener("click", closePost);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("showing-detail")) {
    closePost();
  }
});

function routeFromHash() {
  const match = location.hash.match(/^#post\/(.+)$/);
  if (match) {
    openPost(match[1]);
  } else {
    closePost();
  }
}

window.addEventListener("hashchange", routeFromHash);

async function init() {
  POSTS = await loadPosts();
  renderHero();
  applyFilter("all");
  routeFromHash();
}

init();
