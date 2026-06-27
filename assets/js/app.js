
/**
 * Gomensensei AKB Fan Tools - App Layer
 * Depends on assets/js/core.js
 * Vanilla JS only. No React / Vue.
 */

(() => {
    const SUPPORTED_LANGS = ["zh-HK", "ja", "en", "ko"];
    const DEFAULT_LANG = "zh-HK";
    let langs = {};
    let currentLang = resolveInitialLang();

    function normalizeString(value = "") {
        return String(value).replace(/\s+/g, "");
    }

    function getLuminance(hex) {
        const clean = hex.replace("#", "");
        const rgb = clean.length === 3
            ? clean.split("").map(ch => parseInt(ch + ch, 16))
            : [clean.slice(0,2), clean.slice(2,4), clean.slice(4,6)].map(v => parseInt(v, 16));

        const [r, g, b] = rgb.map(v => {
            const c = v / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function resolveInitialLang() {
        const hashLang = getHashParam("lang");
        const stored = localStorage.getItem("gomensensei_fantools_lang");
        const browser = (navigator.language || "").toLowerCase();

        if (SUPPORTED_LANGS.includes(hashLang)) return hashLang;
        if (SUPPORTED_LANGS.includes(stored)) return stored;
        if (browser.startsWith("ja")) return "ja";
        if (browser.startsWith("ko")) return "ko";
        if (browser.startsWith("en")) return "en";
        return DEFAULT_LANG;
    }

    function getHashParam(key) {
        const hash = window.location.hash.replace(/^#/, "");
        const params = new URLSearchParams(hash);
        return params.get(key);
    }

    function setHashParam(key, value) {
        const hash = window.location.hash.replace(/^#/, "");
        const params = new URLSearchParams(hash);
        params.set(key, value);
        history.replaceState(null, "", `${location.pathname}${location.search}#${params.toString()}`);
    }

    function getByPath(obj, path) {
        return path.split(".").reduce((acc, key) => acc && acc[key], obj);
    }

    async function fetchJsonSafe(url, fallback = {}) {
        try {
            const response = await fetch(url, { cache: "no-cache" });
            if (!response.ok) throw new Error(`${url} ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn("Non-blocking JSON fetch failed:", error);
            return fallback;
        }
    }

    async function init() {
        const [langData] = await Promise.all([
            fetchJsonSafe("assets/data/langs.json?v=20260628c", {})
        ]);

        langs = langData;

        if (!langs[currentLang]) currentLang = DEFAULT_LANG;
        bindEvents();
        applyLanguage(currentLang);

        if (typeof initSpatialGlass === "function") {
            initSpatialGlass();
        }
    }

    function bindEvents() {
        const langSelect = document.getElementById("langSelect");
        if (langSelect) {
            langSelect.addEventListener("change", (event) => {
                currentLang = event.target.value;
                localStorage.setItem("gomensensei_fantools_lang", currentLang);
                setHashParam("lang", currentLang);
                applyLanguage(currentLang);
            });
        }

        const navToggle = document.querySelector(".nav-toggle");
        const siteNav = document.getElementById("siteNav");
        if (navToggle && siteNav) {
            navToggle.addEventListener("click", () => {
                const isOpen = siteNav.classList.toggle("is-open");
                navToggle.setAttribute("aria-expanded", String(isOpen));
            });
        }

        window.addEventListener("hashchange", () => {
            const hashLang = getHashParam("lang");
            if (SUPPORTED_LANGS.includes(hashLang) && hashLang !== currentLang) {
                currentLang = hashLang;
                applyLanguage(currentLang);
            }
        });
    }

    function applyLanguage(lang) {
        const data = langs[lang] || langs[DEFAULT_LANG];
        if (!data) return;

        document.documentElement.lang = lang;
        localStorage.setItem("gomensensei_fantools_lang", lang);

        const select = document.getElementById("langSelect");
        if (select) select.value = lang;

        document.querySelectorAll("[data-i18n]").forEach((node) => {
            const text = getByPath(data, node.dataset.i18n);
            if (typeof text === "string") node.textContent = text;
        });

        const page = document.documentElement.dataset.page || "home";
        renderPage(data, page);
        updateMeta(data, page);
        updateActiveNav(page);

        // Smart contrast example for current primary colour.
        const lum = getLuminance("#FF4081");
        document.documentElement.style.setProperty("--smart-on-primary", lum > 0.5 ? "#111111" : "#ffffff");
    }

    function updateMeta(data, page) {
        const title = document.querySelector("[data-title]");
        const desc = document.querySelector("[data-meta-description]");
        const pageTitle = page === "home" ? data.meta.title : `${getPageTitle(data, page)} | ${data.meta.title}`;

        document.title = pageTitle;
        if (title) title.textContent = pageTitle;
        if (desc) desc.setAttribute("content", data.meta.description);
    }

    function getPageTitle(data, page) {
        if (page === "home") return data.meta.title;
        return data[page]?.title || data.meta.title;
    }

    function updateActiveNav(page) {
        document.querySelectorAll("[data-nav]").forEach((link) => {
            if (link.dataset.nav === page) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function renderPage(data, page) {
        const pageTitle = document.querySelector("[data-page-title]");
        if (pageTitle && data[page]?.title) pageTitle.textContent = data[page].title;

        if (page === "home") {
            renderQuickTools(data);
            return;
        }

        if (data[page]) renderBodyList(data[page]);
    }

    function renderQuickTools(data) {
        const root = document.querySelector("[data-quick-tools]");
        if (!root) return;

        root.innerHTML = data.tools.map((tool) => `
            <a class="quick-tool quick-tool-${escapeHtml(tool.visual || "default")}" href="${escapeHtml(tool.url)}" aria-label="${escapeHtml(data.common.open)} ${escapeHtml(tool.name)}">
                <span class="quick-icon tool-visual tool-visual-${escapeHtml(tool.visual || "default")}" aria-hidden="true">
                    <i></i><i></i><i></i><i></i><i></i><i></i>
                </span>
                <span class="quick-copy">
                    <strong>${escapeHtml(tool.shortName || tool.name)}</strong>
                    <small>${escapeHtml(tool.label)}</small>
                </span>
            </a>
        `).join("");
    }

    function renderBodyList(pageData) {
        const root = document.querySelector("[data-body-list]");
        if (!root || !Array.isArray(pageData?.body)) return;
        root.innerHTML = pageData.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    document.addEventListener("DOMContentLoaded", init);
})();
