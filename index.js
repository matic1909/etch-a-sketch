const container = document.querySelector('.container');
const gridButton = document.querySelector('.generate-grid-button');
const toggleColorButton = document.querySelector('.toggle-color');
const clearButton = document.querySelector('.clear');
const colorDisplay = document.querySelector('.color');

const rainbowColors = [
  [255, 0, 0],
  [255, 127, 0],
  [255, 255, 0],
  [127, 255, 0],
  [0, 255, 0],
  [0, 255, 127],
  [0, 255, 255],
  [0, 127, 255],
  [0, 0, 255],
  [127, 0, 255],
  [255, 0, 255],
  [255, 0, 127],
];
const modes = ['black', 'random', 'rainbow'];
let currentMode = 0;
let colorValues = [0, 0, 0];
let rainbow = false;
let rainbowIndex = 0;
let randomColor = false;

gridButton.addEventListener('click', (e) => {
  const gridSize = parseInt(prompt('How many squares?'));
  generateGrid(gridSize);
  currentMode = 0;
});

toggleColorButton.addEventListener('click', (e) => {
  currentMode = (currentMode + 1) % modes.length;
  colorDisplay.textContent = `${modes[currentMode].toUpperCase()}`;
});

clearButton.addEventListener('click', (e) => {
  container.childNodes.forEach((div) => {
    div.style.backgroundColor = '';
  });
});

const handleMouseEnter = (e) => {
  const mode = modes[currentMode];
  if (mode === 'black') {
    colorValues = [0, 0, 0];
  }
  if (mode === 'random') {
    getRandomRGB();
  }
  if (mode === 'rainbow') {
    getNextColorInRainbow();
  }
  e.target.style.backgroundColor = getColorString(colorValues);
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

  colorValues = [r, g, b];
};

const getNextColorInRainbow = () => {
  colorValues = rainbowColors[rainbowIndex];
  rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
};

generateGrid(16);
