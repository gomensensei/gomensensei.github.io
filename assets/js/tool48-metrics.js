// Region-aware usage metrics shared by all Tool48 tools.
(function () {
    'use strict';

    const MEASUREMENT_ID = 'G-KX94CR6M1M';
    const ALLOWED_HOSTS = new Set(['tool48.com', 'www.tool48.com']);
    const CONSENT_REQUIRED_REGIONS = Object.freeze([
        'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES',
        'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI',
        'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE',
        'SI', 'SK'
    ]);

    if (!ALLOWED_HOSTS.has(window.location.hostname)) {
        return;
    }

    let analyticsLoaded = false;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    // EEA, UK and Switzerland wait for a Google CMP choice. All other
    // regions can use analytics immediately without a Tool48 consent prompt.
    window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        region: CONSENT_REQUIRED_REGIONS,
        wait_for_update: 1500
    });
    window.gtag('consent', 'default', {
        analytics_storage: 'granted'
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
        const origin = event.target;
        if (!(origin instanceof Element)) return;

        const control = origin.closest(
            'a, button, [role="button"], input[type="button"], input[type="submit"]'
        );
        if (!control) return;

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

    loadAnalytics();

    new MutationObserver(function () {
        window.gtag('set', { tool_language: currentLanguage() });
    }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    window.Tool48Analytics = Object.freeze({
        measurementId: MEASUREMENT_ID,
        consentMode: 'regional',
        consentRequiredRegions: CONSENT_REQUIRED_REGIONS.slice()
    });
}());
