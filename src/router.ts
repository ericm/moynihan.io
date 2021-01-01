export function route(slug: string) {
  const root = document.querySelector('.root');
  const body = document.body;
  const links = document.querySelectorAll('.bar a');
  links.forEach((link) => (link.id = ''));
  switch (slug) {
    case 'projects':
      window.history.replaceState({}, 'Projects | Eric Moynihan', '/projects');
      links[0].id = 'selected';
      break;
    case 'cv':
      window.history.replaceState({}, 'CV | Eric Moynihan', '/cv');
      links[1].id = 'selected';
      break;
    case 'photography':
      links[2].id = 'selected';
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
      root!!.id = '';
      body.id = '';
      return;
  }
  root!!.id = 'view';
  body.id = 'viewing';
  document.querySelector('.bar')!!.id = 'navbar';
  document.querySelector('.logo')!!.id = 'navlogo';
}
