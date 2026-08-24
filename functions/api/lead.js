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
      source: clean(body.source),
    };

    if (!lead.phone) {
      return Response.json({ ok: false, message: 'Укажите телефон' }, { status: 400 });
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return Response.json({ ok: false, message: 'Канал заявок ещё не настроен' }, { status: 503 });
    }

    const text = [
      '🚘 Новая заявка Nordline Auto',
      lead.name ? `Имя: ${lead.name}` : null,
      `Телефон: ${lead.phone}`,
      lead.car ? `Автомобиль: ${lead.car}` : null,
      lead.budget ? `Бюджет: ${lead.budget}` : null,
      lead.condition ? `Состояние: ${lead.condition}` : null,
      lead.source ? `Источник: ${lead.source}` : null,
    ].filter(Boolean).join('\n');

    const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
    });

    if (!tg.ok) return Response.json({ ok: false, message: 'Не удалось отправить заявку' }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, message: 'Некорректный запрос' }, { status: 400 });
  }
}

export function onRequestGet() {
  return Response.json({ ok: true, service: 'Nordline Auto lead endpoint' });
}
