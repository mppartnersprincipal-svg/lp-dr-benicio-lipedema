/**
 * Tracking de conversão (GTM/dataLayer) + preservação de UTM.
 * - Captura utm_* / gclid / fbclid → sessionStorage + dataLayer
 * - Opcional: anexa [ref: source/campaign] à mensagem do WhatsApp
 * - Push de `whatsapp_click` (com source) em todo clique em a[data-wa]
 */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
const STORE_KEY = 'lp_utm';

function readUtms() {
  const params = new URLSearchParams(location.search);
  const found = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

function storedUtms() {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function initTracking({ appendUtmToWhatsApp = true } = {}) {
  window.dataLayer = window.dataLayer || [];

  const fresh = readUtms();
  if (Object.keys(fresh).length) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(fresh));
    } catch {}
    window.dataLayer.push({ event: 'utm_captured', ...fresh });
  }
  const utms = Object.keys(fresh).length ? fresh : storedUtms();

  if (appendUtmToWhatsApp && (utms.utm_source || utms.utm_campaign)) {
    const ref = ` [ref: ${utms.utm_source || '-'}/${utms.utm_campaign || '-'}]`;
    document.querySelectorAll('a[data-wa]').forEach((a) => {
      try {
        const url = new URL(a.href);
        const text = url.searchParams.get('text') || '';
        if (!text.includes('[ref:')) {
          url.searchParams.set('text', text + ref);
          a.href = url.toString();
        }
      } catch {}
    });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('a[data-wa]');
    if (!link) return;
    window.dataLayer.push({
      event: 'whatsapp_click',
      whatsapp_source: link.dataset.source || 'desconhecido',
      ...utms,
    });
  });
}
