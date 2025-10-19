// script.js - navigation, year, search, scroll-top

// set year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'flex';
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) nav.style.display = 'flex';
    else nav.style.display = '';
  });

  // search functionality (frontend)
  const packages = Array.from(document.querySelectorAll('#packagesGrid .pkg'));
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const feedback = document.getElementById('searchFeedback');

  function clearHighlight() {
    packages.forEach(p => p.classList.remove('highlight'));
  }

  function showFeedback(message, type = 'info') {
    feedback.hidden = false;
    feedback.textContent = message;
    feedback.className = 'search-feedback ' + (type === 'warn' ? 'warn' : '');
  }

  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim().toLowerCase();
    clearHighlight();

    if (!q) {
      // empty: show all packages (reset) and short message
      showFeedback('Showing all packages. Try searching for "Goa", "Manali", etc.');
      window.location.hash = '#packages';
      return;
    }

    const matches = packages.filter(p => p.dataset.title.toLowerCase().includes(q));
    if (matches.length) {
      // highlight matches and scroll there
      matches.forEach(m => m.classList.add('highlight'));
      showFeedback(`Found ${matches.length} package(s) matching “${q}”.`);
      matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // show styled coming-soon card
      showFeedback(`Coming soon — we don't have a package matching “${q}” yet. We'll add it soon!`, 'warn');
      // subtle shake animation
      feedback.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 450 });
    }
  });

  // highlight style (CSS class will handle visual)
  // scroll to top button
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollBtn.style.display = 'block';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
