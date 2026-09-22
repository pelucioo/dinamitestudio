// Same FormSubmit integration as the existing portfolio. Kept independent of gallery code.
(() => {
  const form = document.querySelector('#contactForm');
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const data = new FormData(form);
    if (!['http:', 'https:'].includes(location.protocol)) {
      status.textContent = 'Open the website through its local preview or hosting address to send a message.';
      return;
    }
    data.set('_url', location.origin + location.pathname);
    for (const key of ['name', 'email', 'message']) {
      const value = String(data.get(key) || '').trim();
      if (!value) {
        status.textContent = 'Please enter your name, email and message.';
        form.elements.namedItem(key).focus();
        return;
      }
      data.set(key, value);
    }
    sending = true;
    button.disabled = true;
    button.textContent = 'SENDING…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: data,
        headers: { Accept: 'application/json' }, signal: controller.signal
      });
      const raw = await response.text();
      let result;
      try { result = JSON.parse(raw); } catch {
        throw new Error(`The service returned an unexpected response (HTTP ${response.status}), instead of confirming delivery.`);
      }
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        const reason = typeof result.message === 'string' ? result.message.slice(0, 500) : 'The service did not confirm receipt of your message.';
        throw new Error(`FormSubmit (HTTP ${response.status}): ${reason}`);
      }
      // Do not erase edits the visitor made while the request was in progress.
      const unchanged = ['name', 'email', 'message'].every(key => form.elements.namedItem(key).value.trim() === data.get(key));
      if (unchanged) form.reset();
      status.textContent = 'Message sent! Thank you for getting in touch.';
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'The service took too long to respond. Delivery could not be confirmed. Your message is saved here; please try again or use the email above.'
        : error instanceof TypeError
          ? 'The connection could not be completed. Your message is saved here. Check your connection and try again.'
          : `${error.message} Your message is saved here.`;
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.textContent = 'SEND MESSAGE';
      form.removeAttribute('aria-busy');
    }
  });
})();
