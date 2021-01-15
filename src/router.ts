import marked from 'marked';

const projects =
    'https://raw.githubusercontent.com/ericm/projects/master/README.md',
  cv = 'https://raw.githubusercontent.com/ericm/cv/master/README.md';

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
      render(async () => {}, 2);
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
