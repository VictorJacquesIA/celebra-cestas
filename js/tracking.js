export function initTracking() {
  trackPageView();
  trackButtonClicks();
  trackCestas();
}

function trackPageView() {
  if (typeof gtag !== 'undefined') gtag('event', 'page_view');
}

function trackButtonClicks() {
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      const event = el.getAttribute('data-track');
      if (typeof gtag !== 'undefined') gtag('event', event);
      if (typeof fbq !== 'undefined') fbq('track', event);
    });
  });
}

function trackCestas() {
  const cestas = [
    { track: 'card_manha',   nome: 'Celebra Manhã',   valor: 177.90 },
    { track: 'card_doce',    nome: 'Celebra Doce',    valor: 169.90 },
    { track: 'card_brinde',  nome: 'Celebra Brinde',  valor: 197.90 },
    { track: 'card_premium', nome: 'Celebra Premium', valor: 249.70 },
  ];

  cestas.forEach(({ track, nome, valor }) => {
    const btn = document.querySelector(`[data-track="${track}"]`);
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (typeof fbq === 'undefined') return;
      fbq('track', 'Lead', {
        content_name: nome,
        content_category: 'Cesta',
        value: valor,
        currency: 'BRL',
      });
    });
  });
}
