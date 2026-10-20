const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

function closeNavigation() {
  if (!header || !navToggle) return;
  header.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Mở menu');
}

navToggle?.addEventListener('click', () => {
  const open = !header.classList.contains('nav-open');
  header.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
});

mainNav?.addEventListener('click', event => {
  if (event.target.closest('a')) closeNavigation();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) closeNavigation();
});

document.querySelectorAll('.faq-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const willOpen = !item.classList.contains('is-open');

    document.querySelectorAll('.faq-item').forEach(otherItem => {
      otherItem.classList.remove('is-open');
      const otherButton = otherItem.querySelector('button');
      otherButton.setAttribute('aria-expanded', 'false');
      otherButton.querySelector('b').textContent = '+';
    });

    if (willOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('b').textContent = '−';
    }
  });
});

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll('[required]')];
  const invalidFields = requiredFields.filter(field => !field.checkValidity());

  requiredFields.forEach(field => field.classList.toggle('is-invalid', !field.checkValidity()));
  const message = form.querySelector('.form-message');

  if (invalidFields.length) {
    message.textContent = 'Vui lòng kiểm tra và điền đầy đủ thông tin bắt buộc.';
    invalidFields[0].focus();
    return;
  }

  message.textContent = 'Thông tin đã hợp lệ. Biểu mẫu cần được kết nối backend để gửi đăng ký.';
  message.style.color = '#24813b';
});

form?.addEventListener('input', event => {
  if (event.target.matches('input, textarea')) {
    event.target.classList.remove('is-invalid');
  }
});
