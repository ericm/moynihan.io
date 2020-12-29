function init() {
  const root = document.querySelector('main') as HTMLDivElement;

  const url = document.URL.split('/');
  const slug = url.reduce((p, c) => (c !== '' ? c : p));

  route(slug);
}

document.addEventListener('load', init);
window.addEventListener('locationchange', init);
