export function route(slug: string) {
  switch (slug) {
    case 'projects':
      window.history.replaceState({}, 'Projects | Eric Moynihan', '/projects');
      break;
    case 'cv':
      window.history.replaceState({}, 'CV | Eric Moynihan', '/cv');
      break;
    case 'photography':
      window.history.replaceState(
        {},
        'Photography | Eric Moynihan',
        '/photography'
      );
      break;
    default:
      document.querySelector('.bar')!!.id = '';
      return;
  }
  document.querySelector('.bar')!!.id = 'navbar';
  document.querySelector('.logo')!!.id = 'navlogo';
}
