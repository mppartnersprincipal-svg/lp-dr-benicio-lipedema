/**
 * Scroll reveals com IntersectionObserver — disparo único por elemento.
 * Elementos: [data-reveal]. Listas: [data-reveal-stagger] aplica
 * --reveal-delay incremental nos filhos [data-reveal].
 */
export function initReveals() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
    parent.querySelectorAll(':scope [data-reveal]').forEach((child, i) => {
      child.style.setProperty('--reveal-delay', `${i * 70}ms`);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
