window.addEventListener('DOMContentLoaded', () => {
  // Load the visual precision layer without touching the base stylesheet.
  if (!document.querySelector('link[href="/refine.css"]')) {
    const refine = document.createElement('link');
    refine.rel = 'stylesheet';
    refine.href = '/refine.css';
    document.head.appendChild(refine);
  }

  if (window.lucide) lucide.createIcons();

  const header = document.querySelector('.site-header');
  const modal = document.getElementById('lead-modal');
  const mobileToggle = document.querySelector('.mobile-toggle');

  // Sticky premium header after hero scroll.
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 70);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Build a real mobile navigation panel from the desktop nav.
  if (header && mobileToggle) {
    const panel = document.createElement('aside');
    panel.className = 'mobile-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <button class="mobile-panel-close" type="button" aria-label="Закрыть меню"><i data-lucide="x"></i></button>
      <nav aria-label="Мобильная навигация">
        <a href="#benefits">О компании</a>
        <a href="#cars">Каталог</a>
        <a href="#process">Как работаем</a>
        <a href="#benefits">Преимущества</a>
        <a href="#cases">Кейсы</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <button class="btn btn-gold" type="button" data-mobile-lead>Оставить заявку</button>`;
    document.body.appendChild(panel);

    const closePanel = () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    mobileToggle.replaceWith(mobileToggle.cloneNode(true));
    const freshToggle = document.querySelector('.mobile-toggle');
    freshToggle.addEventListener('click', () => {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
    panel.querySelector('.mobile-panel-close').addEventListener('click', closePanel);
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closePanel));
    panel.querySelector('[data-mobile-lead]').addEventListener('click', () => {
      closePanel();
      if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
    if (window.lucide) lucide.createIcons();
  }

  // Modal lead form.
  const openModal = () => {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Subtle entrance animation on important cards/sections.
  const revealNodes = document.querySelectorAll('.benefit-card,.car-card,.step,.cost-box,.cost-total,.g-card,.contract-block,.case-card');
  revealNodes.forEach(node => node.setAttribute('data-reveal', ''));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    revealNodes.forEach(node => io.observe(node));
  } else {
    revealNodes.forEach(node => node.classList.add('is-visible'));
  }

  // Lead forms -> Cloudflare Pages Function.
  document.querySelectorAll('[data-lead-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(form).entries());
      if (status) status.textContent = 'Отправляем заявку…';
      if (button) button.disabled = true;
      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || 'Форма пока не подключена');
        if (status) status.textContent = 'Спасибо! Заявка отправлена.';
        form.reset();
      } catch (err) {
        if (status) status.textContent = 'Форма готова. Для отправки в Telegram нужно добавить секреты в Cloudflare Pages.';
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
});
