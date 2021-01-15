import marked from 'marked';

const projects =
    'https://raw.githubusercontent.com/ericm/projects/master/README.md',
  cv = 'https://raw.githubusercontent.com/ericm/cv/master/README.md',
  gallery = 'https://api.github.com/repos/ericm/photography/contents/gallery',
  thumbnails =
    'https://api.github.com/repos/ericm/photography/contents/thumbnails';

const pages: string[] = ['Projects', 'CV', 'Photography'];

let links: NodeListOf<Element>;
let root: Element;

export async function route(slug: string) {
  root = document.querySelector('.root')!!;
  const body = document.body;
  links = document.querySelectorAll('.bar a');
  links.forEach((link) => (link.id = ''));
  switch (slug) {
    case 'projects':
      render(async () => {
        root.innerHTML = marked(await (await fetch(projects)).text());
      }, 0);
      break;
    case 'cv':
      render(async () => {
        root.innerHTML = marked(await (await fetch(cv)).text());
      }, 1);
      break;
    case 'photography':
      render(async () => {
        let buffer = `<ul style="display: flex; flex-wrap: wrap;">`;
        const galleryResp = (await (await fetch(gallery)).json()) as {
          name: string;
          download_url: string;
          type: string;
          path: string;
        }[];
        for (let image of galleryResp) {
          let thumbnail = image.download_url.replace('gallery/', 'thumbnails/');
          buffer += `<li style="margin: 0; padding: 0; display: flex; height: 30vh; flex-grow: 1;"><img style="border-radius: 0; max-height: 100%; min-width: 100%; object-fit: cover; vertical-align: top; margin: 0;" src="${thumbnail}"/></li>`;
        }
        buffer += `</ul>`;
        console.log(galleryResp);
        root.innerHTML = buffer;
      }, 2);
      break;
    default:
      document.querySelector('.bar')!!.id = '';
      document.querySelector('.logo')!!.id = '';
      window.history.replaceState({}, 'Eric Moynihan', '/');
      root.id = '';
      body.id = '';
      return;
  }
  body.id = 'viewing';
  document.querySelector('.bar')!!.id = 'navbar';
  document.querySelector('.logo')!!.id = 'navlogo';
}

async function render(callback: () => void, i: number) {
  window.history.replaceState(
    {},
    `${pages[i]} | Eric Moynihan`,
    `/${pages[i].toLowerCase()}`
  );
  links[i].id = 'selected';
  root.id = pages[i].toLowerCase();
  callback();
}
