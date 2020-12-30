import { route } from './router';

function parseSlug(url: string[]): string {
  return url.reduce((p, c) => (c !== '' ? c : p));
}

function init() {
  const url = document.URL.split('/');
  const slug = parseSlug(url);
  route(slug);
}

function link(e: Event) {
  e.stopPropagation();
  const slug = (e.target as HTMLAnchorElement).baseURI.split('/');
  route(parseSlug(slug));
}

document.addEventListener('load', init);
window.addEventListener('locationchange', init);
document
  .querySelectorAll('#bar>a')
  .forEach((e) => e.addEventListener('click', link));
