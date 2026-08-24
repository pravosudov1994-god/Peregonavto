window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const modal = document.getElementById('lead-modal');
  document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }));
  modal.addEventListener('click', e => { if (e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') modal.classList.remove('open'); });

  document.querySelectorAll('[data-lead-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(form).entries());
      status.textContent = 'Отправляем заявку…';
      button.disabled = true;
      try {
        const response = await fetch('/api/lead', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || 'Форма пока не подключена');
        status.textContent = 'Спасибо! Заявка отправлена.';
        form.reset();
      } catch (err) {
        status.textContent = 'Форма готова, но канал заявок ещё нужно подключить в Cloudflare.';
      } finally { button.disabled = false; }
    });
  });
});
