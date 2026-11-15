const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.getElementById('site-nav');

function setNavOpen(open) {
  header.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => {
  setNavOpen(!header.classList.contains('nav-open'));
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setNavOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('nav-open')) {
    setNavOpen(false);
    navToggle.focus();
  }
});

const updateHeaderShadow = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
updateHeaderShadow();
window.addEventListener('scroll', updateHeaderShadow, { passive: true });

const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  revealEls.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((child) => child.classList.contains('reveal'));
    el.style.animationDelay = `${(siblings.indexOf(el) % 4) * 90}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

const bookingFrame = document.querySelector('[data-booking-frame]');

if (bookingFrame) {
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://www.notrispace.com' || typeof event.data !== 'string') return;

    if (event.data.includes('notri-bookings-resize')) {
      const height = Number(event.data.split(':')[1]);
      if (height > 0) bookingFrame.style.height = `${height}px`;
    }

    // Only scroll back to the calendar when its top is hidden, so loading it never pulls the page down.
    if (event.data.includes('notri-bookings-page') && bookingFrame.getBoundingClientRect().top < header.offsetHeight) {
      bookingFrame.scrollIntoView();
    }
  });
}

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const form = document.querySelector('[data-contact-form]');

if (form) {
  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  const contactEmail = document.querySelector('.contact-list a[href^="mailto:"]')?.textContent.trim();

  const setStatus = (message, type) => {
    status.textContent = message;
    status.className = type ? `form-status is-${type}` : 'form-status';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (form.action.includes('YOUR_FORM_ID')) {
      setStatus('This form isn’t connected yet — add your Formspree form ID to enable it.', 'error');
      return;
    }

    submitButton.disabled = true;
    setStatus('Sending…');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);

      form.reset();
      setStatus('Thank you! Elena will be in touch within 1–2 business days.', 'success');
    } catch {
      setStatus(
        contactEmail
          ? `Something went wrong. Please try again or email ${contactEmail}.`
          : 'Something went wrong. Please try again.',
        'error'
      );
    } finally {
      submitButton.disabled = false;
    }
  });
}
