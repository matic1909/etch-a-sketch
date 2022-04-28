const container = document.querySelector('.container');
const gridButton = document.querySelector('.generate-grid-button');
const toggleColorButton = document.querySelector('.toggle-color');
const colorDisplay = document.querySelector('.color');
let randomColor = false;

gridButton.addEventListener('click', (e) => {
  const gridSize = parseInt(prompt('How many squares?'));
  generateGrid(gridSize);
});

toggleColorButton.addEventListener('click', (e) => {
  randomColor = !randomColor;
  if (randomColor) {
    colorDisplay.textContent = 'RANDOM';
  } else {
    colorDisplay.textContent = 'BLACK';
  }
});

const handleMouseEnter = (e) => {
  if (randomColor) {
    color = getRandomRGB();
  } else {
    color = getColorString([0, 0, 0]);
  }
  e.target.style.backgroundColor = color;
};

const generateGrid = (size) => {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.addEventListener('mouseenter', handleMouseEnter);
    container.appendChild(div);
  }
};

const getColorString = (color) => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

const getRandomRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

generateGrid(16);
