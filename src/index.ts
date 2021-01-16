import { route } from './router';

type Gallery = {
  name: string;
  download_url: string;
  type: string;
  path: string;
}[];

let photos: Gallery;

function parseSlug(url: string[]): string {
  return url.reduce((p, c) => (c !== '' ? c : p));
}

function init() {
  const url = document.URL.split('/');
  console.log(url);
  const slug = parseSlug(url);
  route(slug);
}

function link(e: Event) {
  e.stopPropagation();
  const slug = (e.target as HTMLAnchorElement).innerText.toLowerCase();
  route(slug);
}

window.addEventListener('load', init);
window.addEventListener('locationchange', init);
document
  .querySelectorAll('.bar>a')
  .forEach((e) => e.addEventListener('click', link));
document
  .querySelectorAll('.logo')
  .forEach((e) => e.addEventListener('click', link));

export function photoView(i: number, name: string) {
  let view = document.querySelector('.viewPhoto')!;
  let buffer = `<img src="${photos[i].download_url}" /><span>${name}</span>`;
  view.innerHTML = buffer;
  view.id = 'viewPhoto';
}

export let setPhotos = (p: Gallery) => {
  photos = p;
};
