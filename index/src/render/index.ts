import Squares from './squares';

export default function (root: HTMLDivElement) {
  const squareRoot = root.appendChild(document.createElement('div'));
  squareRoot.id = 'squares';
  const squares = new Squares(squareRoot);
  const button = root.appendChild(document.createElement('button'));
  button.innerText = 'North';
  button.onclick = () => {
    squares.theme = 'north';
  };
}
