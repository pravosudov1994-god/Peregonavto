export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const clean = (v = '') => String(v).replace(/[<>]/g, '').trim().slice(0, 500);
    const lead = {
      name: clean(body.name),
      phone: clean(body.phone),
      car: clean(body.car),
      budget: clean(body.budget),
      condition: clean(body.condition),
      city: clean(body.city),
      body: clean(body.body),
      comment: clean(body.comment),
      source: clean(body.source),
      page: clean(body.page),
      utm_source: clean(body.utm_source),
      utm_campaign: clean(body.utm_campaign),
      utm_content: clean(body.utm_content),
    };

    if (!lead.phone) {
      return Response.json({ ok: false, message: 'Укажите телефон или Telegram' }, { status: 400 });
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return Response.json({ ok: false, message: 'Канал заявок ещё не настроен' }, { status: 503 });
    }

    const text = [
      '🚘 Новая заявка KIRILL AUTO',
      lead.source === 'selection-3-cars' ? '🎯 Запрос: подобрать 3 автомобиля под бюджет' : null,
      lead.source === 'camry-detail-page' ? '🔥 Запрос со страницы Toyota Camry XV70' : null,
      lead.name ? `Имя: ${lead.name}` : null,
      `Контакт: ${lead.phone}`,
      lead.city ? `Город: ${lead.city}` : null,
      lead.car ? `Автомобиль: ${lead.car}` : null,
      lead.budget ? `Бюджет: ${lead.budget}` : null,
      lead.body ? `Кузов: ${lead.body}` : null,
      lead.condition ? `Пробег / состояние: ${lead.condition}` : null,
      lead.comment ? `Комментарий: ${lead.comment}` : null,
      lead.source ? `Форма: ${lead.source}` : null,
      lead.utm_source ? `UTM source: ${lead.utm_source}` : null,
      lead.utm_campaign ? `UTM campaign: ${lead.utm_campaign}` : null,
      lead.utm_content ? `UTM content: ${lead.utm_content}` : null,
      lead.page ? `Страница: ${lead.page}` : null,
    ].filter(Boolean).join('\n');

    const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
    });

    if (!tg.ok) return Response.json({ ok: false, message: 'Не удалось отправить заявку в Telegram' }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, message: 'Некорректный запрос' }, { status: 400 });
  }
}

export function onRequestGet() {
  return Response.json({ ok: true, service: 'KIRILL AUTO lead endpoint' });
}
