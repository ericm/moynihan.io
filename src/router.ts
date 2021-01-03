import marked from 'marked';

const projects =
    'https://raw.githubusercontent.com/ericm/projects/master/README.md',
  cv = 'https://raw.githubusercontent.com/ericm/cv/master/README.md';

export async function route(slug: string) {
  const root = document.querySelector('.root')!!;
  const body = document.body;
  const links = document.querySelectorAll('.bar a');
  links.forEach((link) => (link.id = ''));
  switch (slug) {
    case 'projects':
      window.history.replaceState({}, 'Projects | Eric Moynihan', '/projects');
      links[0].id = 'selected';
      root.id = 'projects';
      root.innerHTML = marked(await (await fetch(projects)).text());
      break;
    case 'cv':
      window.history.replaceState({}, 'CV | Eric Moynihan', '/cv');
      root.id = 'cv';
      root.innerHTML = marked(await (await fetch(cv)).text());
      links[1].id = 'selected';
      break;
    case 'photography':
      links[2].id = 'selected';
      root.id = 'photography';
      window.history.replaceState(
        {},
        'Photography | Eric Moynihan',
        '/photography'
      );
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
