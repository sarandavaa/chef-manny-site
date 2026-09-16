// =====================================================================
// Small, dependency-free interactions: mobile nav toggle, gallery
// lightbox, and the auto-updating footer year.
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Hero nav-clearance offset (measured, not guessed, so the hero
  // photo always starts exactly at the nav's real bottom edge with no gap) ----
  const header = document.querySelector('.site-header');
  const syncHeroNavOffset = () => {
    if (!header) return;
    document.documentElement.style.setProperty('--hero-nav-offset', `${header.offsetHeight}px`);
  };
  syncHeroNavOffset();
  window.addEventListener('resize', syncHeroNavOffset);

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu after tapping a link (mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Gallery lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const img = item.querySelector('img');
      openLightbox(full, img ? img.alt : '');
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---- Contact form (submits to Formspree — see the form's `action` in index.html) ----
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Reveal a "please specify" field when its paired <select> is set to "Other".
  const wireOtherToggle = (selectId, wrapId, inputId) => {
    const select = document.getElementById(selectId);
    const wrap = document.getElementById(wrapId);
    const input = document.getElementById(inputId);
    if (!select || !wrap || !input) return;

    select.addEventListener('change', () => {
      const isOther = select.value === 'Other';
      wrap.classList.toggle('is-hidden', !isOther);
      input.required = isOther;
      if (!isOther) input.value = '';
    });
  };

  wireOtherToggle('service', 'service-other-wrap', 'service-other');
  wireOtherToggle('occasion', 'occasion-other-wrap', 'occasion-other');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const action = contactForm.getAttribute('action') || '';
      if (!action.startsWith('http')) {
        formStatus.textContent = 'This form isn’t connected to an email service yet.';
        formStatus.classList.add('is-error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      formStatus.textContent = 'Sending…';
      formStatus.classList.remove('is-error');

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          formStatus.textContent = 'Thanks! Your message has been sent — Manny will be in touch soon.';
          contactForm.reset();
          document.querySelectorAll('.form-field.is-hidden').forEach((wrap) => {
            wrap.classList.add('is-hidden');
          });
        } else {
          formStatus.textContent = 'Something went wrong sending your message. Please try again or email directly.';
          formStatus.classList.add('is-error');
        }
      } catch (err) {
        formStatus.textContent = 'Something went wrong sending your message. Please try again or email directly.';
        formStatus.classList.add('is-error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // ---- Testimonial carousel ----
  const track = document.getElementById('testimonial-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (track && dotsWrap) {
    const slides = Array.from(track.children);
    let current = 0;
    let dots = [];

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    updateCarousel();
  }
});
