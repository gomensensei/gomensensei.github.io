// Privacy-aware usage metrics shared by all Tool48 tools.
(function () {
    'use strict';

    const MEASUREMENT_ID = 'G-KX94CR6M1M';
    const CONSENT_KEY = 'tool48_analytics_consent_v1';
    const ALLOWED_HOSTS = new Set(['tool48.com', 'www.tool48.com']);

    if (!ALLOWED_HOSTS.has(window.location.hostname)) {
        return;
    }

    const COPY = {
        'zh-HK': {
            title: '匿名使用統計',
            body: 'Tool48 使用 Google Analytics 了解各工具的使用時間與常用功能。不會收集你輸入的內容或已保存資料。',
            accept: '允許統計',
            decline: '暫不允許',
            privacy: '私隱說明',
            manage: '更改匿名統計設定'
        },
        'zh-Hans': {
            title: '匿名使用统计',
            body: 'Tool48 使用 Google Analytics 了解各工具的使用时间与常用功能。不会收集你输入的内容或已保存资料。',
            accept: '允许统计',
            decline: '暂不允许',
            privacy: '隐私说明',
            manage: '更改匿名统计设置'
        },
        en: {
            title: 'Anonymous usage analytics',
            body: 'Tool48 uses Google Analytics to understand time spent and commonly used features. Form entries and saved data are not collected.',
            accept: 'Allow analytics',
            decline: 'Not now',
            privacy: 'Privacy details',
            manage: 'Change analytics choice'
        },
        ja: {
            title: '匿名利用統計',
            body: 'Tool48 は Google Analytics を使い、各ツールの利用時間とよく使われる機能を確認します。入力内容や保存データは収集しません。',
            accept: '統計を許可',
            decline: '許可しない',
            privacy: 'プライバシー',
            manage: '匿名統計の設定を変更'
        },
        ko: {
            title: '익명 이용 통계',
            body: 'Tool48은 Google Analytics를 사용해 도구 이용 시간과 자주 사용하는 기능을 확인합니다. 입력 내용이나 저장 데이터는 수집하지 않습니다.',
            accept: '통계 허용',
            decline: '허용 안 함',
            privacy: '개인정보 안내',
            manage: '익명 통계 설정 변경'
        },
        th: {
            title: 'สถิติการใช้งานแบบไม่ระบุตัวตน',
            body: 'Tool48 ใช้ Google Analytics เพื่อดูระยะเวลาการใช้งานและฟังก์ชันที่ใช้บ่อย โดยไม่เก็บข้อมูลที่คุณกรอกหรือข้อมูลที่บันทึกไว้',
            accept: 'อนุญาตสถิติ',
            decline: 'ยังไม่อนุญาต',
            privacy: 'รายละเอียดความเป็นส่วนตัว',
            manage: 'เปลี่ยนการตั้งค่าสถิติ'
        },
        id: {
            title: 'Statistik penggunaan anonim',
            body: 'Tool48 memakai Google Analytics untuk memahami durasi penggunaan dan fitur yang sering dipakai. Isian formulir dan data tersimpan tidak dikumpulkan.',
            accept: 'Izinkan statistik',
            decline: 'Jangan sekarang',
            privacy: 'Detail privasi',
            manage: 'Ubah pilihan statistik'
        }
    };

    let analyticsLoaded = false;
    let analyticsAllowed = false;
    let consentHost = null;
    let manageHost = null;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', {
        analytics_storage: 'denied'
    });

    function normalizeLanguage(value) {
        const language = String(value || '').toLowerCase();
        if (language.startsWith('zh')) {
            return language.includes('hans') || language.includes('cn') || language.includes('sg')
                ? 'zh-Hans'
                : 'zh-HK';
        }
        if (language.startsWith('ja')) return 'ja';
        if (language.startsWith('ko')) return 'ko';
        if (language.startsWith('th')) return 'th';
        if (language.startsWith('id')) return 'id';
        return 'en';
    }

    function currentLanguage() {
        return normalizeLanguage(document.documentElement.lang);
    }

    function currentCopy() {
        return COPY[currentLanguage()] || COPY.en;
    }

    function readConsent() {
        try {
            return window.localStorage.getItem(CONSENT_KEY);
        } catch (_error) {
            return null;
        }
    }

    function writeConsent(value) {
        try {
            window.localStorage.setItem(CONSENT_KEY, value);
        } catch (_error) {
            // A private browser mode may block storage; the current choice still applies.
        }
    }

    function toolName() {
        const path = window.location.pathname.toLowerCase();
        if (path.startsWith('/48-ticket-generator/')) return 'ticket';
        if (path.startsWith('/akb-garapon/')) return 'garapon';
        if (path.startsWith('/akb-seatmap/')) return 'seatmap';
        if (path.startsWith('/akb-mbti-with-wota/')) return 'mbti';
        if (path.startsWith('/akb_mini_games_2026/')) return 'mini_games';
        if (path.startsWith('/penlightlist/')) return 'penlight';
        return 'hub';
    }

    function sanitize(value, fallback) {
        const cleaned = String(value || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9/_-]+/g, '_')
            .replace(/^_+|_+$/g, '')
            .slice(0, 80);
        return cleaned || fallback;
    }

    function destinationFor(control) {
        if (!(control instanceof HTMLAnchorElement)) return '';
        try {
            const target = new URL(control.href, window.location.href);
            if (target.origin === window.location.origin) {
                return target.pathname;
            }
            return target.protocol === 'http:' || target.protocol === 'https:'
                ? target.hostname
                : target.protocol.replace(':', '');
        } catch (_error) {
            return '';
        }
    }

    function actionFor(control) {
        const explicitAction = control.getAttribute('data-analytics-action');
        if (explicitAction) return sanitize(explicitAction, 'control');

        if (control instanceof HTMLAnchorElement) {
            const destination = destinationFor(control);
            if (destination) return sanitize(`open_${destination}`, 'link');
        }

        if (control.id) return sanitize(control.id, 'control');
        if (control.getAttribute('name')) return sanitize(control.getAttribute('name'), 'control');

        const ignoredClasses = new Set([
            'active', 'checked', 'disabled', 'expanded', 'hidden', 'open',
            'selected', 'show', 'visible'
        ]);
        const stableClass = Array.from(control.classList)
            .find((className) => !ignoredClasses.has(className.toLowerCase()));
        return sanitize(stableClass, control.tagName.toLowerCase());
    }

    function trackControlClick(event) {
        if (!analyticsAllowed) return;
        const origin = event.target;
        if (!(origin instanceof Element)) return;

        const control = origin.closest(
            'a, button, [role="button"], input[type="button"], input[type="submit"]'
        );
        if (!control || control.closest('[data-tool48-analytics-ui]')) return;

        window.gtag('event', 'tool_click', {
            tool_name: toolName(),
            action_name: actionFor(control),
            element_type: control.tagName.toLowerCase(),
            destination_path: destinationFor(control),
            tool_language: currentLanguage(),
            page_path: window.location.pathname
        });
    }

    function loadAnalytics() {
        analyticsAllowed = true;
        window.gtag('consent', 'update', {
            analytics_storage: 'granted'
        });

        if (analyticsLoaded) return;
        analyticsLoaded = true;

        window.gtag('js', new Date());
        window.gtag('set', {
            tool_name: toolName(),
            tool_language: currentLanguage()
        });
        window.gtag('config', MEASUREMENT_ID, {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        script.dataset.tool48Analytics = 'true';
        document.head.appendChild(script);
        document.addEventListener('click', trackControlClick, true);
    }

    function removeConsentBanner() {
        if (consentHost) {
            consentHost.remove();
            consentHost = null;
        }
    }

    function consentTemplate(copy) {
        return `
            <style>
                :host {
                    all: initial;
                    color-scheme: light;
                }
                .bar {
                    box-sizing: border-box;
                    position: fixed;
                    z-index: 2147483000;
                    left: max(12px, env(safe-area-inset-left));
                    right: max(12px, env(safe-area-inset-right));
                    bottom: max(12px, env(safe-area-inset-bottom));
                    max-width: 760px;
                    margin: 0 auto;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border: 1px solid #f2bfd2;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263349;
                    box-shadow: 0 10px 28px rgba(41, 50, 72, 0.18);
                    font-family: Inter, "Noto Sans", "Noto Sans JP", "Noto Sans KR",
                        "Noto Sans Thai", system-ui, sans-serif;
                    line-height: 1.45;
                }
                .copy {
                    min-width: 0;
                    flex: 1 1 auto;
                }
                strong {
                    display: block;
                    margin: 0 0 2px;
                    color: #27344a;
                    font-size: 14px;
                    font-weight: 700;
                }
                p {
                    margin: 0;
                    color: #5f6878;
                    font-size: 12px;
                }
                a {
                    color: #d73574;
                    white-space: nowrap;
                }
                .actions {
                    display: flex;
                    flex: 0 0 auto;
                    gap: 8px;
                }
                button {
                    min-height: 38px;
                    padding: 7px 12px;
                    border: 1px solid #eeb3ca;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #bd2f67;
                    font: 700 12px/1.2 Inter, "Noto Sans", system-ui, sans-serif;
                    cursor: pointer;
                }
                button.primary {
                    border-color: #ed4d8c;
                    background: #ed4d8c;
                    color: #ffffff;
                }
                button:focus-visible,
                a:focus-visible {
                    outline: 3px solid rgba(33, 150, 243, 0.35);
                    outline-offset: 2px;
                }
                @media (max-width: 620px) {
                    .bar {
                        align-items: stretch;
                        flex-direction: column;
                        gap: 9px;
                        padding: 11px;
                    }
                    .actions {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                    button {
                        width: 100%;
                    }
                }
            </style>
            <aside class="bar" role="dialog" aria-labelledby="tool48-analytics-title">
                <div class="copy">
                    <strong id="tool48-analytics-title"></strong>
                    <p><span data-copy="body"></span> <a href="https://tool48.com/privacy.html"></a></p>
                </div>
                <div class="actions">
                    <button type="button" data-action="decline"></button>
                    <button type="button" class="primary" data-action="accept"></button>
                </div>
            </aside>
        `;
    }

    function updateConsentCopy() {
        if (!consentHost || !consentHost.shadowRoot) return;
        const copy = currentCopy();
        consentHost.shadowRoot.getElementById('tool48-analytics-title').textContent = copy.title;
        consentHost.shadowRoot.querySelector('[data-copy="body"]').textContent = copy.body;
        consentHost.shadowRoot.querySelector('a').textContent = copy.privacy;
        consentHost.shadowRoot.querySelector('[data-action="accept"]').textContent = copy.accept;
        consentHost.shadowRoot.querySelector('[data-action="decline"]').textContent = copy.decline;
    }

    function showConsentBanner(force) {
        if (consentHost || (!force && readConsent())) return;

        consentHost = document.createElement('div');
        consentHost.id = 'tool48-analytics-consent';
        consentHost.setAttribute('data-tool48-analytics-ui', '');
        const shadow = consentHost.attachShadow({ mode: 'open' });
        shadow.innerHTML = consentTemplate(currentCopy());
        document.body.appendChild(consentHost);
        updateConsentCopy();

        shadow.querySelector('[data-action="accept"]').addEventListener('click', function () {
            writeConsent('granted');
            loadAnalytics();
            removeConsentBanner();
        });

        shadow.querySelector('[data-action="decline"]').addEventListener('click', function () {
            const needsReload = analyticsLoaded;
            analyticsAllowed = false;
            writeConsent('denied');
            window.gtag('consent', 'update', {
                analytics_storage: 'denied'
            });
            removeConsentBanner();
            if (needsReload) window.location.reload();
        });
    }

    function updateManageCopy() {
        if (!manageHost || !manageHost.shadowRoot) return;
        manageHost.shadowRoot.querySelector('button').textContent = currentCopy().manage;
    }

    function addManageButton() {
        if (window.location.pathname.toLowerCase() !== '/privacy.html') return;
        const target = document.querySelector('[data-body-list]');
        if (!target || manageHost) return;

        manageHost = document.createElement('div');
        manageHost.setAttribute('data-tool48-analytics-ui', '');
        const shadow = manageHost.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                :host { display: block; margin-top: 16px; }
                button {
                    min-height: 40px;
                    padding: 8px 14px;
                    border: 1px solid #ed4d8c;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #bd2f67;
                    font: 700 13px/1.2 Inter, "Noto Sans", system-ui, sans-serif;
                    cursor: pointer;
                }
                button:focus-visible {
                    outline: 3px solid rgba(33, 150, 243, 0.35);
                    outline-offset: 2px;
                }
            </style>
            <button type="button"></button>
        `;
        shadow.querySelector('button').addEventListener('click', function () {
            showConsentBanner(true);
        });
        target.appendChild(manageHost);
        updateManageCopy();
    }

    const consent = readConsent();
    if (consent === 'granted') {
        loadAnalytics();
    }

    function startInterface() {
        if (!consent) showConsentBanner(false);
        addManageButton();
        window.setTimeout(addManageButton, 0);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startInterface, { once: true });
    } else {
        startInterface();
    }

    new MutationObserver(function () {
        updateConsentCopy();
        updateManageCopy();
        if (analyticsAllowed) {
            window.gtag('set', { tool_language: currentLanguage() });
        }
    }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    window.Tool48Analytics = Object.freeze({
        measurementId: MEASUREMENT_ID,
        showConsent: function () {
            showConsentBanner(true);
        }
    });
}());
