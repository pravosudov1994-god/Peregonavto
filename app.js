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

  // Main conversion block directly after hero.
  const hero = document.querySelector('.hero');
  if (hero && !document.getElementById('selection')) {
    const selection = document.createElement('section');
    selection.className = 'selection-section';
    selection.id = 'selection';
    selection.innerHTML = `
      <div class="container selection-wrap">
        <div class="selection-copy">
          <div class="eyebrow">Бесплатный предварительный подбор</div>
          <h2>Получите 3 автомобиля под ваш бюджет</h2>
          <p>Подберём три варианта и по каждому покажем цену автомобиля, логистику, оформление, нашу комиссию и ориентир полной стоимости в России.</p>
          <div class="selection-results" aria-label="Что входит в подборку">
            <article class="selection-result">
              <div class="selection-result-no">01</div>
              <div><strong>Оптимальный вариант</strong><span>Лучший баланс цены, года, пробега и состояния.</span></div>
            </article>
            <article class="selection-result">
              <div class="selection-result-no">02</div>
              <div><strong>Максимальная выгода</strong><span>Вариант с самой интересной экономикой относительно рынка РФ.</span></div>
            </article>
            <article class="selection-result">
              <div class="selection-result-no">03</div>
              <div><strong>Альтернатива</strong><span>Другая модель или более свежий автомобиль в том же бюджете.</span></div>
            </article>
          </div>
          <div class="selection-trust"><i data-lucide="shield-check"></i><span>Без оплаты за предварительный расчёт. Если в России выгоднее — так и скажем.</span></div>
        </div>

        <form class="selection-form lead-form" data-lead-form>
          <div class="selection-form-head">
            <span>Заявка занимает около минуты</span>
            <strong>Расскажите, что ищете</strong>
          </div>
          <div class="selection-fields">
            <div class="field"><label>Бюджет</label><select name="budget" required><option value="">Выберите бюджет</option><option>до 2 000 000 ₽</option><option>2 000 000–2 500 000 ₽</option><option>2 500 000–3 000 000 ₽</option><option>3 000 000–4 000 000 ₽</option><option>4 000 000–5 000 000 ₽</option><option>от 5 000 000 ₽</option></select></div>
            <div class="field"><label>Марка / модель</label><input name="car" placeholder="Например, Camry / Tiguan / не определился"></div>
            <div class="field"><label>Ваш город</label><input name="city" placeholder="Например, Москва"></div>
            <div class="field"><label>Тип кузова</label><select name="body"><option value="">Не важно</option><option>Седан</option><option>Кроссовер</option><option>Универсал</option><option>Хэтчбек</option><option>Минивэн</option></select></div>
            <div class="field selection-contact"><label>Телефон или Telegram</label><input name="phone" placeholder="+7 ... или @username" required></div>
          </div>
          <input type="hidden" name="source" value="selection-3-cars">
          <button class="btn btn-gold selection-submit" type="submit"><i data-lucide="send"></i> Получить 3 варианта и расчёт</button>
          <div class="privacy-note"><i data-lucide="lock-keyhole"></i><span>Контакт используем только для ответа на заявку.</span></div>
          <div class="form-status" aria-live="polite"></div>
        </form>
      </div>`;
    hero.insertAdjacentElement('afterend', selection);

    const primaryHeroButton = hero.querySelector('.hero-actions [data-open-modal]');
    if (primaryHeroButton) {
      primaryHeroButton.removeAttribute('data-open-modal');
      primaryHeroButton.textContent = 'Получить 3 варианта';
      primaryHeroButton.addEventListener('click', () => {
        selection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => selection.querySelector('select[name="budget"]')?.focus(), 550);
      });
    }

    if (window.lucide) lucide.createIcons();
  }

  // Sticky premium header after hero scroll.
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 70);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Build a real mobile navigation panel from the current site structure.
  if (header && mobileToggle) {
    const panel = document.createElement('aside');
    panel.className = 'mobile-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <button class="mobile-panel-close" type="button" aria-label="Закрыть меню"><i data-lucide="x"></i></button>
      <nav aria-label="Мобильная навигация">
        <a href="#selection">Получить 3 варианта</a>
        <a href="#cars">Toyota Camry</a>
        <a href="#before-pay">Проверка</a>
        <a href="#process">Как работаем</a>
        <a href="#cost">Стоимость</a>
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
      document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' });
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
  const revealNodes = document.querySelectorAll('.benefit-card,.car-card,.step,.cost-box,.cost-total,.g-card,.contract-block,.case-card,.before-card,.selection-result,.selection-form');
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

  // Lead forms -> Cloudflare Pages Function -> Telegram.
  const query = new URLSearchParams(window.location.search);
  document.querySelectorAll('[data-lead-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.page = window.location.pathname;
      payload.utm_source = query.get('utm_source') || '';
      payload.utm_campaign = query.get('utm_campaign') || '';
      payload.utm_content = query.get('utm_content') || '';

      if (status) status.textContent = 'Отправляем заявку…';
      if (button) button.disabled = true;
      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || 'Не удалось отправить заявку');
        if (status) status.textContent = 'Готово! Заявка отправлена. Подготовим 3 варианта и свяжемся с вами.';
        form.classList.add('is-success');
        form.reset();
      } catch (err) {
        if (status) status.textContent = err.message || 'Не удалось отправить заявку. Попробуйте ещё раз.';
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
});
