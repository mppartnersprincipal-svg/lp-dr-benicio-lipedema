/**
 * Typewriter LCP-safe: o texto completo já está no HTML e pinta no
 * primeiro frame. Só depois de pintado (double-rAF) os caracteres são
 * ocultados via visibility (o layout não muda → CLS 0) e revelados
 * em sequência.
 */
export function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  requestAnimationFrame(() => requestAnimationFrame(() => start(el)));
}

function start(el) {
  const chars = [];
  const walk = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent) {
          const span = document.createElement('span');
          span.textContent = ch;
          span.className = 'tw-char';
          frag.appendChild(span);
          chars.push(span);
        }
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(el);
  // Oculta tudo num único write após medir — espaço permanece reservado
  for (const span of chars) span.style.visibility = 'hidden';

  const caret = document.createElement('span');
  caret.className = 'tw-caret';
  caret.setAttribute('aria-hidden', 'true');

  // Cap de duração total: ~1.8s independente do tamanho do texto
  const interval = Math.min(38, Math.max(16, 1800 / chars.length));
  let i = 0;
  const timer = setInterval(() => {
    if (i >= chars.length) {
      clearInterval(timer);
      caret.remove();
      el.dispatchEvent(new CustomEvent('hero:typed'));
      return;
    }
    const span = chars[i];
    span.style.visibility = 'visible';
    span.after(caret);
    i++;
  }, interval);
}
