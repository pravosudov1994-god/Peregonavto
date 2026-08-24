window.addEventListener('DOMContentLoaded', () => {
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
  const hero = document.querySelector('.hero');

  // Main conversion block: 3 cars under the client's budget.
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
            <article class="selection-result"><div class="selection-result-no">01</div><div><strong>Оптимальный вариант</strong><span>Лучший баланс цены, года, пробега и состояния.</span></div></article>
            <article class="selection-result"><div class="selection-result-no">02</div><div><strong>Максимальная выгода</strong><span>Вариант с самой интересной экономикой относительно рынка РФ.</span></div></article>
            <article class="selection-result"><div class="selection-result-no">03</div><div><strong>Альтернатива</strong><span>Другая модель или более свежий автомобиль в том же бюджете.</span></div></article>
          </div>
          <div class="selection-trust"><i data-lucide="shield-check"></i><span>Без оплаты за предварительный расчёт. Если в России выгоднее — так и скажем.</span></div>
        </div>

        <form class="selection-form lead-form" data-lead-form>
          <div class="selection-form-head"><span>Заявка занимает около минуты</span><strong>Расскажите, что ищете</strong></div>
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
  }

  // Live model catalog. Hard numbers are shown only where we have a working calculation;
  // other models explicitly request a current VIN-based calculation instead of inventing figures.
  const selectionSection = document.getElementById('selection');
  if (selectionSection && !document.getElementById('catalog')) {
    const catalog = document.createElement('section');
    catalog.className = 'live-catalog';
    catalog.id = 'catalog';
    catalog.innerHTML = `
      <div class="container">
        <div class="catalog-head">
          <div>
            <div class="eyebrow">Живой каталог KIRILL AUTO</div>
            <h2>Автомобили, которые стоит считать сейчас</h2>
            <p>Фокусируемся на версиях до 160 л.с. и считаем выгоду только после проверки конкретного автомобиля и его таможенной истории.</p>
          </div>
          <div class="catalog-filter"><span class="is-active">До 160 л.с.</span><span>Беларусь</span><span>Под заказ</span></div>
        </div>

        <div class="catalog-grid">
          <article class="catalog-card catalog-card-featured">
            <div class="catalog-visual camry"><div class="catalog-status">Расчёт готов</div><div class="catalog-car-icon"><i data-lucide="car-front"></i></div></div>
            <div class="catalog-body">
              <div class="catalog-country">Беларусь · седан</div>
              <h3>Toyota Camry XV70 2022</h3>
              <div class="catalog-spec">2.0 CVT · 150 л.с.</div>
              <div class="catalog-prices">
                <div><span>Автомобиль в РБ</span><strong>≈ 2,10–2,18 млн ₽</strong></div>
                <div><span>Под ключ в РФ</span><strong>≈ 2,35–2,50 млн ₽</strong></div>
                <div><span>Рынок РФ</span><strong>≈ 3,0 млн ₽</strong></div>
              </div>
              <div class="catalog-saving"><span>Потенциальная выгода</span><strong>450–650 тыс. ₽</strong></div>
              <button class="btn btn-gold catalog-cta" type="button" data-catalog-car="Toyota Camry XV70 2022 2.0 CVT 150 л.с." data-catalog-budget="2 000 000–3 000 000 ₽">Получить расчёт по Camry</button>
            </div>
          </article>

          <article class="catalog-card">
            <div class="catalog-visual tiguan"><div class="catalog-status">Есть рынок</div><div class="catalog-car-icon"><i data-lucide="car-front"></i></div></div>
            <div class="catalog-body">
              <div class="catalog-country">Беларусь · кроссовер</div>
              <h3>Volkswagen Tiguan 2022</h3>
              <div class="catalog-spec">1.4 / 1.5 TSI · 150 л.с.</div>
              <div class="catalog-prices">
                <div><span>Ориентир в РБ</span><strong>от ≈ 2,15 млн ₽</strong></div>
                <div><span>Под ключ</span><strong>≈ 2,4–2,6 млн ₽</strong></div>
                <div><span>Рынок РФ</span><strong>≈ 2,9–3,2 млн ₽</strong></div>
              </div>
              <div class="catalog-saving"><span>Потенциал</span><strong>до ≈ 600 тыс. ₽</strong></div>
              <button class="btn btn-gold catalog-cta" type="button" data-catalog-car="Volkswagen Tiguan 2022 150 л.с." data-catalog-budget="2 500 000–3 000 000 ₽">Посчитать Tiguan</button>
            </div>
          </article>

          <article class="catalog-card">
            <div class="catalog-visual karoq"><div class="catalog-status">Есть варианты</div><div class="catalog-car-icon"><i data-lucide="car-front"></i></div></div>
            <div class="catalog-body">
              <div class="catalog-country">Беларусь · кроссовер</div>
              <h3>Skoda Karoq 2021</h3>
              <div class="catalog-spec">1.4 TSI · 150 л.с.</div>
              <div class="catalog-prices">
                <div><span>Ориентир в РБ</span><strong>≈ 1,85–1,95 млн ₽</strong></div>
                <div><span>Под ключ</span><strong>≈ 2,1–2,3 млн ₽</strong></div>
                <div><span>Рынок РФ</span><strong>≈ 2,3–2,55 млн ₽</strong></div>
              </div>
              <div class="catalog-saving"><span>Потенциал</span><strong>до ≈ 400 тыс. ₽</strong></div>
              <button class="btn btn-gold catalog-cta" type="button" data-catalog-car="Skoda Karoq 2021 1.4 TSI 150 л.с." data-catalog-budget="2 000 000–2 500 000 ₽">Посчитать Karoq</button>
            </div>
          </article>

          <article class="catalog-card catalog-card-request">
            <div class="catalog-visual seltos"><div class="catalog-status">Подбор по запросу</div><div class="catalog-car-icon"><i data-lucide="car-front"></i></div></div>
            <div class="catalog-body">
              <div class="catalog-country">Беларусь / Корея · кроссовер</div>
              <h3>Kia Seltos 2022</h3>
              <div class="catalog-spec">1.6 · 121–123 л.с.</div>
              <div class="catalog-prices catalog-prices-request">
                <div><span>Цена там</span><strong>по актуальному авто</strong></div>
                <div><span>Под ключ</span><strong>после проверки VIN</strong></div>
                <div><span>Рынок РФ</span><strong>≈ 2,1–2,3 млн ₽</strong></div>
              </div>
              <div class="catalog-saving neutral"><span>Выгоду</span><strong>считаем до задатка</strong></div>
              <button class="btn btn-outline catalog-cta" type="button" data-catalog-car="Kia Seltos 2022 1.6 до 160 л.с." data-catalog-budget="2 000 000–2 500 000 ₽">Получить актуальный расчёт</button>
            </div>
          </article>

          <article class="catalog-card catalog-card-request">
            <div class="catalog-visual elantra"><div class="catalog-status">Подбор по запросу</div><div class="catalog-car-icon"><i data-lucide="car-front"></i></div></div>
            <div class="catalog-body">
              <div class="catalog-country">Беларусь / Корея · седан</div>
              <h3>Hyundai Elantra 2022</h3>
              <div class="catalog-spec">1.6 · до 160 л.с.</div>
              <div class="catalog-prices catalog-prices-request">
                <div><span>Цена там</span><strong>по актуальному авто</strong></div>
                <div><span>Под ключ</span><strong>после проверки VIN</strong></div>
                <div><span>Рынок РФ</span><strong>сравним в день расчёта</strong></div>
              </div>
              <div class="catalog-saving neutral"><span>Фокус</span><strong>цена + история + пробег</strong></div>
              <button class="btn btn-outline catalog-cta" type="button" data-catalog-car="Hyundai Elantra 2022 1.6 до 160 л.с." data-catalog-budget="2 000 000–2 500 000 ₽">Посчитать Elantra</button>
            </div>
          </article>

          <article class="catalog-card catalog-card-request">
            <div class="catalog-visual audi"><div class="catalog-status">Европейская альтернатива</div><div class="catalog-car-icon"><i data-lucide="car-front"></i></div></div>
            <div class="catalog-body">
              <div class="catalog-country">Европа / Беларусь · хэтчбек/седан</div>
              <h3>Audi A3 2021–2022</h3>
              <div class="catalog-spec">версия до 150 л.с.</div>
              <div class="catalog-prices catalog-prices-request">
                <div><span>Цена там</span><strong>по комплектации</strong></div>
                <div><span>Под ключ</span><strong>после проверки документов</strong></div>
                <div><span>Рынок РФ</span><strong>сравним с аналогом</strong></div>
              </div>
              <div class="catalog-saving neutral"><span>Фокус</span><strong>не переплачивать за мощность</strong></div>
              <button class="btn btn-outline catalog-cta" type="button" data-catalog-car="Audi A3 2021–2022 до 150 л.с." data-catalog-budget="2 500 000–3 000 000 ₽">Посчитать Audi A3</button>
            </div>
          </article>
        </div>

        <div class="catalog-disclaimer"><i data-lucide="info"></i><span>Цены в каталоге — предварительные ориентиры, а не публичная оферта. Финальную стоимость фиксируем только после проверки конкретного VIN, документов, таможенной истории, курса и обязательных платежей на дату сделки.</span></div>
      </div>`;
    selectionSection.insertAdjacentElement('afterend', catalog);

    const desktopCarsLink = header?.querySelector('.nav a[href="#cars"]');
    if (desktopCarsLink) {
      desktopCarsLink.href = '#catalog';
      desktopCarsLink.textContent = 'Каталог';
    }
  }

  // Catalog CTA -> prefill main form and scroll to it.
  document.querySelectorAll('[data-catalog-car]').forEach(button => {
    button.addEventListener('click', () => {
      const selection = document.getElementById('selection');
      const form = selection?.querySelector('form[data-lead-form]');
      if (!selection || !form) return;
      const carInput = form.querySelector('input[name="car"]');
      const budgetSelect = form.querySelector('select[name="budget"]');
      if (carInput) carInput.value = button.dataset.catalogCar || '';
      if (budgetSelect && button.dataset.catalogBudget) budgetSelect.value = button.dataset.catalogBudget;
      const sourceInput = form.querySelector('input[name="source"]');
      if (sourceInput) sourceInput.value = `catalog:${button.dataset.catalogCar || 'model'}`;
      selection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => form.querySelector('input[name="city"]')?.focus(), 550);
    });
  });

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 70);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (header && mobileToggle) {
    const panel = document.createElement('aside');
    panel.className = 'mobile-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <button class="mobile-panel-close" type="button" aria-label="Закрыть меню"><i data-lucide="x"></i></button>
      <nav aria-label="Мобильная навигация">
        <a href="#selection">Получить 3 варианта</a>
        <a href="#catalog">Каталог</a>
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
  }

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

  const revealNodes = document.querySelectorAll('.benefit-card,.car-card,.step,.cost-box,.cost-total,.g-card,.contract-block,.case-card,.before-card,.selection-result,.selection-form,.catalog-card');
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

  if (window.lucide) lucide.createIcons();

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
        if (status) status.textContent = 'Готово! Заявка отправлена. Подготовим варианты и свяжемся с вами.';
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
