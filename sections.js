const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const sections = sectionLinks.map(link => document.getElementById(link.hash.slice(1)));

function showSection() {
  const matchingIndex = sectionLinks.findIndex(link => link.hash === location.hash);
  const activeIndex = Math.max(0, matchingIndex);

  sectionLinks.forEach((link, index) => {
    const active = index === activeIndex;
    sections[index].hidden = !active;
    if (active) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
      sections[index].querySelectorAll('video').forEach(video => video.pause());
    }
  });

  sections[activeIndex].querySelectorAll('video[autoplay]').forEach(video => {
    video.play().catch(() => {});
  });
}

sectionLinks.forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    showSection();
  });
});

window.addEventListener('hashchange', showSection);
showSection();
