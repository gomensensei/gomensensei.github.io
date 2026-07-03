/**
 * Tool48 - App Layer
 * Depends on assets/js/core.js
 * Vanilla JS only. No React / Vue.
 */

(() => {
    const SUPPORTED_LANGS = ["zh-HK", "zh-Hans", "en", "ja", "ko", "th", "id"];
    const DEFAULT_LANG = "zh-HK";
    const LANG_KEY = "tool48_lang";
    const LEGACY_LANG_KEY = "gomensensei_fantools_lang";
    const SUPABASE_URL = "https://jappifgnjssqxvjodgiv.supabase.co";
    const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_oXfJyHkRtn1BHBw-9ictBQ__01qBCZg";
    const DASHBOARD_CARDS = [
        { key: "penlight", url: "/penlightlist/" },
        { key: "garapon", url: "/akb-garapon/" },
        { key: "seatmap", url: "/akb-seatmap/" },
        { key: "ticket", url: "/48-ticket-generator/" },
        { key: "games", url: "/akb_mini_games_2026/" }
    ];
    let langs = {};
    let currentLang = resolveInitialLang();
    let timelineObserver = null;
    const cloud = {
        client: null,
        user: null,
        busy: false,
        dashboardLoading: false,
        summaries: {}
    };

    function getLuminance(hex) {
        const clean = hex.replace("#", "");
        const rgb = clean.length === 3
            ? clean.split("").map(ch => parseInt(ch + ch, 16))
            : [clean.slice(0, 2), clean.slice(2, 4), clean.slice(4, 6)].map(v => parseInt(v, 16));

        const [r, g, b] = rgb.map(v => {
            const c = v / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function resolveInitialLang() {
        const hashLang = normalizeLangCode(getHashParam("lang"));
        const stored = normalizeLangCode(localStorage.getItem(LANG_KEY) || localStorage.getItem(LEGACY_LANG_KEY));
        const browser = (navigator.language || "").toLowerCase();

        if (SUPPORTED_LANGS.includes(hashLang)) return hashLang;
        if (SUPPORTED_LANGS.includes(stored)) return stored;
        if (browser.startsWith("zh-cn") || browser.startsWith("zh-sg") || browser.startsWith("zh-hans")) return "zh-Hans";
        if (browser.startsWith("zh")) return "zh-HK";
        if (browser.startsWith("en")) return "en";
        if (browser.startsWith("ja")) return "ja";
        if (browser.startsWith("ko")) return "ko";
        if (browser.startsWith("th")) return "th";
        if (browser.startsWith("id")) return "id";
        return DEFAULT_LANG;
    }

    function normalizeLangCode(lang) {
        if (!lang) return lang;
        if (["zh-CN", "zh-SG", "zh-Hans", "zh-Hans-CN"].includes(lang)) return "zh-Hans";
        if (["zh-TW", "zh-HK", "zh-MO", "zh-Hant", "zh-Hant-HK"].includes(lang)) return "zh-HK";
        return lang;
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

    function t(path, vars = {}) {
        const data = langs[currentLang] || langs[DEFAULT_LANG] || {};
        let value = getByPath(data, path) || getByPath(langs[DEFAULT_LANG] || {}, path) || path;
        Object.entries(vars).forEach(([key, replacement]) => {
            value = String(value).split(`{${key}}`).join(replacement == null ? "" : String(replacement));
        });
        return value;
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
        langs = await fetchJsonSafe("assets/data/langs.json?v=20260703d", {});

        if (!langs[currentLang]) currentLang = DEFAULT_LANG;
        bindEvents();
        applyLanguage(currentLang);
        initHubAccount();

        if (typeof initSpatialGlass === "function") initSpatialGlass();
    }

    function bindEvents() {
        const langSelect = document.getElementById("langSelect");
        if (langSelect) {
            langSelect.addEventListener("change", (event) => {
                currentLang = event.target.value;
                localStorage.setItem(LANG_KEY, currentLang);
                localStorage.setItem(LEGACY_LANG_KEY, currentLang);
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

        bindAccountEvents();

        document.querySelectorAll("[data-open-account]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                openAccountPopover();
            });
        });

        window.addEventListener("hashchange", () => {
            const hashLang = normalizeLangCode(getHashParam("lang"));
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
        localStorage.setItem(LANG_KEY, lang);
        localStorage.setItem(LEGACY_LANG_KEY, lang);

        const select = document.getElementById("langSelect");
        if (select) select.value = lang;

        document.querySelectorAll("[data-i18n]").forEach((node) => {
            const text = getByPath(data, node.dataset.i18n);
            if (typeof text === "string") node.textContent = text;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
            const text = getByPath(data, node.dataset.i18nPlaceholder);
            if (typeof text === "string") node.setAttribute("placeholder", text);
        });

        const page = document.documentElement.dataset.page || "home";
        renderPage(data, page);
        updateMeta(data, page);
        updateActiveNav(page);
        renderAccountPanel();
        renderDashboard();

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

        document.querySelectorAll("meta[property='og:title'], meta[name='twitter:title']").forEach((node) => {
            node.setAttribute("content", pageTitle);
        });
        document.querySelectorAll("meta[property='og:description'], meta[name='twitter:description']").forEach((node) => {
            node.setAttribute("content", data.meta.description);
        });
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
            renderTimeline(data);
            renderPrivacyPoints(data);
            return;
        }

        if (data[page]) renderBodyList(data[page]);
    }

    function renderQuickTools(data) {
        const root = document.querySelector("[data-quick-tools]");
        if (!root || !Array.isArray(data.tools)) return;

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

    function renderTimeline(data) {
        const root = document.querySelector("[data-timeline]");
        const steps = data.timeline?.steps;
        if (!root || !Array.isArray(steps)) return;

        root.innerHTML = steps.map((step, index) => `
            <li class="${index === 0 ? "is-open" : ""}" style="--timeline-index:${index}">
                <button class="timeline-toggle" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
                    <span class="timeline-icon tool-visual tool-visual-${escapeHtml(step.visual || "default")}" aria-hidden="true">
                        <i></i><i></i><i></i><i></i><i></i><i></i>
                    </span>
                    <span>
                        <span class="timeline-phase">${escapeHtml(step.phase)}</span>
                        <strong>${escapeHtml(step.title)}</strong>
                    </span>
                </button>
                <div class="timeline-details">
                    <div>
                        <p>${escapeHtml(step.text)}</p>
                        <a class="timeline-link" href="${escapeHtml(step.url || "#tools")}">${escapeHtml(data.common.open)} ${escapeHtml(step.tool)}</a>
                    </div>
                </div>
            </li>
        `).join("");

        root.querySelectorAll(".timeline-toggle").forEach((button) => {
            button.addEventListener("click", () => {
                const item = button.closest("li");
                const isOpen = item.classList.toggle("is-open");
                button.setAttribute("aria-expanded", String(isOpen));
            });
        });

        revealTimelineOnScroll(root);
    }

    function revealTimelineOnScroll(root) {
        const items = Array.from(root.querySelectorAll("li"));
        if (timelineObserver) {
            timelineObserver.disconnect();
            timelineObserver = null;
        }
        if (!items.length) return;

        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reducedMotion || !("IntersectionObserver" in window)) {
            items.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

        items.forEach((item) => timelineObserver.observe(item));
    }

    function renderPrivacyPoints(data) {
        const root = document.querySelector("[data-privacy-points]");
        const points = data.privacyNote?.points;
        if (!root || !Array.isArray(points)) return;

        root.innerHTML = points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
    }

    function bindAccountEvents() {
        const toggle = document.getElementById("accountToggleBtn");
        const popover = document.getElementById("accountPopover");
        const loginForm = document.getElementById("cloudLoginForm");
        const logoutBtn = document.getElementById("cloudLogoutBtn");

        if (toggle && popover) {
            toggle.addEventListener("click", (event) => {
                event.stopPropagation();
                const nextOpen = popover.hidden;
                popover.hidden = !nextOpen;
                toggle.setAttribute("aria-expanded", String(nextOpen));
            });
            popover.addEventListener("click", (event) => event.stopPropagation());
            document.addEventListener("click", () => closeAccountPopover());
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") closeAccountPopover();
            });
        }

        loginForm?.addEventListener("submit", handleAccountSubmit);
        logoutBtn?.addEventListener("click", signOutAccount);
    }

    function closeAccountPopover() {
        const toggle = document.getElementById("accountToggleBtn");
        const popover = document.getElementById("accountPopover");
        if (!popover) return;
        popover.hidden = true;
        toggle?.setAttribute("aria-expanded", "false");
    }

    function openAccountPopover() {
        const toggle = document.getElementById("accountToggleBtn");
        const popover = document.getElementById("accountPopover");
        if (!popover) return;
        popover.hidden = false;
        toggle?.setAttribute("aria-expanded", "true");
        toggle?.focus({ preventScroll: true });
    }

    async function initHubAccount() {
        if (!window.supabase?.createClient) {
            setCloudMessage(t("account.unavailable"));
            renderAccountPanel();
            renderDashboard();
            return;
        }

        cloud.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });

        cloud.client.auth.onAuthStateChange((_event, session) => {
            cloud.user = session?.user || null;
            if (!cloud.user) cloud.summaries = {};
            renderAccountPanel();
            refreshDashboard();
        });

        try {
            const { data } = await cloud.client.auth.getSession();
            cloud.user = data.session?.user || null;
            renderAccountPanel();
            await refreshDashboard();
        } catch (error) {
            console.warn("Tool48 account init failed:", error);
            setCloudMessage(t("account.unavailable"));
            renderAccountPanel();
            renderDashboard();
        }
    }

    function getCloudDisplayName() {
        return cloud.user?.user_metadata?.display_name || cloud.user?.email || t("account.cloudAccount");
    }

    function setCloudMessage(message) {
        const node = document.getElementById("cloudMessage");
        if (node) node.textContent = message || "";
    }

    function setAccountBusy(busy) {
        cloud.busy = busy;
        document.querySelectorAll("#accountPopover button, #accountPopover input").forEach((node) => {
            node.disabled = busy;
        });
    }

    function renderAccountPanel() {
        const loggedIn = Boolean(cloud.user);
        const label = document.getElementById("accountToggleLabel");
        const status = document.getElementById("accountStatus");
        const loggedOut = document.getElementById("cloudLoginForm");
        const actions = document.getElementById("cloudActions");
        const userLabel = document.getElementById("cloudUserLabel");

        if (label) label.textContent = loggedIn ? getCloudDisplayName() : t("account.navGuest");
        if (status) {
            status.textContent = !cloud.client
                ? t("account.unavailable")
                : loggedIn
                    ? t("account.signedIn")
                    : t("account.localOnly");
        }
        if (loggedOut) loggedOut.hidden = loggedIn;
        if (actions) actions.hidden = !loggedIn;
        if (userLabel) userLabel.textContent = loggedIn ? getCloudDisplayName() : "";
    }

    async function handleAccountSubmit(event) {
        event.preventDefault();
        if (!cloud.client) {
            setCloudMessage(t("account.unavailable"));
            return;
        }

        const submitter = event.submitter;
        const action = submitter?.dataset.authAction || "signin";
        const nickname = document.getElementById("cloudNicknameInput")?.value.trim();
        const email = document.getElementById("cloudEmailInput")?.value.trim();
        const password = document.getElementById("cloudPasswordInput")?.value;

        if (!email || !password) {
            setCloudMessage(t("account.missingEmailPassword"));
            return;
        }

        setAccountBusy(true);
        setCloudMessage(action === "signup" ? t("account.signingUp") : t("account.signingIn"));
        try {
            const result = action === "signup"
                ? await cloud.client.auth.signUp({
                    email,
                    password,
                    options: { data: { display_name: nickname || email.split("@")[0] } }
                })
                : await cloud.client.auth.signInWithPassword({ email, password });

            if (result.error) throw result.error;
            cloud.user = result.data.session?.user || cloud.user;
            setCloudMessage(cloud.user ? t("account.signedIn") : t("account.signupNeedsConfirm"));
            if (cloud.user) {
                closeAccountPopover();
                await refreshDashboard();
            }
        } catch (error) {
            setCloudMessage(t("account.actionFailed", { message: error.message || "" }));
        } finally {
            setAccountBusy(false);
            renderAccountPanel();
        }
    }

    async function signOutAccount() {
        if (!cloud.client) return;
        setAccountBusy(true);
        try {
            await cloud.client.auth.signOut();
            cloud.user = null;
            cloud.summaries = {};
            setCloudMessage(t("account.signedOut"));
            closeAccountPopover();
        } finally {
            setAccountBusy(false);
            renderAccountPanel();
            renderDashboard();
        }
    }

    function renderDashboard() {
        const section = document.querySelector("[data-dashboard]");
        const status = document.querySelector("[data-dashboard-status]");
        const grid = document.querySelector("[data-dashboard-cards]");
        if (!status || !grid) return;

        if (!cloud.client) {
            if (section) section.hidden = true;
            status.textContent = t("dashboard.unavailable");
            grid.innerHTML = "";
            return;
        }

        if (!cloud.user) {
            if (section) section.hidden = true;
            status.textContent = t("dashboard.loggedOut");
            grid.innerHTML = "";
            return;
        }

        if (section) section.hidden = false;
        status.textContent = cloud.dashboardLoading ? t("dashboard.loading") : t("dashboard.signedIn");
        grid.innerHTML = DASHBOARD_CARDS.map(card => {
            const summary = cloud.summaries[card.key] || {
                key: card.key,
                count: cloud.dashboardLoading ? "..." : "-",
                detail: cloud.dashboardLoading ? t("dashboard.loadingShort") : t(`dashboard.cards.${card.key}.empty`),
                url: card.url
            };
            return renderDashboardCard({ ...summary, url: card.url });
        }).join("");
    }

    function renderDashboardCard(summary) {
        const title = t(`dashboard.cards.${summary.key}.title`);
        const detail = summary.error ? t("dashboard.cardUnavailable") : summary.detail;
        return `
            <article class="dashboard-card">
                <div>
                    <strong>${escapeHtml(title)}</strong>
                    <b>${escapeHtml(summary.count)}</b>
                </div>
                <div>
                    <small>${escapeHtml(detail)}</small>
                    <a href="${escapeHtml(summary.url)}">${escapeHtml(t("dashboard.openTool"))}</a>
                </div>
            </article>
        `;
    }

    async function refreshDashboard() {
        if (!cloud.client || !cloud.user) {
            renderDashboard();
            return;
        }

        cloud.dashboardLoading = true;
        renderDashboard();
        const fetchers = {
            penlight: fetchPenlightSummary,
            garapon: fetchGaraponSummary,
            seatmap: fetchSeatmapSummary,
            ticket: fetchTicketSummary,
            games: fetchGamesSummary
        };

        const entries = await Promise.all(DASHBOARD_CARDS.map(async (card) => {
            try {
                return [card.key, await fetchers[card.key]()];
            } catch (error) {
                console.warn(`Dashboard summary failed: ${card.key}`, error);
                return [card.key, {
                    key: card.key,
                    count: "!",
                    detail: t("dashboard.cardUnavailable"),
                    error: true
                }];
            }
        }));

        cloud.summaries = Object.fromEntries(entries);
        cloud.dashboardLoading = false;
        renderDashboard();
    }

    async function fetchTicketSummary() {
        const { data, error, count } = await cloud.client
            .from("ticket_saves")
            .select("id,slot_num,title,updated_at", { count: "exact" })
            .order("updated_at", { ascending: false })
            .limit(3);
        if (error) throw error;
        const latest = (data || []).map(row => row.title || `Slot ${row.slot_num}`).join(" / ");
        return { key: "ticket", count: count ?? (data || []).length, detail: latest || t("dashboard.cards.ticket.empty") };
    }

    async function fetchPenlightSummary() {
        const { data, error, count } = await cloud.client
            .from("penlight_lists")
            .select("id,title,performance_id,is_default", { count: "exact" })
            .limit(4);
        if (error) throw error;
        const latest = (data || []).map(row => row.title || row.performance_id || t("dashboard.untitled")).join(" / ");
        return { key: "penlight", count: count ?? (data || []).length, detail: latest || t("dashboard.cards.penlight.empty") };
    }

    async function fetchGaraponSummary() {
        const { data, error, count } = await cloud.client
            .from("garapon_records")
            .select("id,event_date,performance_id,spin_count,win_count,created_at", { count: "exact" })
            .order("created_at", { ascending: false })
            .limit(3);
        if (error) throw error;
        const total = count ?? (data || []).length;
        return { key: "garapon", count: total, detail: total ? t("dashboard.garaponDetail", { count: total }) : t("dashboard.cards.garapon.empty") };
    }

    async function fetchSeatmapSummary() {
        const { data, error, count } = await cloud.client
            .from("seat_memo_records")
            .select("id,event_date,performance_title,seat_label,created_at", { count: "exact" })
            .order("created_at", { ascending: false })
            .limit(3);
        if (error) throw error;
        const latest = (data || []).map(row => row.seat_label || row.performance_title || row.event_date).filter(Boolean).join(" / ");
        return { key: "seatmap", count: count ?? (data || []).length, detail: latest || t("dashboard.cards.seatmap.empty") };
    }

    async function fetchGamesSummary() {
        const [profileResult, progressResult] = await Promise.all([
            cloud.client.from("fan_quest_profiles").select("level,xp,title,updated_at").eq("user_id", cloud.user.id).maybeSingle(),
            cloud.client.from("fan_quest_progress").select("id,game_slug").eq("user_id", cloud.user.id)
        ]);

        if (profileResult.error) throw profileResult.error;
        if (progressResult.error) throw progressResult.error;

        const profile = profileResult.data;
        const progressCount = progressResult.data?.length || 0;
        const detail = profile
            ? t("dashboard.gameDetail", { level: profile.level || 1, xp: profile.xp || 0 })
            : progressCount
                ? t("dashboard.progressDetail", { count: progressCount })
                : t("dashboard.cards.games.empty");
        return { key: "games", count: profile?.level || progressCount || 0, detail };
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
