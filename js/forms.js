export function initForms() {
  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  if (!validateForm(form, data)) return;

  try {
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    form.reset();
  } catch {
    console.error('Erro ao enviar formulário');
  }
}

function validateForm(form, data) {
  let valid = true;
  clearErrors(form);

  if (!data.name?.trim()) {
    showFieldError(form, 'name', 'Nome é obrigatório');
    valid = false;
  }

  if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showFieldError(form, 'email', 'Email inválido');
    valid = false;
  }

  return valid;
}

function showFieldError(form, field, message) {
  const input = form.querySelector(`[name="${field}"]`);
  const error = form.querySelector(`[data-error="${field}"]`);
  if (input) input.classList.add('is-error');
  if (error) error.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));
  form.querySelectorAll('[data-error]').forEach(el => (el.textContent = ''));
}
