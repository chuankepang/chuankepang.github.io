document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Retry muted autoplay when embedded previews delay media playback.
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.muted = true;

    const startPlayback = () => {
      video.play().catch(() => {
        // The poster remains visible if this preview explicitly blocks autoplay.
      });
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
    }
  });

  // Active nav highlighting on scroll
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navItems.length) {
    const observerOptions = {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === '#' + id);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
});
