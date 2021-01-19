import { route } from './router';
import arrowR from '../public/arrows.png';
import arrowL from '../public/arrowsL.png';

type Gallery = {
  name: string;
  download_url: string;
  type: string;
  path: string;
}[];

let photos: Gallery;

function parseSlug(url: string[]): [string, string] {
  return [
    url.reduce((p, c) => (c !== '' ? c.split('#')[0] : p)),
    url.reduce((p, c) => (c !== '' ? c : p)),
  ];
}

function init() {
  const url = document.URL.split('/');
  console.log(url);
  const [slug, full] = parseSlug(url);
  route(slug, full);
}

function link(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  const slug = (e.target as HTMLAnchorElement).innerText.toLowerCase();
  route(slug, slug);
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('locationchange', init);
document
  .querySelectorAll('.bar>a')
  .forEach((e) => e.addEventListener('click', link));
document
  .querySelectorAll('.logo')
  .forEach((e) => e.addEventListener('click', link));

export function photoView(i: number, name: string) {
  let view = document.querySelector('.viewPhoto')!;
  let nextI = +i + 1 === photos.length ? 0 : +i + 1;
  console.log(nextI);
  let nextName = photos[nextI].name.split('.')[0];
  let lastI = +i - 1 < 0 ? photos.length - 1 : +i - 1;
  console.log(lastI);
  let lastName = photos[lastI].name.split('.')[0];
  let buffer = `<img src="${photos[i].download_url}" />
    <span id="name">${name}</span>
    <img onclick="Photo.photoView('${nextI}', '${nextName}')" id="arrowR" src="${arrowR}" />
    <img onclick="Photo.photoView('${lastI}', '${lastName}')" id="arrowL" src="${arrowL}" />
    <span onclick="document.querySelector('.viewPhoto').id = ''" id="x">X</span>
  `;
  view.innerHTML = buffer;
  view.id = 'viewPhoto';
}

export let setPhotos = (p: Gallery) => {
  if (photos) {
    photos = photos.concat(p);
  } else {
    photos = p;
  }
};
